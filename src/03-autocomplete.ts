const MATCH_RANK = {
  start: 0,
  middle: 1,
  end: 2,
} as const;

type MatchRank = (typeof MATCH_RANK)[keyof typeof MATCH_RANK];

/** จัดกลุ่มจากตำแหน่งแรกที่เจอคำค้น: ต้นคำ, กลางคำ หรือท้ายคำ */
function rankMatch(text: string, needle: string): MatchRank | undefined {
  const index = text.indexOf(needle);
  if (index === -1) return undefined;
  if (index === 0) return MATCH_RANK.start;
  if (index + needle.length === text.length) return MATCH_RANK.end;
  return MATCH_RANK.middle;
}

/**
 * ข้อ 3: แนะนำคำจาก items ที่มี search อยู่ในคำ (ไม่สนตัวพิมพ์เล็ก-ใหญ่)
 * เรียงคำที่ขึ้นต้นด้วย search ก่อน ตามด้วยคำที่ search อยู่กลางคำ แล้วคำที่ search อยู่ท้ายคำ
 * คำในกลุ่มเดียวกันคงลำดับเดิมจาก items และคืนผลลัพธ์ไม่เกิน maxResult ตัว
 *
 * @example autocomplete('th', ['Mother', 'Think', 'Worthy', 'Apple', 'Android'], 2) // ['Think', 'Mother']
 */
export function autocomplete(search: string, items: readonly string[], maxResult: number): string[] {
  const limit = Math.floor(maxResult);
  if (search === '' || !(limit > 0)) return [];

  const needle = search.toLowerCase();

  return items
    .map((item) => ({ item, rank: rankMatch(item.toLowerCase(), needle) }))
    .filter((candidate): candidate is { item: string; rank: MatchRank } => candidate.rank !== undefined)
    // Array.prototype.sort เป็น stable sort คำที่ rank เท่ากันจึงคงลำดับเดิม
    .sort((a, b) => a.rank - b.rank)
    .slice(0, limit)
    .map((candidate) => candidate.item);
}
