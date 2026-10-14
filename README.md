# persec2026-Web-dev-interview-piyawat

คำตอบแบบทดสอบก่อนสัมภาษณ์ตำแหน่ง **Web Developer** เขียนด้วย **TypeScript** และทดสอบด้วย **Vitest**

## วิธีรัน

ต้องใช้ Node.js 20.19 ขึ้นไป

```bash
npm install          # ติดตั้ง dependencies
npm test             # รัน unit test ทั้งหมด
npm run test:watch   # รัน test แบบ watch mode
npm run coverage     # รัน test พร้อมรายงาน coverage (ผลอยู่ใน coverage/)
npm run typecheck    # ตรวจ type ด้วย tsc
```

รันเฉพาะข้อเดียวได้ด้วยการระบุชื่อไฟล์ เช่น

```bash
npx vitest run tests/04-roman-numerals.test.ts
```

## โครงสร้างโปรเจกต์

| ข้อ | โจทย์ | Source | Test | Function |
| --- | --- | --- | --- | --- |
| 1 | ตรวจการเปิด-ปิดวงเล็บ | [src/01-balanced-brackets.ts](src/01-balanced-brackets.ts) | [tests/01-balanced-brackets.test.ts](tests/01-balanced-brackets.test.ts) | `isBalanced(input)` |
| 2 | เรียง array string | [src/02-natural-sort.ts](src/02-natural-sort.ts) | [tests/02-natural-sort.test.ts](tests/02-natural-sort.test.ts) | `naturalSort(items)` |
| 3 | Autocomplete | [src/03-autocomplete.ts](src/03-autocomplete.ts) | [tests/03-autocomplete.test.ts](tests/03-autocomplete.test.ts) | `autocomplete(search, items, maxResult)` |
| 4 | เลขโรมัน | [src/04-roman-numerals.ts](src/04-roman-numerals.ts) | [tests/04-roman-numerals.test.ts](tests/04-roman-numerals.test.ts) | `toRoman(value)`, `fromRoman(roman)` |
| 5 | เรียงหลักจากมากไปน้อย | [src/05-sort-digits-descending.ts](src/05-sort-digits-descending.ts) | [tests/05-sort-digits-descending.test.ts](tests/05-sort-digits-descending.test.ts) | `sortDigitsDescending(value)` |
| 6 | Tribonacci | [src/06-tribonacci.ts](src/06-tribonacci.ts) | [tests/06-tribonacci.test.ts](tests/06-tribonacci.test.ts) | `tribonacci(signature, length)` |

ทุก function export รวมไว้ที่ [src/index.ts](src/index.ts) ด้วย

## ตัวอย่างการใช้งาน

```ts
import {
  autocomplete,
  fromRoman,
  isBalanced,
  naturalSort,
  sortDigitsDescending,
  toRoman,
  tribonacci,
} from './src';

isBalanced('([{}])');                                                   // true
naturalSort(['TH10', 'TH3Netflix', 'TH1', 'TH7']);                      // ['TH1', 'TH3Netflix', 'TH7', 'TH10']
autocomplete('th', ['Mother', 'Think', 'Worthy', 'Apple', 'Android'], 2); // ['Think', 'Mother']
toRoman(1989);                                                          // 'MCMLXXXIX'
fromRoman('MCMLXXXIX');                                                 // 1989
sortDigitsDescending(3008);                                             // 8300
tribonacci([1, 3, 5], 5);                                               // [1, 3, 5, 9, 17]
```

## แนวคิดและข้อสมมติแต่ละข้อ

### ข้อ 1: ตรวจการเปิด-ปิดวงเล็บ

ใช้ stack โดยเจอวงเล็บเปิดให้ push และเจอวงเล็บปิดต้อง pop ได้วงเล็บเปิดชนิดเดียวกัน เมื่ออ่านครบแล้ว stack ต้องว่าง ใช้เวลา O(n)

ข้อสมมติ:

- string ว่างคืน `true` เพราะไม่มีวงเล็บที่ค้างอยู่
- ถ้ามีตัวอักษรอื่นนอกจาก `( ) [ ] { }` (รวมถึงช่องว่าง) ถือว่า input ไม่ถูกต้องและคืน `false`

### ข้อ 2: เรียง array string

ใช้ natural sort โดยแยกแต่ละคำเป็นช่วงตัวอักษรกับช่วงตัวเลข เช่น `TH3Netflix` แยกเป็น `TH`, `3`, `Netflix` แล้วเทียบทีละช่วง ช่วงตัวอักษรเทียบตามรหัสอักขระ ส่วนช่วงตัวเลขเทียบตามค่าจริง ทำให้ `TH2` มาก่อน `TH19` และ `SG...` มาก่อน `TH...`

ข้อสมมติ:

- ไม่แก้ไข array เดิม แต่คืน array ใหม่
- ตัวอักษรเทียบแบบแยกตัวพิมพ์เล็ก-ใหญ่ (`TH` มาก่อน `th`) เพราะตัวอย่างในโจทย์เป็นตัวพิมพ์ใหญ่ทั้งหมด
- ตัวเลขเทียบเป็นสตริงตามค่าจริง ไม่ได้แปลงเป็น `number` จึงรองรับเลขยาวเกิน `Number.MAX_SAFE_INTEGER`
- ถ้าค่าเท่ากันแต่เขียนต่างกัน เช่น `TH01` กับ `TH1` จะเทียบสตริงทั้งคำเป็นตัวตัดสิน ผลลัพธ์จึงคงที่เสมอ
- คำที่สั้นกว่าและเหมือนช่วงแรกของอีกคำจะมาก่อน เช่น `TH` มาก่อน `TH1` และ string ว่างอยู่ลำดับแรก

