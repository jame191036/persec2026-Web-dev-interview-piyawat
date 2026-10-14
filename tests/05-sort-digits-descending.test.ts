import { describe, expect, it } from 'vitest';
import { sortDigitsDescending } from '../src/05-sort-digits-descending';

describe('ข้อ 5: sortDigitsDescending', () => {
  describe('ตัวอย่างจากโจทย์', () => {
    it.each([
      [3008, 8300],
      [1989, 9981],
      [2679, 9762],
      [9163, 9631],
    ])('%i => %i', (input, expected) => {
      expect(sortDigitsDescending(input)).toBe(expected);
    });
  });

  describe('กรณีขอบ', () => {
    it.each([
      [1, 1, 'เลขหลักเดียว'],
      [10, 10, 'มี 0 อยู่ท้ายแล้ว'],
      [1000, 1000, 'มี 0 หลายตัว'],
      [987, 987, 'เรียงมากไปน้อยอยู่แล้ว'],
      [123456789, 987654321, 'เรียงน้อยไปมาก'],
      [1111, 1111, 'เลขซ้ำทั้งหมด'],
      [1000000000000008, 8100000000000000, 'เลขขนาดใหญ่ที่ผลลัพธ์ยังอยู่ในช่วง safe integer'],
    ])('%i => %i (%s)', (input, expected) => {
      expect(sortDigitsDescending(input)).toBe(expected);
    });

    it.each([0, -1, -3008, 1.5, Number.NaN, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER + 2])(
      '%s ไม่ใช่จำนวนเต็มบวกที่รองรับ จึงโยน RangeError',
      (input) => {
        expect(() => sortDigitsDescending(input)).toThrow(RangeError);
      },
    );

    it('โยน RangeError ถ้าผลลัพธ์เกิน Number.MAX_SAFE_INTEGER', () => {
      // 9007199254740991 เรียงแล้วได้ 9999977544211000 ซึ่งเกิน safe integer
      expect(() => sortDigitsDescending(Number.MAX_SAFE_INTEGER)).toThrow(RangeError);
    });
  });
});
