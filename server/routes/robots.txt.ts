import { defineEventHandler, setHeader } from "h3";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler((event) => {
	const config = useRuntimeConfig(event);
	const siteUrl = ((config.public?.siteUrl as string) || "https://jeflee.photography").replace(/\/+$/, "");

	const body = [
		"User-agent: *",
		"Allow: /",
		"",
		`Sitemap: ${siteUrl}/sitemap.xml`,
		"",
	].join("\n");

	setHeader(event, "Content-Type", "text/plain; charset=utf-8");
	setHeader(event, "Cache-Control", "public, max-age=86400");

	return body;
});

