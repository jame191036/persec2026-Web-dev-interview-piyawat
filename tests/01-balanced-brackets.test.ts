import { describe, expect, it } from 'vitest';
import { isBalanced } from '../src/01-balanced-brackets';

describe('ข้อ 1: isBalanced', () => {
  describe('ตัวอย่างจากโจทย์', () => {
    it.each([
      ['()', true],
      ['([{)', false],
      ['([]]', false],
      ['([{}])', true],
      ['([[{}]]]', false],
      [')', false],
      ['(]}])', false],
      ['([)]', false],
      ['{', false],
    ])('%s => %s', (input, expected) => {
      expect(isBalanced(input)).toBe(expected);
    });
  });

  describe('กรณีขอบ', () => {
    it('string ว่างถือว่าครบคู่', () => {
      expect(isBalanced('')).toBe(true);
    });

    it('วงเล็บหลายชุดเรียงต่อกัน', () => {
      expect(isBalanced('()[]{}')).toBe(true);
      expect(isBalanced('(){}[]([{}])')).toBe(true);
    });

    it('ซ้อนกันลึกหลายชั้น', () => {
      const deep = '('.repeat(10_000) + ')'.repeat(10_000);
      expect(isBalanced(deep)).toBe(true);
      expect(isBalanced(deep + ')')).toBe(false);
    });

    it('มีแต่วงเล็บปิด', () => {
      expect(isBalanced('}}')).toBe(false);
    });

    it('ปิดก่อนเปิด', () => {
      expect(isBalanced(')(')).toBe(false);
    });

    it('ชนิดถูกแต่ปิดสลับลำดับ', () => {
      expect(isBalanced('{[}]')).toBe(false);
    });

    it('มีตัวอักษรอื่นนอกจากวงเล็บคืน false', () => {
      expect(isBalanced('(a)')).toBe(false);
      expect(isBalanced('( )')).toBe(false);
    });
  });
});
