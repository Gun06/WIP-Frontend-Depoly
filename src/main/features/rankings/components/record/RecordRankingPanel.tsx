"use client";

import { useEffect, useState } from "react";
import { PillFilter } from "@/main/features/rankings/components/common/PillFilter";
import { SeasonToggle } from "@/main/features/rankings/components/record/SeasonToggle";
import { MyRankBar } from "@/main/features/rankings/components/record/MyRankBar";
import { RecordRankList } from "@/main/features/rankings/components/record/RecordRankList";
import {
  MOCK_RECORD_RANKINGS,
  MOCK_MY_RECORD_RANK,
} from "@/shared/lib/mocks/rankings";
import type { RankEvent, RankGender, RankSeason } from "@/shared/types/domain";

const EVENT_OPTIONS = [
  { value: "full", label: "풀마라톤" },
  { value: "half", label: "하프" },
  { value: "10k", label: "10K" },
  { value: "5k", label: "5K" },
] as const;

const GENDER_OPTIONS = [
  { value: "all", label: "전체" },
  { value: "M", label: "남" },
  { value: "F", label: "여" },
] as const;

type Props = {
  isLoggedIn: boolean;
};

export function RecordRankingPanel({ isLoggedIn }: Props) {
  const [season, setSeason] = useState<RankSeason>("pb");
  const [event, setEvent] = useState<RankEvent>("full");
  const [gender, setGender] = useState<RankGender>("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, [season, event, gender]);

  const myRank = isLoggedIn ? MOCK_MY_RECORD_RANK : null;

  return (
    <div className="space-y-5">
      {/* 시즌 토글 */}
      <SeasonToggle value={season} onChange={setSeason} />

      {/* 종목 + 성별 필터 */}
      <div className="space-y-3">
        <PillFilter
          options={EVENT_OPTIONS}
          value={event}
          onChange={(v) => setEvent(v as RankEvent)}
        />
        <PillFilter
          options={GENDER_OPTIONS}
          value={gender}
          onChange={(v) => setGender(v as RankGender)}
        />
        {/* 연령대 필터 슬롯 (MVP 이후) */}
        {/* <AgeFilter value={age} onChange={setAge} /> */}
      </div>

      {/* 내 순위 바 (로그인 + 내 순위가 top5 밖일 때) — 클릭 시 내 row로 스크롤 */}
      {myRank && myRank.rank > 5 && !isLoading && (
        <MyRankBar
          myRank={myRank}
          onScrollToRow={() => {
            document
              .getElementById("my-rank-row")
              ?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        />
      )}

      {/* 랭킹 리스트 */}
      <RecordRankList
        items={MOCK_RECORD_RANKINGS}
        isLoading={isLoading}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
