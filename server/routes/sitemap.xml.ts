import { defineEventHandler, setHeader } from "h3";
import { useRuntimeConfig } from "#imports";

interface SitemapEntry {
	loc: string;
	lastmod?: string;
	changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
	priority: string;
}

interface ApiArticle {
	slug: string;
	updated_at?: string;
	created_at?: string;
}

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const siteUrl = ((config.public?.siteUrl as string) || "https://jeflee.photography").replace(/\/+$/, "");
	const apiBase = ((config.public?.apiBase as string) || "http://127.0.0.1:8000/api").replace(/\/+$/, "");

	const today = new Date().toISOString().split("T")[0];

	const staticRoutes: SitemapEntry[] = [
		{ loc: `${siteUrl}/`, lastmod: today, changefreq: "weekly", priority: "1.0" },
		{ loc: `${siteUrl}/works`, lastmod: today, changefreq: "weekly", priority: "0.9" },
		{ loc: `${siteUrl}/about`, lastmod: today, changefreq: "monthly", priority: "0.8" },
		{ loc: `${siteUrl}/writing`, lastmod: today, changefreq: "weekly", priority: "0.8" },
		{ loc: `${siteUrl}/booking`, lastmod: today, changefreq: "monthly", priority: "0.8" },
		{ loc: `${siteUrl}/contact`, lastmod: today, changefreq: "monthly", priority: "0.7" },
	];

	const dynamicRoutes: SitemapEntry[] = [];

	// Fetch dynamic articles
	try {
		const controller = new AbortController();
		const timeout = setTimeout(() => controller.abort(), 2000);
		const res = await fetch(`${apiBase}/articles`, {
			headers: { Accept: "application/json" },
			signal: controller.signal,
		});
		clearTimeout(timeout);

		if (res.ok) {
			const json = await res.json();
			const articles: ApiArticle[] = Array.isArray(json?.data) ? json.data : [];
			for (const article of articles) {
				if (article.slug) {
					dynamicRoutes.push({
						loc: `${siteUrl}/writing/${article.slug}`,
						lastmod: article.updated_at ? new Date(article.updated_at).toISOString().split("T")[0] : today,
						changefreq: "monthly",
						priority: "0.7",
					});
				}
			}
		}
	}
	catch {
		// Fallback articles if API is down during sitemap generation
		const fallbackSlugs = [
			"golden-hour",
			"the-magic-of-golden-hour",
			"family-photography",
			"why-i-love-family-photography",
			"minimal-gear",
			"minimal-gear-maximum-impact",
			"sydney-mornings",
		];
		for (const slug of fallbackSlugs) {
			dynamicRoutes.push({
				loc: `${siteUrl}/writing/${slug}`,
				lastmod: today,
				changefreq: "monthly",
				priority: "0.7",
			});
		}
	}

	const allRoutes = [...staticRoutes, ...dynamicRoutes];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.map(
		r => `  <url>
    <loc>${r.loc.replace(/&/g, "&amp;")}</loc>${r.lastmod ? `\n    <lastmod>${r.lastmod}</lastmod>` : ""}
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
	)
	.join("\n")}
</urlset>`;

	setHeader(event, "Content-Type", "application/xml; charset=utf-8");
	setHeader(event, "Cache-Control", "public, max-age=3600, s-maxage=3600");

	return xml;
});
