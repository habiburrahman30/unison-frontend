import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import NewsAndEventSinglePage from "@/components/landing/NewsAndEventSinglePage";


export default async function NewsDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const [newsData, recentNews, categories] = await Promise.all([
        prisma.news.findUnique({
            where: { slug, published: true },
            include: { category: true },
        }),
        prisma.news.findMany({
            where: { published: true },
            orderBy: { created_at: "desc" },
            take: 3,
            select: { id: true, title: true, slug: true, image: true, from_date: true },
        }),
        prisma.newsCategory.findMany({
            take: 10,
            include: { _count: { select: { news: true } } },
            orderBy: { name: "asc" },
        }),
    ]);

    if (!newsData) notFound();

    return (
        <NewsAndEventSinglePage
            newsData={newsData}
            recentNews={recentNews}
            categories={categories}
        />
    );
}