### ข้อ 3: Autocomplete

แปลงทั้ง `search` และ `items` เป็นตัวพิมพ์เล็กก่อนค้นหา แล้วแบ่งคำที่ตรงเป็น 3 กลุ่มตามตำแหน่งที่เจอ `search` ครั้งแรก ได้แก่ ต้นคำ กลางคำ และท้ายคำ เรียงตามลำดับนี้ แล้วตัดให้เหลือ `maxResult` ตัว

ข้อสมมติ:

- คำในกลุ่มเดียวกันคงลำดับเดิมจาก `items` (`Array.prototype.sort` เป็น stable sort) ตรงกับตัวอย่างในโจทย์ที่ `Mother` มาก่อน `Worthy`
- ใช้ตำแหน่งแรกที่เจอในการจัดกลุ่ม เช่น ค้น `th` ใน `mothth` จะเจอครั้งแรกกลางคำ จึงอยู่กลุ่มกลางคำ
- คำที่ตรงกับ `search` ทั้งคำนับเป็นกลุ่มต้นคำ
- คืนคำตามที่เขียนใน `items` โดยไม่แปลงตัวพิมพ์
- `search` เป็น string ว่างคืน `[]` เพราะ autocomplete ไม่ควรแนะนำทุกคำเมื่อยังไม่ได้พิมพ์อะไร
- `maxResult` ที่เป็นทศนิยมจะปัดลง ส่วนค่า 0, ติดลบ หรือ `NaN` คืน `[]`

### ข้อ 4: เลขโรมัน

- `toRoman`: ใช้ตารางค่าเรียงจากมากไปน้อยที่รวมรูปแบบลบ (`CM`, `CD`, `XC`, `XL`, `IX`, `IV`) แล้วหักค่าออกทีละตัวแบบ greedy
- `fromRoman`: ตรวจรูปแบบด้วย regex ก่อน แล้วอ่านจากซ้ายไปขวา ถ้าตัวปัจจุบันน้อยกว่าตัวถัดไปให้ลบ ไม่อย่างนั้นให้บวก

ข้อสมมติ:

- รองรับช่วง 1–3999 ตามรูปแบบมาตรฐานที่ใช้สัญลักษณ์ 7 ตัวในโจทย์ ถ้าเกินช่วงหรือไม่ใช่จำนวนเต็ม `toRoman` จะโยน `RangeError`
- `fromRoman` รับเฉพาะรูปแบบมาตรฐาน (canonical) เช่น ไม่รับ `IIII`, `VV`, `IC` และโยน `Error` เมื่อรูปแบบไม่ถูกต้อง
- `fromRoman` ไม่สนตัวพิมพ์เล็ก-ใหญ่ (`mcmlxxxix` ได้ 1989) แต่ไม่ตัดช่องว่างให้
- test ตรวจว่าแปลงไปแล้วแปลงกลับได้ค่าเดิมครบทุกค่าตั้งแต่ 1 ถึง 3999

### ข้อ 5: เรียงหลักจากมากไปน้อย

แปลงตัวเลขเป็นสตริง แยกเป็นหลัก เรียงจากมากไปน้อย แล้วแปลงกลับเป็นตัวเลข

ข้อสมมติ:

- รับเฉพาะจำนวนเต็มบวก (`0` ไม่ใช่จำนวนบวก) ถ้าเป็นค่าอื่นจะโยน `RangeError`
- ทั้ง input และผลลัพธ์ต้องไม่เกิน `Number.MAX_SAFE_INTEGER` ไม่อย่างนั้นค่าอาจคลาดเคลื่อน จึงโยน `RangeError` แทนการคืนค่าที่ผิด

### ข้อ 6: Tribonacci

เริ่มจากค่าเริ่มต้น แล้วเพิ่มตัวถัดไปซึ่งเป็นผลรวมของ 3 ตัวก่อนหน้า จนได้ความยาวตามที่ต้องการ

ข้อสมมติ:

- ถ้าค่าเริ่มต้นมีไม่ถึง 3 ตัว ให้รวมเท่าที่มี ซึ่งให้ผลเหมือนเติม 0 ไว้ข้างหน้า (เติมไว้ในการคำนวณเท่านั้น ไม่อยู่ในผลลัพธ์) เช่น `f([], 4)` ได้ `[0, 0, 0, 0]` และ `f([1], 5)` ได้ `[1, 1, 2, 4, 7]`
- ถ้า `length` น้อยกว่าจำนวนค่าเริ่มต้น จะตัดให้เหลือตาม `length` เช่น `f([5, 2, 0], 2)` ได้ `[5, 2]`
- ค่าเริ่มต้นเกิน 3 ตัวโยน `RangeError` ค่าเริ่มต้นที่ไม่ใช่จำนวนเต็มโยน `TypeError` และ `length` ที่ติดลบหรือไม่ใช่จำนวนเต็มโยน `RangeError`
- ใช้ `number` ปกติ ถ้าลำดับยาวมากจนค่าเกิน `Number.MAX_SAFE_INTEGER` ค่าจะคลาดเคลื่อน ถ้าต้องการลำดับยาวมากควรเปลี่ยนไปใช้ `bigint`

> **หมายเหตุ:** ตัวอย่าง `[2, 3, 1, 6, 9, 16]` ในโจทย์คำนวณไม่ตรงกับกฎ Tribonacci เพราะ 3 + 1 + 6 = 10 และ 1 + 6 + 10 = 17 ลำดับที่ถูกต้องคือ `[2, 3, 1, 6, 10, 17]` ซึ่งเป็นค่าที่ใช้ใน test
