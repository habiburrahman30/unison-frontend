import { getCategories } from "@/lib/api/categories";
import HeaderClient from "../common/HeaderClient";

export default async function Header() {
    const data = await getCategories({ page: 1, limit: 50 });
    return <HeaderClient categories={data.categories} />;
}