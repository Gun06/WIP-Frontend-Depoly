"use client";

import { useCallback, useEffect, useState } from "react";
import { INITIAL_COMPETITIONS } from "../data/mockCompetitions";
import type { Competition, CompetitionForm } from "../types";

const STORAGE_KEY = "wip-admin-competitions";
const STORAGE_VERSION = "v2"; // mock 데이터 변경 시 버전 올리면 캐시 초기화

function loadCompetitions(): Competition[] {
  if (typeof window === "undefined") return INITIAL_COMPETITIONS;
  try {
    const version = localStorage.getItem(`${STORAGE_KEY}-version`);
    if (version !== STORAGE_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(`${STORAGE_KEY}-version`, STORAGE_VERSION);
      return INITIAL_COMPETITIONS;
    }
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_COMPETITIONS;
    return JSON.parse(raw) as Competition[];
  } catch {
    return INITIAL_COMPETITIONS;
  }
}

function saveCompetitions(items: Competition[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// async function fetchCompetitions(): Promise<Competition[]> { /* TODO: API 연동 */ }

export function useCompetitions() {
  const [competitions, setCompetitions] = useState<Competition[]>(INITIAL_COMPETITIONS);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setCompetitions(loadCompetitions());
    setReady(true);
  }, []);

  const persist = useCallback((next: Competition[]) => {
    setCompetitions(next);
    saveCompetitions(next);
  }, []);

  const getById = useCallback(
    (id: string) => competitions.find((c) => c.id === id) ?? null,
    [competitions],
  );

  const create = useCallback(
    (form: CompetitionForm) => {
      const next: Competition[] = [{ ...form, id: String(Date.now()) }, ...competitions];
      persist(next);
    },
    [competitions, persist],
  );

  const update = useCallback(
    (id: string, form: CompetitionForm) => {
      const next = competitions.map((c) => (c.id === id ? { ...c, ...form } : c));
      persist(next);
    },
    [competitions, persist],
  );

  const remove = useCallback(
    (id: string) => {
      persist(competitions.filter((c) => c.id !== id));
    },
    [competitions, persist],
  );

  return { competitions, ready, getById, create, update, remove };
}
