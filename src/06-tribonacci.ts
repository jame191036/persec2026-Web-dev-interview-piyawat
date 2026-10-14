const MAX_SIGNATURE_LENGTH = 3;

/**
 * ข้อ 6: สร้างลำดับ Tribonacci ยาว length ตัว (นับรวมค่าเริ่มต้น)
 * ตัวถัดไปคือผลรวมของ 3 ตัวก่อนหน้า ถ้ามีไม่ถึง 3 ตัวให้รวมเท่าที่มี
 * ซึ่งให้ผลเหมือนเติม 0 ไว้หน้าค่าเริ่มต้น
 *
 * @example tribonacci([1, 3, 5], 5) // [1, 3, 5, 9, 17]
 */
export function tribonacci(signature: readonly number[], length: number): number[] {
  if (signature.length > MAX_SIGNATURE_LENGTH) {
    throw new RangeError(`ค่าเริ่มต้นต้องมี 0-${MAX_SIGNATURE_LENGTH} ตัว แต่ได้รับ ${signature.length} ตัว`);
  }
  if (!signature.every(Number.isInteger)) {
    throw new TypeError('ค่าเริ่มต้นทุกตัวต้องเป็นจำนวนเต็ม');
  }
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError(`length ต้องเป็นจำนวนเต็มที่ไม่ติดลบ แต่ได้รับ ${length}`);
  }

  const sequence = signature.slice(0, length);
  while (sequence.length < length) {
    const previous = sequence.slice(-MAX_SIGNATURE_LENGTH);
    sequence.push(previous.reduce((sum, n) => sum + n, 0));
  }
  return sequence;
}
