"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/shared/components/ui/Button";
import { AdminPageShell } from "@/shared/components/ui/AdminPageShell";
import { Select } from "@/shared/components/ui/Select";
import { cn } from "@/shared/lib/utils/cn";

type Category = "풀마라톤" | "하프" | "10K" | "5K";

interface PreviewRow {
  rank: number;
  name: string;
  gender: string;
  birth: string;
  record: string;
  hasError?: boolean;
}

interface MockCompetition {
  id: string;
  name: string;
}

const MOCK_COMPETITIONS: MockCompetition[] = [
  { id: "1", name: "서울마라톤 2026" },
  { id: "2", name: "동아마라톤 2026" },
  { id: "3", name: "춘천마라톤 2025" },
];

const CATEGORIES: Category[] = ["풀마라톤", "하프", "10K", "5K"];

const MOCK_PREVIEW: PreviewRow[] = [
  { rank: 1, name: "김준혁", gender: "M", birth: "1990-03-12", record: "02:41:08" },
  { rank: 2, name: "박지성", gender: "M", birth: "1988-07-22", record: "02:43:55" },
  { rank: 3, name: "이현우", gender: "M", birth: "1992-11-05", record: "02:47:30" },
  { rank: 4, name: "최수연", gender: "F", birth: "1995-02-18", record: "02:51:44" },
  { rank: 5, name: "정민준", gender: "M", birth: "1987-09-30", record: "02:53:01" },
];

// async function uploadTop100(competitionId: string, category: string, rows: PreviewRow[]): Promise<void> { /* TODO: API 연동 */ }

export function Top100UploadScreen() {
  const [selectedCompetition, setSelectedCompetition] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewRows, setPreviewRows] = useState<PreviewRow[] | null>(null);
  const [uploadDone, setUploadDone] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function simulateFileParse(file: File) {
    setFileName(file.name);
    // 실제 파싱은 API 연동 시 서버에서 처리; UI 시연용 mock 데이터 사용
    setPreviewRows(MOCK_PREVIEW);
    setUploadDone(false);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) simulateFileParse(file);
  }

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith(".xlsx") || file.name.endsWith(".xls"))) {
      simulateFileParse(file);
    }
  }, []);

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleUpload() {
    if (!selectedCompetition || !selectedCategory || !previewRows) return;
    // TODO: API 연동 시 여기서 호출
    setUploadDone(true);
  }

  function handleReset() {
    setFileName(null);
    setPreviewRows(null);
    setUploadDone(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const canUpload = selectedCompetition && selectedCategory && previewRows && !uploadDone;

  return (
    <AdminPageShell
      header={
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Top100 엑셀 업로드</h1>
          <p className="mt-1 text-sm text-run-muted">
            대회별 Top100 랭킹 데이터를 엑셀로 업로드합니다
          </p>
        </div>
      }
    >
      {/* 대회 / 종목 선택 */}
      <div className="mt-6 flex gap-4">
        <Select
          label="대회 선택"
          value={selectedCompetition}
          onChange={(v) => setSelectedCompetition(v)}
          placeholder="대회를 선택하세요"
          options={MOCK_COMPETITIONS.map((c) => ({ value: c.id, label: c.name }))}
          className="w-56"
        />

        <Select
          label="종목"
          value={selectedCategory}
          onChange={(v) => setSelectedCategory(v as Category | "")}
          placeholder="종목 선택"
          options={CATEGORIES.map((c) => ({ value: c, label: c }))}
          className="w-40"
        />
      </div>

      {/* 파일 업로드 영역 */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "mt-6 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed px-8 py-12 transition",
          isDragging
            ? "border-run-volt bg-run-volt/5"
            : "border-run-border bg-run-surface/40 hover:border-run-border/80",
        )}
      >
        <div className="text-3xl text-run-muted">📄</div>
        <p className="mt-3 text-sm font-medium text-white">
          엑셀 파일을 여기로 드래그하거나
        </p>
        <p className="mt-1 text-xs text-run-muted">xlsx, xls 파일만 허용</p>
        <Button
          type="button"
          variant="outline"
          className="mt-4"
          onClick={() => fileInputRef.current?.click()}
        >
          파일 선택
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="hidden"
        />
        {fileName && (
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-run-border bg-run-surface px-4 py-2">
            <span className="text-xs text-run-volt">✓</span>
            <span className="text-xs text-white">{fileName}</span>
            <button
              onClick={handleReset}
              className="ml-2 text-xs text-run-muted hover:text-white"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* 미리보기 테이블 */}
      {previewRows && (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              업로드 미리보기
              <span className="ml-2 text-run-muted">총 {previewRows.length}건</span>
            </h2>
          </div>
          <div className="mt-3 overflow-x-auto rounded-2xl border border-run-border">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-run-border bg-run-surface/80 text-left text-xs font-medium uppercase tracking-wider text-run-muted">
                  <th className="px-4 py-3">순위</th>
                  <th className="px-4 py-3">이름</th>
                  <th className="px-4 py-3">성별</th>
                  <th className="px-4 py-3">생년월일</th>
                  <th className="admin-table-col-record px-4 py-3">기록</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-run-border/40">
                {previewRows.map((row) => (
                  <tr
                    key={row.rank}
                    className={cn(
                      "transition",
                      row.hasError
                        ? "bg-red-500/10 text-red-400"
                        : "hover:bg-run-surface/60",
                    )}
                  >
                    <td className="px-4 py-3 font-bold text-run-volt">{row.rank}</td>
                    <td className="px-4 py-3 font-medium text-white">{row.name}</td>
                    <td className="px-4 py-3 text-run-muted">{row.gender}</td>
                    <td className="px-4 py-3 text-run-muted">{row.birth}</td>
                    <td className="admin-table-col-record px-4 py-3 text-white">{row.record}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 업로드 확인 버튼 */}
          <div className="mt-4 flex items-center gap-4">
            {uploadDone ? (
              <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm text-green-400">
                <span>✓</span>
                <span>업로드가 완료되었습니다</span>
              </div>
            ) : (
              <Button type="button" onClick={handleUpload} disabled={!canUpload}>
                업로드 확인
              </Button>
            )}
            <Button type="button" variant="ghost" onClick={handleReset}>
              초기화
            </Button>
          </div>
        </div>
      )}

      {/* 엑셀 포맷 안내 */}
      <div className="mt-10 rounded-2xl border border-run-border bg-run-surface/40 p-5">
        <h3 className="text-sm font-semibold text-white">엑셀 포맷 안내</h3>
        <p className="mt-1 text-xs text-run-muted">
          아래 순서와 형식을 반드시 지켜주세요
        </p>
        <div className="mt-3 overflow-x-auto rounded-xl border border-run-border">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="border-b border-run-border bg-run-surface text-left text-run-muted">
                <th className="px-3 py-2">A열: 순위</th>
                <th className="px-3 py-2">B열: 이름</th>
                <th className="px-3 py-2">C열: 성별</th>
                <th className="px-3 py-2">D열: 생년월일</th>
                <th className="admin-table-col-record px-3 py-2">E열: 기록</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-white">
                <td className="px-3 py-2">숫자 (1, 2, 3…)</td>
                <td className="px-3 py-2">한글/영문</td>
                <td className="px-3 py-2">M 또는 F</td>
                <td className="px-3 py-2">YYYY-MM-DD</td>
                <td className="px-3 py-2">HH:MM:SS</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <Button type="button" variant="ghost" className="text-xs">
            샘플 파일 다운로드 ↓
          </Button>
        </div>
      </div>
    </AdminPageShell>
  );
}
