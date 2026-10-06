import type { Metadata } from "next";
import { MenuApp } from "@/components/menu-app";
import { validMenuFilter } from "@/lib/menu";
export const metadata: Metadata = { title: "Our menu · Italiano Bari", description: "Explore the original Italiano Bari menu. Bari Pizza, classic pizzas, pasta, salads and drinks—with Arabic and English names and prices in Saudi riyals." };
export default async function MenuPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const { category, q } = await searchParams;
  return <MenuApp initialCategory={validMenuFilter(category)} initialSearch={q?.slice(0, 100) || ""} />;
}
