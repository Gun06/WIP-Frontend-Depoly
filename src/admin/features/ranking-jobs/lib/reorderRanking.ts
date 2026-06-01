/** 순위 스왑 후 rank 1..n 재부여 */
export function reorderByRank<T extends { id: string; rank: number }>(
  items: T[],
  id: string,
  direction: "up" | "down",
): T[] {
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return items;

  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= items.length) return items;

  const next = [...items];
  const [moved] = next.splice(index, 1);
  next.splice(targetIndex, 0, moved);

  return next.map((item, i) => ({ ...item, rank: i + 1 }));
}

export function orderSignature<T extends { id: string }>(items: T[]): string {
  return items.map((item) => item.id).join(",");
}
