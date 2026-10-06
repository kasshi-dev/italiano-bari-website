"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Coffee,
  Gift,
  Heart,
  History,
  Leaf,
  LoaderCircle,
  LockKeyhole,
  LogOut,
  Maximize2,
  Pizza,
  RotateCw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Ticket,
  UserRound,
  X,
} from "lucide-react";
import { Shell } from "./shell";
import { Modal } from "./modal";
import { copy } from "@/lib/content";
import { menuCopy } from "@/lib/menu";
import {
  api,
  memberCode,
  previewMember,
  type Activity,
  type Language,
  type Member,
  type View,
} from "@/lib/types";

type ModalName =
  | "join"
  | "qr"
  | "side"
  | "pizza"
  | "terms" | "help"
  | "account"
  | null;

export function LoyaltyApp({
  initialView = "card",
  joinOnLoad = false,
}: {
  initialView?: View;
  joinOnLoad?: boolean;
}) {
  const [member, setMember] = useState<Member | null>(null);
  const [history, setHistory] = useState<Activity[]>([]);
  const [language, setLanguage] = useState<Language>("en");
  const [modal, setModal] = useState<ModalName>(joinOnLoad ? "join" : null);
  const [joinMode, setJoinMode] = useState<"join" | "login">("join");
  const [busy, setBusy] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [formError, setFormError] = useState("");
  const [loadError, setLoadError] = useState("");
  const [toast, setToast] = useState("");
  const [origin, setOrigin] = useState("");
  const [rewardFilter, setRewardFilter] = useState("all");

  const t = copy[language];
  const displayMember = member || previewMember;
  const isPreview = !member;
  const stamps = displayMember.stamps;
  const sideReady = stamps >= 5 && !displayMember.sideRedeemed;
  const pizzaReady = stamps >= 10;
  const rewardCount = Number(sideReady) + Number(pizzaReady);
  const qrValue = member ? member.id : `${origin}/?join=1`;

  const refresh = useCallback(async (showLoading = false) => {
    if (showLoading) setRefreshing(true);
    try {
      const data = await api<{ member: Member | null; activities: Activity[] }>(
        "/api/member"
      );
      setMember(data.member);
      setHistory(data.activities);
      setLoadError("");
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Your card couldn’t be loaded."
      );
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setOrigin(window.location.origin);
    try {
      const saved = localStorage.getItem("bari-language");
      if (saved && ["en", "ar", "ur", "hi"].includes(saved))
        setLanguage(saved as Language);
    } catch {
      /* Language remains English if browser storage is disabled. */
    }
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (joinOnLoad) setModal("join");
  }, [joinOnLoad]);

  useEffect(() => {
    if (!member) return;
    const update = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    const interval = setInterval(update, 15000);
    window.addEventListener("focus", update);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", update);
    };
  }, [!!member, refresh]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  function changeLanguage(next: Language) {
    setLanguage(next);
    try {
      localStorage.setItem("bari-language", next);
    } catch {}
  }

  function openModal(next: ModalName) {
    setFormError("");
    setModal(next);
  }

  async function join(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setFormError("");
    const form = new FormData(event.currentTarget);
    try {
      const data = await api<{ member: Member }>("/api/member", {
        method: "POST",
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          mode: joinMode,
        }),
      });
      setMember(data.member);
      setModal(null);
      setToast(t.saved);
      void refresh();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    setBusy(true);
    try {
      await api("/api/member", { method: "DELETE" });
      setMember(null);
      setHistory([]);
      setModal(null);
      setToast("You’re logged out. A presto!");
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  function QR({ size = 144 }: { size?: number }) {
    return (
      <QRCodeSVG
        value={qrValue || "Italiano Bari loyalty club"}
        size={size}
        level="H"
        marginSize={4}
        fgColor="#1E4430"
        bgColor="#ffffff"
        title={
          member
            ? `Member QR for ${member.name}`
            : "Scan to join Italiano Bari"
        }
        imageSettings={{
          src: "/icon.svg",
          width: size * 0.18,
          height: size * 0.18,
          excavate: true,
        }}
      />
    );
  }

  function Rewards({ expanded = false }: { expanded?: boolean }) {
    const rewards = [
      {
        type: "side" as const,
        threshold: 5,
        title: t.sideTitle,
        description: t.sideDescription,
        image: "/menu/gift.webp",
        alt: "Complete 4 orders, 5th order free!",
        ready: sideReady,
        redeemed: displayMember.sideRedeemed,
      },
      {
        type: "pizza" as const,
        threshold: 10,
        title: t.pizzaTitle,
        description: t.pizzaDescription,
        image: "/menu/bari-pizza.webp",
        alt: "Freshly baked Italian pizza",
        ready: pizzaReady,
        redeemed: false,
      },
    ].filter(
      (reward) =>
        !expanded ||
        rewardFilter === "all" ||
        (rewardFilter === "ready"
          ? reward.ready
          : !reward.ready && !reward.redeemed)
    );

    return (
      <div className={`reward-grid ${expanded ? "reward-grid-expanded" : ""}`}>
        {rewards.map((reward) => (
          <button
            className={`reward-card ${reward.ready ? "reward-ready" : ""}`}
            key={reward.type}
            onClick={() => openModal(reward.type)}
          >
            <div className="reward-photo">
              <Image
                src={reward.image}
                fill
                sizes="(max-width: 600px) 110px, 160px"
                alt={reward.alt}
              />
              <div className="reward-photo-icon">
                {reward.type === "side" ? (
                  <Coffee size={16} />
                ) : (
                  <Pizza size={17} />
                )}
              </div>
            </div>
            <div className="reward-copy">
              <span className="reward-milestone">
                {reward.threshold}{" "}
                {language === "en" ? "STAMPS" : t.stamps}
              </span>
              <h3>{reward.title}</h3>
              <p>{reward.description}</p>
              <div className="reward-card-bottom">
                <span
                  className={`reward-status ${
                    reward.ready ? "available" : ""
                  }`}
                >
                  {reward.redeemed ? (
                    <Check size={12} />
                  ) : reward.ready ? (
                    <span className="status-dot" />
                  ) : (
                    <LockKeyhole size={12} />
                  )}
                  {reward.redeemed
                    ? t.redeemed
                    : reward.ready
                    ? t.ready
                    : t.toGo.replace(
                        "{n}",
                        String(Math.max(0, reward.threshold - stamps))
                      )}
                </span>
                <ArrowUpRight size={18} />
              </div>
            </div>
          </button>
        ))}
        {rewards.length === 0 && (
          <div className="empty-state compact-empty">
            <Gift size={32} />
            <h3>No rewards in this view just yet.</h3>
            <p>Keep collecting stamps. Something delicious is on its way.</p>
            <button
              className="text-button"
              onClick={() => setRewardFilter("all")}
            >
              See all rewards <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    );
  }

  const date = (value: string) =>
    new Date(value).toLocaleDateString(
      language === "en" ? "en-GB" : language,
      { day: "numeric", month: "short", year: "numeric" }
    );

  return (
    <Shell
      active={initialView}
      language={language}
      onLanguage={changeLanguage}
      onJoin={() => openModal(member ? "account" : "join")}
      member={member}
      rewardCount={rewardCount}
    >
      {loadError && (
        <div className="error-banner" role="alert">
          <span>{loadError}</span>
          <button onClick={() => void refresh(true)}>
            Try again <RotateCw size={14} />
          </button>
        </div>
      )}

      <div className="page-intro">
        <div>
          <h1>
            {initialView === "card" ? (
              <>
                {t.hello}, {member ? member.name.split(" ")[0] : t.foodLover}!{" "}
                <span className="greeting-hand">👋</span>
              </>
            ) : initialView === "rewards" ? (
              t.rewardTitle
            ) : initialView === "visits" ? (
              t.visitTitle
            ) : (
              t.howTitle
            )}
          </h1>
          <p>
            {initialView === "card"
              ? t.intro
              : initialView === "rewards"
              ? t.rewardSubtitle
              : initialView === "visits"
              ? t.visitDescription
              : t.howDesc}
          </p>
        </div>
        {isPreview ? (
          <button className="preview-pill" onClick={() => openModal("join")}>
            <span />
            {language === "en" ? "PREVIEW CARD" : t.preview.split("·").pop()}
            <ArrowUpRight size={13} />
          </button>
        ) : (
          <button
            className="member-pill"
            onClick={() => void refresh(true)}
          >
            <BadgeCheck
