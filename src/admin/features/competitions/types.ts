export type CompStatus = "접수전" | "접수중" | "마감" | "종료";

export interface Competition {
  id: string;
  name: string;
  date: string;
  place: string;
  host: string;
  url: string;
  categories: string[];
  status: CompStatus;
}

export type CompetitionForm = Omit<Competition, "id">;

export const CATEGORIES = ["풀마라톤", "하프", "10K", "5K"] as const;
export const STATUSES: CompStatus[] = ["접수전", "접수중", "마감", "종료"];

export const EMPTY_FORM: CompetitionForm = {
  name: "",
  date: "",
  place: "",
  host: "",
  url: "",
  categories: [],
  status: "접수전",
};
