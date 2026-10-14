import { describe, expect, it } from 'vitest';
import { naturalSort } from '../src/02-natural-sort';

describe('ข้อ 2: naturalSort', () => {
  describe('ตัวอย่างจากโจทย์', () => {
    it('["TH19", "SG20", "TH2"]', () => {
      expect(naturalSort(['TH19', 'SG20', 'TH2'])).toEqual(['SG20', 'TH2', 'TH19']);
    });

    it('["TH10", "TH3Netflix", "TH1", "TH7"]', () => {
      expect(naturalSort(['TH10', 'TH3Netflix', 'TH1', 'TH7'])).toEqual(['TH1', 'TH3Netflix', 'TH7', 'TH10']);
    });
  });

  describe('กรณีขอบ', () => {
    it('array ว่าง', () => {
      expect(naturalSort([])).toEqual([]);
    });

    it('มีสมาชิกตัวเดียว', () => {
      expect(naturalSort(['TH1'])).toEqual(['TH1']);
    });

    it('ไม่แก้ไข array เดิม', () => {
      const input = ['TH10', 'TH2', 'TH1'];
      const snapshot = [...input];
      naturalSort(input);
      expect(input).toEqual(snapshot);
    });

    it('เรียงตามรหัสประเทศก่อน แล้วค่อยเรียงตามตัวเลข', () => {
      expect(naturalSort(['TH1', 'US3', 'SG10', 'SG2', 'US1'])).toEqual(['SG2', 'SG10', 'TH1', 'US1', 'US3']);
    });

    it('string ว่างอยู่ลำดับแรก', () => {
      expect(naturalSort(['TH1', '', 'SG1'])).toEqual(['', 'SG1', 'TH1']);
    });

    it('คำที่ไม่มีตัวเลขต่อท้ายมาก่อนคำที่มีตัวเลข', () => {
      expect(naturalSort(['TH1', 'TH'])).toEqual(['TH', 'TH1']);
    });

    it('มีตัวเลขหลายช่วงในคำเดียว', () => {
      expect(naturalSort(['TH1A10', 'TH1A2', 'TH10A1'])).toEqual(['TH1A2', 'TH1A10', 'TH10A1']);
    });

    it('มีค่าซ้ำ', () => {
      expect(naturalSort(['TH2', 'TH1', 'TH2'])).toEqual(['TH1', 'TH2', 'TH2']);
    });

    it('ตัวเลขที่มี 0 นำหน้าเทียบตามค่าจริง และให้ผลลัพธ์คงที่', () => {
      expect(naturalSort(['TH1', 'TH001', 'TH01', 'TH2'])).toEqual(['TH001', 'TH01', 'TH1', 'TH2']);
    });

    it('ตัวเลขยาวเกิน Number.MAX_SAFE_INTEGER', () => {
      expect(naturalSort(['A100000000000000000000', 'A99999999999999999999'])).toEqual([
        'A99999999999999999999',
        'A100000000000000000000',
      ]);
    });

    it('คำที่ไม่มีตัวเลขเรียงตามตัวอักษร', () => {
      expect(naturalSort(['banana', 'apple', 'cherry'])).toEqual(['apple', 'banana', 'cherry']);
    });
  });
});
