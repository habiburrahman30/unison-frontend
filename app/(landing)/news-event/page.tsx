
import { getNewsCategories } from "@/lib/api/news-categories";

import { getNews } from "@/lib/api/news";
import NewsAndEventPage from "@/components/landing/NewsAndEventPage";

export default async function NewsPage({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; tag?: string; category?: string }>;
}) {
    const params = await searchParams;
    const page = Number(params.page) || 1;

    const [newsData, categoriesData] = await Promise.all([
        getNews({ page, limit: 4, search: "" }),
        getNewsCategories({ page: 1, limit: 100 }),
    ]);

    return (
        <NewsAndEventPage
            newsData={newsData}
            categories={categoriesData.categories}
        />
    );
}