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

export const useApi = () => {
	const config = useRuntimeConfig();
	const apiBase = config.public.apiBase as string;
	const storageBase = config.public.storageBase as string;

	const resolveImageUrl = (path: string | null | undefined): string => {
		if (!path) return "/images/preview1.jpeg";
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
		const query = category && category !== "All" ? { category } : {};
		return await $fetch<{ data: PortfolioItem[] }>(`${apiBase}/portfolios`, {
			query,
			headers: { Accept: "application/json" },
		});
	};

	const getPortfolio = async (slug: string) => {
		return await $fetch<{ data: PortfolioItem }>(`${apiBase}/portfolios/${slug}`, {
			headers: { Accept: "application/json" },
		});
	};

	const getArticles = async () => {
		return await $fetch<{ data: ArticleItem[] }>(`${apiBase}/articles`, {
			headers: { Accept: "application/json" },
		});
	};

	const getArticle = async (slug: string) => {
		return await $fetch<{ data: ArticleItem }>(`${apiBase}/articles/${slug}`, {
			headers: { Accept: "application/json" },
		});
	};

	const createBooking = async (payload: BookingPayload) => {
		return await $fetch(`${apiBase}/bookings`, {
			method: "POST",
			body: payload,
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
		createBooking,
	};
};
