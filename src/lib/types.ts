export type Member = {
  id: string;
  name: string;
  phone: string;
  stamps: number;
  lifetimeStamps: number;
  rewardsRedeemed: number;
  sideRedeemed: boolean;
  createdAt: string;
  updatedAt: string;
};
export type Activity = {
  id: string;
  type: string;
  description: string;
  stampDelta: number;
  balanceAfter: number;
  createdAt: string;
};
export type View = "menu" | "card" | "rewards" | "visits" | "how" | "staff" | "guide";
export type Language = "en" | "ar" | "ur" | "hi";
export const previewMember: Member = {
  id: "preview",
  name: "food lover",
  phone: "",
  stamps: 7,
  lifetimeStamps: 7,
  rewardsRedeemed: 0,
  sideRedeemed: false,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
};
export function memberCode(id: string) {
  return id === "preview" ? "IB · PREVIEW" : `IB-${id.slice(0, 8).toUpperCase()}`;
}
export async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...options, headers: { "Content-Type": "application/json", ...options?.headers } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data as T;
}
