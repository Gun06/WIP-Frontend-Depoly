"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "@/shared/lib/utils/cn";
import {
  INITIAL_LAST_UPDATED,
  INITIAL_RANKING_LOGS,
  RECALC_TYPE_LABEL,
  type JobStatus,
  type LastUpdated,
  type RankingLog,
  type RecalcKind,
} from "../data/mockRanking";

const RECALC_BUTTONS: { kind: RecalcKind; label: string }[] = [
  { kind: "record", label: "기록 랭킹 재계산" },
  { kind: "influencer", label: "인플루언서 랭킹 재계산" },
  { kind: "group", label: "단체 랭킹 재계산" },
];

const ALL_RECALC_LABEL = "전체 일괄 재계산";

const STATUS_CLEAR_MS = 2000;

function formatNow(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function statusLabel(status: JobStatus): string | null {
  if (status === "REQUESTING") return "요청 중...";
  if (status === "SUCCESS") return "완료";
  if (status === "FAIL") return "실패";
  return null;
}

function statusToneClass(status: JobStatus): string {
  if (status === "REQUESTING") return "admin-recalc-btn__status--pending";
  if (status === "FAIL") return "admin-recalc-btn__status--fail";
  return "admin-recalc-btn__status--done";
}

function logStatusLabel(status: RankingLog["status"]): string {
  return status === "SUCCESS" ? "성공" : "실패";
}

function RecalcActionButton({
  label,
  status,
  onClick,
}: {
  label: string;
  status: JobStatus;
  onClick: () => void;
}) {
  const statusText = statusLabel(status);
  const busy = status === "REQUESTING";

  return (
    <button
      type="button"
      className="admin-drawer-btn-approve admin-recalc-btn w-full sm:w-auto"
      disabled={busy}
      onClick={onClick}
    >
      <span>{label}</span>
      {statusText ? (
        <>
          <span className="admin-recalc-btn__sep" aria-hidden>
            ·
          </span>
          <span className={cn("admin-recalc-btn__status", statusToneClass(status))}>
            {statusText}
          </span>
        </>
      ) : null}
    </button>
  );
}

export function RankingRecalcSection() {
  const [lastUpdated, setLastUpdated] = useState<LastUpdated>(INITIAL_LAST_UPDATED);
  const [logs, setLogs] = useState<RankingLog[]>(INITIAL_RANKING_LOGS);
  const [jobStatus, setJobStatus] = useState<Record<RecalcKind, JobStatus>>({
    record: "idle",
    influencer: "idle",
    group: "idle",
    all: "idle",
  });
  const clearTimers = useRef<Partial<Record<RecalcKind, ReturnType<typeof setTimeout>>>>({});

  const scheduleClearStatus = useCallback((kind: RecalcKind) => {
    const existing = clearTimers.current[kind];
    if (existing) window.clearTimeout(existing);

    clearTimers.current[kind] = window.setTimeout(() => {
      setJobStatus((prev) => ({ ...prev, [kind]: "idle" }));
      delete clearTimers.current[kind];
    }, STATUS_CLEAR_MS);
  }, []);

  const runRecalc = useCallback(
    (kind: RecalcKind) => {
      const existing = clearTimers.current[kind];
      if (existing) window.clearTimeout(existing);

      setJobStatus((prev) => ({ ...prev, [kind]: "REQUESTING" }));

      window.setTimeout(() => {
        const success = kind !== "all" || Math.random() > 0.3;
        const now = formatNow();
        const finalStatus: JobStatus = success ? "SUCCESS" : "FAIL";

        setJobStatus((prev) => ({ ...prev, [kind]: finalStatus }));

        if (success) {
          setLastUpdated((prev) => {
            if (kind === "all") {
              return { record: now, influencer: now, group: now };
            }
            return { ...prev, [kind]: now };
          });
        }

        setLogs((prev) => [
          {
            id: String(Date.now()),
            datetime: now,
            type: RECALC_TYPE_LABEL[kind],
            status: success ? "SUCCESS" : "FAIL",
          },
          ...prev,
        ].slice(0, 5));

        scheduleClearStatus(kind);
      }, 1200);
    },
    [scheduleClearStatus],
  );

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-sm font-semibold text-white">마지막 갱신</h2>
        <ul className="mt-3 space-y-2 text-sm text-run-muted">
          <li>
            <span className="text-white">기록 랭킹</span>
            <span className="mx-2 text-run-border">—</span>
            최근 갱신: {lastUpdated.record}
          </li>
          <li>
            <span className="text-white">인플루언서 랭킹</span>
            <span className="mx-2 text-run-border">—</span>
            최근 갱신: {lastUpdated.influencer}
          </li>
          <li>
            <span className="text-white">단체 랭킹</span>
            <span className="mx-2 text-run-border">—</span>
            최근 갱신: {lastUpdated.group}
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-sm font-semibold text-white">재계산 실행</h2>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {RECALC_BUTTONS.map(({ kind, label }) => (
            <RecalcActionButton
              key={kind}
              label={label}
              status={jobStatus[kind]}
              onClick={() => runRecalc(kind)}
            />
          ))}
        </div>

        <div className="my-6 border-t border-run-border" />

        <RecalcActionButton
          label={ALL_RECALC_LABEL}
          status={jobStatus.all}
          onClick={() => runRecalc("all")}
        />
      </section>

      <section>
        <h2 className="text-sm font-semibold text-white">갱신 이력</h2>
        <p className="mt-1 text-xs text-run-muted">최근 5건</p>
        <div className="admin-table-wrap mt-4 overflow-x-auto">
          <table className="admin-table w-full table-fixed border-collapse text-sm">
            <colgroup>
              <col className="w-[38%]" />
              <col className="w-[32%]" />
              <col className="w-[30%]" />
            </colgroup>
            <thead>
              <tr className="admin-table-head border-b border-run-border text-left text-xs font-medium uppercase tracking-wider text-run-muted">
                <th className="py-3 pr-4 whitespace-nowrap">일시</th>
                <th className="py-3 pr-4 whitespace-nowrap">종류</th>
                <th className="py-3 whitespace-nowrap">상태</th>
              </tr>
            </thead>
            <tbody className="admin-table-body">
              {logs.map((log) => (
                <tr key={log.id} className="admin-table-row transition">
                  <td className="py-3.5 pr-4 whitespace-nowrap text-run-muted">{log.datetime}</td>
                  <td className="py-3.5 pr-4 text-white">{log.type}</td>
                  <td className="py-3.5 whitespace-nowrap">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        log.status === "SUCCESS" ? "text-green-400" : "text-red-400",
                      )}
                    >
                      {logStatusLabel(log.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
