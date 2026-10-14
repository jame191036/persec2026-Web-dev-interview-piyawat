/**
 * ข้อ 5: เรียงหลักของจำนวนเต็มบวกจากมากไปน้อย
 *
 * @example sortDigitsDescending(3008) // 8300
 */
export function sortDigitsDescending(value: number): number {
  if (!Number.isSafeInteger(value) || value <= 0) {
    throw new RangeError(`ต้องเป็นจำนวนเต็มบวกที่ไม่เกิน Number.MAX_SAFE_INTEGER แต่ได้รับ ${value}`);
  }

  // แต่ละหลักเป็นอักขระตัวเดียว จึงใช้ sort ปกติ (เรียงตามรหัสอักขระ) แล้วกลับลำดับได้เลย
  const result = Number(String(value).split('').sort().reverse().join(''));

  if (!Number.isSafeInteger(result)) {
    throw new RangeError(`ผลลัพธ์ของ ${value} เกิน Number.MAX_SAFE_INTEGER ทำให้ค่าคลาดเคลื่อนได้`);
  }
  
  return result;
}
