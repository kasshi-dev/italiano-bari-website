import { LoyaltyApp } from "@/components/loyalty-app";
import { MenuApp } from "@/components/menu-app";
import { validMenuFilter } from "@/lib/menu";
import type { View } from "@/lib/types";
export const dynamic = "force-dynamic";
export default async function HomePage({ searchParams }: { searchParams: Promise<{ view?: string; join?: string; category?: string; q?: string }> }) {
  const params = await searchParams;
  const loyaltyView = ["card", "rewards", "visits", "how"].includes(params.view || "");
  if (params.join === "1" || loyaltyView) {
    const view: View = loyaltyView ? params.view as View : "card";
    return <LoyaltyApp initialView={view} joinOnLoad={params.join === "1"} />;
  }
  return <MenuApp initialCategory={validMenuFilter(params.category)} initialSearch={params.q?.slice(0, 100) || ""} />;
}
