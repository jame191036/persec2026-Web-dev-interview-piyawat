export const MIN_ROMAN = 1;
export const MAX_ROMAN = 3999;

const ROMAN_TABLE: ReadonlyArray<readonly [value: number, symbol: string]> = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

const SYMBOL_VALUES = new Map([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000],
]);

/** รูปแบบมาตรฐานของเลขโรมัน 1-3999 แยกตามหลักพัน ร้อย สิบ หน่วย */
const VALID_ROMAN = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

/**
 * ข้อ 4.1: แปลงจำนวนเต็ม (1-3999) เป็นเลขโรมัน
 *
 * @example toRoman(1989) // 'MCMLXXXIX'
 */
export function toRoman(value: number): string {
  if (!Number.isInteger(value) || value < MIN_ROMAN || value > MAX_ROMAN) {
    throw new RangeError(`toRoman รองรับเฉพาะจำนวนเต็ม ${MIN_ROMAN}-${MAX_ROMAN} แต่ได้รับ ${value}`);
  }

  let remaining = value;
  let result = '';
  for (const [amount, symbol] of ROMAN_TABLE) {
    while (remaining >= amount) {
      result += symbol;
      remaining -= amount;
    }
  }
  return result;
}

/**
 * ข้อ 4.2: แปลงเลขโรมันรูปแบบมาตรฐานเป็นจำนวนเต็ม (ไม่สนตัวพิมพ์เล็ก-ใหญ่)
 * ถ้าตัวไหนน้อยกว่าตัวถัดไปให้ลบ (เช่น IV = 5 - 1) ไม่อย่างนั้นให้บวก
 *
 * @example fromRoman('MCMLXXXIX') // 1989
 */
export function fromRoman(roman: string): number {
  const normalized = roman.toUpperCase();
  if (normalized === '' || !VALID_ROMAN.test(normalized)) {
    throw new Error(`"${roman}" ไม่ใช่เลขโรมันรูปแบบมาตรฐาน`);
  }

  let total = 0;
  for (let i = 0; i < normalized.length; i++) {
    const current = SYMBOL_VALUES.get(normalized[i]!)!;
    const next = SYMBOL_VALUES.get(normalized[i + 1] ?? '') ?? 0;
    total += current < next ? -current : current;
  }
  return total;
}
