import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { useRoute, useRuntimeConfig, useHead } from "#imports";
import type { ArticleItem, PhotographerProfile } from "./useApi";

export const useSeo = () => {
	const config = useRuntimeConfig();
	const route = useRoute();
	const siteUrl = ((config.public.siteUrl as string) || "https://jeflee.photography").replace(/\/+$/, "");

	const canonicalUrl = computed(() => {
		const cleanPath = route.path === "/" ? "" : route.path.replace(/\/+$/, "");
		return `${siteUrl}${cleanPath || "/"}`;
	});

	const toAbsoluteUrl = (path: string | null | undefined, fallback = "/images/preview3.jpeg"): string => {
		const target = path || fallback;
		if (target.startsWith("http://") || target.startsWith("https://")) {
			return target;
		}
		const cleanPath = target.startsWith("/") ? target : `/${target}`;
		return `${siteUrl}${cleanPath}`;
	};

	const setCanonical = () => {
		useHead({
			link: [
				{
					rel: "canonical",
					href: canonicalUrl,
				},
			],
		});
	};

	const setSchema = (schema: MaybeRefOrGetter<Record<string, unknown> | Array<Record<string, unknown>>>) => {
		useHead({
			script: [
				{
					type: "application/ld+json",
					children: () => JSON.stringify(toValue(schema)),
				},
			],
		});
	};

	const buildPhotographerSchema = (profile?: Partial<PhotographerProfile>) => {
		return {
			"@context": "https://schema.org",
			"@type": "Photographer",
			"@id": `${siteUrl}/#photographer`,
			"name": profile?.name || "Jef Lee",
			"alternateName": "Jef Lee Photography",
			"url": siteUrl,
			"image": toAbsoluteUrl(profile?.avatar, "/images/jeff-portrait.jpeg"),
			"description": profile?.headline || "Telling honest stories through natural light and quiet moments.",
			"jobTitle": profile?.tagline || "Portrait & Documentary Photographer",
			"address": {
				"@type": "PostalAddress",
				"addressCountry": "Australia",
				"addressLocality": profile?.location || "Australia / Kyoto, Japan",
			},
			"sameAs": [
				profile?.instagram_url || "https://instagram.com/jeflee",
			],
			"email": profile?.email || "jef@example.com",
			"telephone": profile?.phone || "+61 400 123 456",
		};
	};

	const buildWebSiteSchema = (profile?: Partial<PhotographerProfile>) => {
		return {
			"@context": "https://schema.org",
			"@type": "WebSite",
			"@id": `${siteUrl}/#website`,
			"url": siteUrl,
			"name": "Jef Lee Photography",
			"description": profile?.headline || "Telling honest stories through natural light and quiet moments.",
			"publisher": {
				"@id": `${siteUrl}/#photographer`,
			},
		};
	};

	const buildProfilePageSchema = (profile?: Partial<PhotographerProfile>) => {
		return {
			"@context": "https://schema.org",
			"@type": "ProfilePage",
			"@id": `${siteUrl}/about#webpage`,
			"url": `${siteUrl}/about`,
			"name": `About ${profile?.name || "Jef Lee"} — Biography & Working Philosophy`,
			"description": profile?.about_title || "Documenting the quiet cadence of ordinary life.",
			"mainEntity": {
				"@id": `${siteUrl}/#photographer`,
			},
		};
	};

	const buildCollectionSchema = (options: { name: string; description: string; path: string }) => {
		return {
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			"@id": `${siteUrl}${options.path}#webpage`,
			"url": `${siteUrl}${options.path}`,
			"name": options.name,
			"description": options.description,
			"creator": {
				"@id": `${siteUrl}/#photographer`,
			},
		};
	};

	const buildBlogPostingSchema = (post: Partial<ArticleItem>, profile?: Partial<PhotographerProfile>) => {
		return {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			"@id": `${siteUrl}/writing/${post.slug || ""}#article`,
			"headline": post.title || "",
			"description": post.excerpt || post.title || "",
			"image": toAbsoluteUrl(post.cover_image, "/images/preview2.jpeg"),
			"datePublished": post.created_at || new Date().toISOString(),
			"author": {
				"@type": "Person",
				"name": profile?.name || "Jef Lee",
				"url": siteUrl,
			},
			"publisher": {
				"@id": `${siteUrl}/#photographer`,
			},
			"mainEntityOfPage": {
				"@type": "WebPage",
				"@id": `${siteUrl}/writing/${post.slug || ""}`,
			},
		};
	};

	const buildContactPageSchema = (profile?: Partial<PhotographerProfile>) => {
		return {
			"@context": "https://schema.org",
			"@type": "ContactPage",
			"@id": `${siteUrl}/contact#webpage`,
			"url": `${siteUrl}/contact`,
			"name": `Contact — ${profile?.name || "Jef Lee"}`,
			"description": `Get in touch with ${profile?.name || "Jef Lee"} for photography commissions and inquiries.`,
			"mainEntity": {
				"@id": `${siteUrl}/#photographer`,
			},
		};
	};

	const buildServiceSchema = () => {
		return {
			"@context": "https://schema.org",
			"@type": "Service",
			"@id": `${siteUrl}/booking#service`,
			"name": "Portrait & Documentary Photography Sessions",
			"serviceType": "Photography",
			"provider": {
				"@id": `${siteUrl}/#photographer`,
			},
			"areaServed": "Australia & Worldwide",
			"description": "Professional natural light photography sessions covering portrait, family, couple, and documentary themes.",
		};
	};

	return {
		siteUrl,
		canonicalUrl,
		toAbsoluteUrl,
		setCanonical,
		setSchema,
		buildPhotographerSchema,
		buildWebSiteSchema,
		buildProfilePageSchema,
		buildCollectionSchema,
		buildBlogPostingSchema,
		buildContactPageSchema,
		buildServiceSchema,
	};
};
