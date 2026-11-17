export interface PortfolioItem {
	id: number;
	title: string;
	slug: string;
	category?: string;
	description?: string;
	thumbnail: string | null;
	gallery?: string[];
	is_highlight: boolean;
	created_at: string;
}

export interface ArticleItem {
	id: number;
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	cover_image: string | null;
	is_highlight: boolean;
	created_at: string;
}

export interface BookingPayload {
	name: string;
	email: string;
	phone: string;
	package: string;
	location: string;
	booking_date: string;
	message?: string;
}

export interface PhotographerPhilosophy {
	number: string;
	title: string;
	description: string;
}

export interface PhotographerProfile {
	id: number;
	name: string;
	tagline: string;
	headline: string;
	sub_headline?: string;
	quote?: string;
	about_title?: string;
	about_journey?: string;
	about_philosophy?: string;
	journey_paragraphs?: string[];
	philosophies?: PhotographerPhilosophy[];
	avatar?: string | null;
	hero_image?: string | null;
	hero_position?: string;
	hero_portfolio_id?: number | null;
	location?: string;
	email?: string;
	phone?: string;
	instagram?: string;
	instagram_url?: string;
}

export const useApi = () => {
	const config = useRuntimeConfig();
	const apiBase = (config.public.apiBase as string) || "";
	const storageBase = (config.public.storageBase as string) || "";

	// Check if API endpoint is valid and safe to call without triggering Chrome Private Network Access prompts
	const isSafeToCallApi = (): boolean => {
		if (!apiBase) return false;
		const isLocalApi = apiBase.includes("localhost") || apiBase.includes("127.0.0.1");
		if (isLocalApi) {
			if (import.meta.client && typeof window !== "undefined") {
				return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
			}
			return process.env.NODE_ENV !== "production";
		}
		return true;
	};

	const resolveImageUrl = (path: string | null | undefined, fallback = "/images/preview1.jpeg"): string => {
		if (!path) return fallback;

		// Local static assets in public directory (e.g. /images/jeff-portrait.jpeg)
		if (path.startsWith("/images/") || path.startsWith("images/")) {
			return path.startsWith("/") ? path : `/${path}`;
		}

		// Normalize any legacy Herd domain to current storageBase
		if (path.includes("dashboard-jef.test/storage")) {
			if (!storageBase || storageBase.includes("localhost") || storageBase.includes("127.0.0.1")) {
				return fallback;
			}
			return path.replace("http://dashboard-jef.test/storage", storageBase);
		}

		// Full remote URLs (Unsplash, Cloudinary, Cloudflare R2, S3, etc.)
		if (path.startsWith("http://") || path.startsWith("https://")) {
			if (path.includes("localhost") || path.includes("127.0.0.1")) {
				// Normalize any legacy localhost/storage URL to the production storageBase
				if (storageBase && !storageBase.includes("localhost") && !storageBase.includes("127.0.0.1") && path.includes("/storage/")) {
					const relativeStorage = path.substring(path.indexOf("/storage/") + 9);
					return `${storageBase.replace(/\/+$/, "")}/${relativeStorage}`;
				}
				return fallback;
			}
			return path;
		}

		// Guard: If storageBase is empty or points to localhost in a public environment, safely use fallback
		if (!storageBase || storageBase.includes("localhost") || storageBase.includes("127.0.0.1")) {
			return fallback;
		}

		const cleanPath = path.startsWith("/") ? path : `/${path}`;
		return `${storageBase}${cleanPath}`;
	};

	const onImageError = (e: Event, fallback = "/images/preview1.jpeg") => {
		const target = e.target as HTMLImageElement;
		if (target && target.src !== fallback) {
			target.src = fallback;
		}
	};

	const getPortfolios = async (category?: string) => {
		if (!isSafeToCallApi()) {
			throw new Error("Local backend API not accessible from public host");
		}
		const query = category && category !== "All" ? { category } : {};
		return await $fetch<{ data: PortfolioItem[] }>(`${apiBase}/portfolios`, {
			query,
			timeout: 5000,
			headers: { Accept: "application/json" },
		});
	};

	const getPortfolio = async (slug: string) => {
		if (!isSafeToCallApi()) {
			throw new Error("Local backend API not accessible from public host");
		}
		return await $fetch<{ data: PortfolioItem }>(`${apiBase}/portfolios/${slug}`, {
			timeout: 5000,
			headers: { Accept: "application/json" },
		});
	};

	const getArticles = async () => {
		if (!isSafeToCallApi()) {
			throw new Error("Local backend API not accessible from public host");
		}
		return await $fetch<{ data: ArticleItem[] }>(`${apiBase}/articles`, {
			timeout: 5000,
			headers: { Accept: "application/json" },
		});
	};

	const getArticle = async (slug: string) => {
		if (!isSafeToCallApi()) {
			throw new Error("Local backend API not accessible from public host");
		}
		return await $fetch<{ data: ArticleItem }>(`${apiBase}/articles/${slug}`, {
			timeout: 5000,
			headers: { Accept: "application/json" },
		});
	};

	const getProfile = async () => {
		if (!isSafeToCallApi()) {
			throw new Error("Local backend API not accessible from public host");
		}
		return await $fetch<{ data: PhotographerProfile }>(`${apiBase}/profile`, {
			timeout: 5000,
			headers: { Accept: "application/json" },
		});
	};

	const createBooking = async (payload: BookingPayload) => {
		if (!isSafeToCallApi()) {
			throw new Error("Backend API URL not yet configured on production environment");
		}
		return await $fetch(`${apiBase}/bookings`, {
			method: "POST",
			body: payload,
			timeout: 5000,
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json",
			},
		});
	};

	return {
		apiBase,
		storageBase,
		resolveImageUrl,
		onImageError,
		getPortfolios,
		getPortfolio,
		getArticles,
		getArticle,
		getProfile,
		createBooking,
	};
};
