"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/Button";
import { AdminPageShell } from "@/shared/components/ui/AdminPageShell";
import { Input } from "@/shared/components/ui/Input";
import { Select } from "@/shared/components/ui/Select";
import { useCompetitions } from "../hooks/useCompetitions";
import {
  CATEGORIES,
  EMPTY_FORM,
  STATUSES,
  type CompetitionForm,
  type CompStatus,
} from "../types";

type Props = {
  mode: "create" | "edit";
  competitionId?: string;
};

const fieldClass =
  "wip-admin-field w-full rounded-xl border border-run-border bg-black/40 px-4 py-3 text-white placeholder:text-run-muted focus:border-run-border focus:outline-none";

function openDatePicker(e: React.MouseEvent<HTMLInputElement>) {
  try {
    e.currentTarget.showPicker?.();
  } catch {
    // 일부 브라우저에서 사용자 제스처 없이 호출 시 무시됨
  }
}

export function AdminCompetitionFormScreen({ mode, competitionId }: Props) {
  const router = useRouter();
  const { ready, getById, create, update } = useCompetitions();
  const [form, setForm] = useState<CompetitionForm>({ ...EMPTY_FORM, categories: [] });

  useEffect(() => {
    if (!ready || mode !== "edit" || !competitionId) return;
    const comp = getById(competitionId);
    if (!comp) {
      router.replace("/admin/competitions");
      return;
    }
    setForm({
      name: comp.name,
      date: comp.date,
      place: comp.place,
      host: comp.host,
      url: comp.url,
      categories: [...comp.categories],
      status: comp.status,
    });
  }, [ready, mode, competitionId, getById, router]);

  const isFormValid =
    form.name.trim() &&
    form.date &&
    form.place.trim() &&
    form.host.trim() &&
    form.url.trim() &&
    form.categories.length > 0;

  function toggleCategory(cat: string) {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter((c) => c !== cat)
        : [...prev.categories, cat],
    }));
  }

  function handleSave() {
    if (!isFormValid) return;
    if (mode === "create") {
      create(form);
    } else if (competitionId) {
      update(competitionId, form);
    }
    router.push("/admin/competitions");
  }

  if (!ready && mode === "edit") {
    return <p className="text-sm text-run-muted">불러오는 중…</p>;
  }

  return (
    <AdminPageShell
      header={
        <div>
          <Link
            href="/admin/competitions"
            className="text-xs text-run-muted transition hover:text-white"
          >
            ← 대회 목록
          </Link>

          <h1 className="mt-4 font-display text-2xl font-bold text-white">
            {mode === "create" ? "새 대회 등록" : "대회 수정"}
          </h1>
          <p className="mt-1 text-sm text-run-muted">대회 정보를 입력하고 저장하세요</p>
        </div>
      }
    >
      <div className="mt-6 rounded-2xl border border-run-border bg-run-surface p-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            label="대회명"
            tone="neutral"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="서울마라톤 2027"
          />
          <label className="block space-y-1.5 text-sm">
            <span className="text-xs font-medium uppercase tracking-wider text-run-muted">
              개최일
            </span>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              onClick={openDatePicker}
              className={`${fieldClass} wip-admin-date cursor-pointer`}
            />
          </label>
          <Input
            label="장소"
            tone="neutral"
            value={form.place}
            onChange={(e) => setForm((p) => ({ ...p, place: e.target.value }))}
            placeholder="서울 광화문"
          />
          <Input
            label="주최"
            tone="neutral"
            value={form.host}
            onChange={(e) => setForm((p) => ({ ...p, host: e.target.value }))}
            placeholder="서울시체육회"
          />
          <label className="block space-y-1.5 text-sm md:col-span-2">
            <span className="text-xs font-medium uppercase tracking-wider text-run-muted">
              공식 URL
            </span>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
              placeholder="https://example.com"
              className={fieldClass}
            />
          </label>
        </div>

        <div className="mt-6">
          <span className="text-xs font-medium uppercase tracking-wider text-run-muted">
            종목 (복수 선택)
          </span>
          <div className="mt-2.5 flex flex-wrap gap-4">
            {CATEGORIES.map((cat) => (
              <label
                key={cat}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={form.categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                  className="admin-checkbox"
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Select
            label="접수 상태"
            value={form.status}
            onChange={(v) => setForm((p) => ({ ...p, status: v as CompStatus }))}
            options={STATUSES.map((s) => ({ value: s, label: s }))}
            className="w-48"
            tone="neutral"
          />
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={() => router.push("/admin/competitions")}>
            취소
          </Button>
          <Button type="button" onClick={handleSave} disabled={!isFormValid}>
            저장
          </Button>
        </div>
      </div>
    </AdminPageShell>
  );
}
