const CHUNK_PATTERN = /\d+|\D+/g;
const DIGITS_PATTERN = /^\d/;

function compareText(a: string, b: string): number {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

/**
 * เทียบสตริงตัวเลขตามค่าจริงโดยไม่แปลงเป็น number
 * จึงรองรับตัวเลขยาวเกิน Number.MAX_SAFE_INTEGER ได้
 */
function compareDigits(a: string, b: string): number {
  const x = a.replace(/^0+(?=\d)/, "");
  const y = b.replace(/^0+(?=\d)/, "");

  if (x.length !== y.length) {
    return x.length - y.length;
  }

  return compareText(x, y);
}

/**
 * Comparator แบบ natural order: แยกสตริงเป็นช่วงตัวอักษรกับช่วงตัวเลข
 * ช่วงตัวอักษรเทียบตามรหัสอักขระ ช่วงตัวเลขเทียบตามค่าจริง
 */
export function compareNatural(a: string, b: string): number {
  const chunksA = a.match(CHUNK_PATTERN) ?? [];
  const chunksB = b.match(CHUNK_PATTERN) ?? [];
  const length = Math.min(chunksA.length, chunksB.length);

  for (let i = 0; i < length; i++) {
    const x = chunksA[i]!;
    const y = chunksB[i]!;
    const bothNumeric = DIGITS_PATTERN.test(x) && DIGITS_PATTERN.test(y);
    const result = bothNumeric ? compareDigits(x, y) : compareText(x, y);
    if (result !== 0) {
      return result;
    }
  }

  if (chunksA.length !== chunksB.length) {
    return chunksA.length - chunksB.length;
  }

  // ค่าเท่ากันแต่เขียนต่างกัน เช่น "TH01" กับ "TH1" ให้ผลลัพธ์คงที่เสมอ
  return compareText(a, b);
}

/**
 * ข้อ 2: เรียง array string แบบ natural order (ไม่แก้ไข array เดิม)
 *
 * @example naturalSort(['TH19', 'SG20', 'TH2']) // ['SG20', 'TH2', 'TH19']
 */
export function naturalSort(items: readonly string[]): string[] {
  return [...items].sort(compareNatural);
}
