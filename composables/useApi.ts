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
	location?: string;
	email?: string;
	phone?: string;
	instagram?: string;
	instagram_url?: string;
}

export const useApi = () => {
	const config = useRuntimeConfig();
	const apiBase = config.public.apiBase as string;
	const storageBase = config.public.storageBase as string;

	// Guard against public web apps trying to ping local network / localhost,
	// which triggers browser security warnings (Chrome Private Network Access) and Mixed Content blocks.
	const isLocalHostTargetBlockedOnPublic = (): boolean => {
		if (import.meta.client && typeof window !== "undefined") {
			const isPublicHost = window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1";
			const isLocalApi = apiBase.includes("localhost") || apiBase.includes("127.0.0.1");
			return isPublicHost && isLocalApi;
		}
		return false;
	};

	const resolveImageUrl = (path: string | null | undefined, fallback = "/images/preview1.jpeg"): string => {
		if (!path) return fallback;
		// Normalize any legacy Herd domain to current storageBase
		if (path.includes("dashboard-jef.test/storage")) {
			return path.replace("http://dashboard-jef.test/storage", storageBase);
		}
		if (path.startsWith("http://") || path.startsWith("https://")) {
			return path;
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
		if (isLocalHostTargetBlockedOnPublic()) {
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
		if (isLocalHostTargetBlockedOnPublic()) {
			throw new Error("Local backend API not accessible from public host");
		}
		return await $fetch<{ data: PortfolioItem }>(`${apiBase}/portfolios/${slug}`, {
			timeout: 5000,
			headers: { Accept: "application/json" },
		});
	};

	const getArticles = async () => {
		if (isLocalHostTargetBlockedOnPublic()) {
			throw new Error("Local backend API not accessible from public host");
		}
		return await $fetch<{ data: ArticleItem[] }>(`${apiBase}/articles`, {
			timeout: 5000,
			headers: { Accept: "application/json" },
		});
	};

	const getArticle = async (slug: string) => {
		if (isLocalHostTargetBlockedOnPublic()) {
			throw new Error("Local backend API not accessible from public host");
		}
		return await $fetch<{ data: ArticleItem }>(`${apiBase}/articles/${slug}`, {
			timeout: 5000,
			headers: { Accept: "application/json" },
		});
	};

	const getProfile = async () => {
		if (isLocalHostTargetBlockedOnPublic()) {
			throw new Error("Local backend API not accessible from public host");
		}
		return await $fetch<{ data: PhotographerProfile }>(`${apiBase}/profile`, {
			timeout: 5000,
			headers: { Accept: "application/json" },
		});
	};

	const createBooking = async (payload: BookingPayload) => {
		if (isLocalHostTargetBlockedOnPublic()) {
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
