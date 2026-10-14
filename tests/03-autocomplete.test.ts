import { describe, expect, it } from 'vitest';
import { autocomplete } from '../src/03-autocomplete';

const EXAMPLE_ITEMS = ['Mother', 'Think', 'Worthy', 'Apple', 'Android'];

describe('ข้อ 3: autocomplete', () => {
  describe('ตัวอย่างจากโจทย์', () => {
    it('autocomplete("th", [...], 2) => ["Think", "Mother"]', () => {
      expect(autocomplete('th', EXAMPLE_ITEMS, 2)).toEqual(['Think', 'Mother']);
    });

    it('ถ้าไม่จำกัดจำนวนจะได้ Think, Mother, Worthy', () => {
      expect(autocomplete('th', EXAMPLE_ITEMS, 10)).toEqual(['Think', 'Mother', 'Worthy']);
    });
  });

  describe('การเรียงลำดับ', () => {
    it('ต้นคำมาก่อน ตามด้วยกลางคำ แล้วท้ายคำ', () => {
      expect(autocomplete('th', ['Moth', 'Mother', 'Think'], 10)).toEqual(['Think', 'Mother', 'Moth']);
    });

    it('คำในกลุ่มเดียวกันคงลำดับเดิมจาก items', () => {
      expect(autocomplete('th', ['Worthy', 'Mother', 'Thumb', 'Thai'], 10)).toEqual([
        'Thumb',
        'Thai',
        'Worthy',
        'Mother',
      ]);
    });

    it('ใช้ตำแหน่งแรกที่เจอคำค้นในการจัดกลุ่ม', () => {
      // "thmoth" เจอ "th" ที่ต้นคำ ส่วน "mothth" เจอครั้งแรกกลางคำ
      expect(autocomplete('th', ['mothth', 'moth', 'thmoth'], 10)).toEqual(['thmoth', 'mothth', 'moth']);
    });

    it('คำที่ตรงกับ search ทั้งคำนับเป็นกลุ่มต้นคำ', () => {
      expect(autocomplete('th', ['Moth', 'TH'], 10)).toEqual(['TH', 'Moth']);
    });
  });

  describe('ไม่สนตัวพิมพ์เล็ก-ใหญ่', () => {
    it('search ตัวพิมพ์ใหญ่', () => {
      expect(autocomplete('TH', EXAMPLE_ITEMS, 2)).toEqual(['Think', 'Mother']);
    });

    it('search ตัวพิมพ์ผสม', () => {
      expect(autocomplete('aNd', EXAMPLE_ITEMS, 5)).toEqual(['Android']);
    });

    it('คืนคำตามที่เขียนใน items ไม่แปลงตัวพิมพ์', () => {
      expect(autocomplete('apple', ['APPLE', 'apple'], 5)).toEqual(['APPLE', 'apple']);
    });
  });

  describe('กรณีขอบ', () => {
    it('ไม่มีคำที่ตรงเลย', () => {
      expect(autocomplete('xyz', EXAMPLE_ITEMS, 5)).toEqual([]);
    });

    it('items ว่าง', () => {
      expect(autocomplete('th', [], 5)).toEqual([]);
    });

    it('search ว่างคืน array ว่าง', () => {
      expect(autocomplete('', EXAMPLE_ITEMS, 5)).toEqual([]);
    });

    it('maxResult เป็น 0 หรือติดลบคืน array ว่าง', () => {
      expect(autocomplete('th', EXAMPLE_ITEMS, 0)).toEqual([]);
      expect(autocomplete('th', EXAMPLE_ITEMS, -1)).toEqual([]);
    });

    it('maxResult เป็นทศนิยมปัดลง', () => {
      expect(autocomplete('th', EXAMPLE_ITEMS, 2.9)).toEqual(['Think', 'Mother']);
    });

    it('maxResult เป็น NaN คืน array ว่าง', () => {
      expect(autocomplete('th', EXAMPLE_ITEMS, Number.NaN)).toEqual([]);
    });

    it('maxResult เป็น Infinity คืนทุกคำที่ตรง', () => {
      expect(autocomplete('th', EXAMPLE_ITEMS, Number.POSITIVE_INFINITY)).toEqual(['Think', 'Mother', 'Worthy']);
    });

    it('ไม่แก้ไข items เดิม', () => {
      const items = [...EXAMPLE_ITEMS];
      autocomplete('th', items, 2);
      expect(items).toEqual(EXAMPLE_ITEMS);
    });
  });
});
