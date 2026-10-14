import { describe, expect, it } from 'vitest';
import { tribonacci } from '../src/06-tribonacci';

describe('ข้อ 6: tribonacci', () => {
  describe('ตัวอย่างจากโจทย์', () => {
    it.each([
      [[1, 3, 5], 5, [1, 3, 5, 9, 17]],
      [[2, 2, 2], 3, [2, 2, 2]],
      [[10, 10, 10], 4, [10, 10, 10, 30]],
      [[1, 1, 1], 6, [1, 1, 1, 3, 5, 9]],
      // โจทย์เขียนไว้ [2, 3, 1, 6, 9, 16] แต่ 3 + 1 + 6 = 10 และ 1 + 6 + 10 = 17
      [[2, 3, 1], 6, [2, 3, 1, 6, 10, 17]],
      [[5, 2, 0], 5, [5, 2, 0, 7, 9]],
      [[3, 4, 1], 6, [3, 4, 1, 8, 13, 22]],
    ])('f(%j, %i) => %j', (signature, length, expected) => {
      expect(tribonacci(signature, length)).toEqual(expected);
    });
  });

  describe('ค่าเริ่มต้นไม่ครบ 3 ตัว (รวมเท่าที่มี)', () => {
    it.each([
      [[], 0, []],
      [[], 4, [0, 0, 0, 0]],
      [[1], 1, [1]],
      [[1], 5, [1, 1, 2, 4, 7]],
      [[3, 4], 5, [3, 4, 7, 14, 25]],
    ])('f(%j, %i) => %j', (signature, length, expected) => {
      expect(tribonacci(signature, length)).toEqual(expected);
    });
  });

  describe('กรณีขอบ', () => {
    it('length เป็น 0 คืน array ว่าง', () => {
      expect(tribonacci([1, 3, 5], 0)).toEqual([]);
    });

    it('length น้อยกว่าจำนวนค่าเริ่มต้นจะตัดให้เหลือตาม length', () => {
      expect(tribonacci([5, 2, 0], 2)).toEqual([5, 2]);
      expect(tribonacci([5, 2, 0], 1)).toEqual([5]);
    });

    it('ค่าเริ่มต้นเป็นศูนย์ทั้งหมด', () => {
      expect(tribonacci([0, 0, 0], 5)).toEqual([0, 0, 0, 0, 0]);
    });

    it('รองรับค่าติดลบ', () => {
      expect(tribonacci([-1, 0, 1], 5)).toEqual([-1, 0, 1, 0, 1]);
    });

    it('ไม่แก้ไข array ค่าเริ่มต้นเดิม', () => {
      const signature = [1, 3, 5];
      tribonacci(signature, 6);
      expect(signature).toEqual([1, 3, 5]);
    });

    it('ค่าเริ่มต้นเกิน 3 ตัวโยน RangeError', () => {
      expect(() => tribonacci([1, 2, 3, 4], 5)).toThrow(RangeError);
    });

    it('ค่าเริ่มต้นที่ไม่ใช่จำนวนเต็มโยน TypeError', () => {
      expect(() => tribonacci([1.5], 3)).toThrow(TypeError);
    });

    it.each([-1, 1.5, Number.NaN])('length เป็น %s โยน RangeError', (length) => {
      expect(() => tribonacci([1, 1, 1], length)).toThrow(RangeError);
    });
  });
});
