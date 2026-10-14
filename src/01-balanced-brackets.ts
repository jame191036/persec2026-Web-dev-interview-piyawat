const OPENERS = new Set(["(", "[", "{"]);

const CLOSER_TO_OPENER = new Map([
  [")", "("],
  ["]", "["],
  ["}", "{"],
]);

/**
 * ข้อ 1: ตรวจว่าวงเล็บใน input เปิด-ปิดครบคู่และปิดถูกลำดับหรือไม่
 *
 * ใช้ stack: เจอวงเล็บเปิดให้ push, เจอวงเล็บปิดต้อง pop ได้วงเล็บเปิดชนิดเดียวกัน
 * จบแล้ว stack ต้องว่าง
 *
 * @example isBalanced('([{}])') // true
 * @example isBalanced('([)]')   // false
 */
export function isBalanced(input: string): boolean {
  const stack: string[] = [];

  for (const char of input) {
    if (OPENERS.has(char)) {
      stack.push(char);
      continue;
    }

    const expectedOpener = CLOSER_TO_OPENER.get(char);
    if (expectedOpener === undefined || stack.pop() !== expectedOpener) {
      return false;
    }
  }

  return stack.length === 0;
}
