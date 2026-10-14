import { describe, expect, it } from 'vitest';
import { fromRoman, MAX_ROMAN, MIN_ROMAN, toRoman } from '../src/04-roman-numerals';

const EXAMPLES: Array<[number, string]> = [
  [1989, 'MCMLXXXIX'],
  [2000, 'MM'],
  [68, 'LXVIII'],
  [109, 'CIX'],
];

const SYMBOLS: Array<[number, string]> = [
  [1, 'I'],
  [5, 'V'],
  [10, 'X'],
  [50, 'L'],
  [100, 'C'],
  [500, 'D'],
  [1000, 'M'],
];

const SUBTRACTIVE: Array<[number, string]> = [
  [4, 'IV'],
  [9, 'IX'],
  [40, 'XL'],
  [90, 'XC'],
  [400, 'CD'],
  [900, 'CM'],
];

const BOUNDARIES: Array<[number, string]> = [
  [MIN_ROMAN, 'I'],
  [MAX_ROMAN, 'MMMCMXCIX'],
];

describe('ข้อ 4: toRoman', () => {
  it.each(EXAMPLES)('ตัวอย่างจากโจทย์: %i => %s', (value, roman) => {
    expect(toRoman(value)).toBe(roman);
  });

  it.each(SYMBOLS)('สัญลักษณ์พื้นฐาน: %i => %s', (value, roman) => {
    expect(toRoman(value)).toBe(roman);
  });

  it.each(SUBTRACTIVE)('รูปแบบลบ: %i => %s', (value, roman) => {
    expect(toRoman(value)).toBe(roman);
  });

  it.each(BOUNDARIES)('ค่าขอบ: %i => %s', (value, roman) => {
    expect(toRoman(value)).toBe(roman);
  });

  it.each([0, -1, 4000, 1.5, Number.NaN, Number.POSITIVE_INFINITY])('%s อยู่นอกช่วงที่รองรับ จึงโยน RangeError', (value) => {
    expect(() => toRoman(value)).toThrow(RangeError);
  });
});

describe('ข้อ 4: fromRoman', () => {
  it.each(EXAMPLES)('ตัวอย่างจากโจทย์: %s <= %i', (value, roman) => {
    expect(fromRoman(roman)).toBe(value);
  });

  it.each(SYMBOLS)('สัญลักษณ์พื้นฐาน: %s <= %i', (value, roman) => {
    expect(fromRoman(roman)).toBe(value);
  });

  it.each(SUBTRACTIVE)('รูปแบบลบ: %s <= %i', (value, roman) => {
    expect(fromRoman(roman)).toBe(value);
  });

  it.each(BOUNDARIES)('ค่าขอบ: %s <= %i', (value, roman) => {
    expect(fromRoman(roman)).toBe(value);
  });

  it('รับตัวพิมพ์เล็กได้', () => {
    expect(fromRoman('mcmlxxxix')).toBe(1989);
    expect(fromRoman('McMlXxXiX')).toBe(1989);
  });

  it.each([
    ['', 'string ว่าง'],
    ['IIII', 'I ซ้ำเกิน 3 ตัว'],
    ['VV', 'V ซ้ำไม่ได้'],
    ['IC', 'I ลบได้แค่ V และ X'],
    ['IM', 'I ลบได้แค่ V และ X'],
    ['XM', 'X ลบได้แค่ L และ C'],
    ['MMMM', 'เกิน 3999'],
    ['IXI', 'รูปแบบไม่มาตรฐาน'],
    ['ABC', 'ไม่ใช่สัญลักษณ์โรมัน'],
    [' X', 'มีช่องว่าง'],
  ])('"%s" ไม่ถูกต้อง (%s) จึงโยน Error', (roman) => {
    expect(() => fromRoman(roman)).toThrow();
  });
});

describe('ข้อ 4: แปลงไปแล้วแปลงกลับได้ค่าเดิม', () => {
  it(`ทุกค่าตั้งแต่ ${MIN_ROMAN} ถึง ${MAX_ROMAN}`, () => {
    for (let value = MIN_ROMAN; value <= MAX_ROMAN; value++) {
      expect(fromRoman(toRoman(value))).toBe(value);
    }
  });
});
