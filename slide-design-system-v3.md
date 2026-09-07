# Slide Design System — NCT · v3

ส่วนต่อขยายจาก [`slide-design-system.md`](slide-design-system.md) (v1) และ
[`slide-design-system-v2.md`](slide-design-system-v2.md) (v2) หลังแกะ
`NCT Template.pptx` สไลด์ 33–43 — แบบฟอร์มที่บริษัทบังคับใช้ทุก proposal

**สิ่งที่ v1/v2 ทำถูกแล้วไม่แตะ** — canvas, grid, จังหวะแนวตั้ง, type scale,
status/category token, กติกาการทำเด็คทั้งหมด ยังใช้เหมือนเดิมทุกข้อ

**สิ่งที่ v3 เพิ่ม** — brand mode ที่สอง (`corp`), token ชุดใหม่ 5 ตัว, chrome
คนละชุด และ layout 17–18 เพราะ v1/v2 แกะมาจาก **เว็บบริษัท** แต่แบบฟอร์มที่ต้อง
ยื่นลูกค้าจริงเป็นคนละชุดสี คนละ furniture ทั้งคู่เป็นของจริง เลยต้องมีทั้งสอง

> ลำดับการแก้ยังเหมือนเดิม: `design.md` → `scripts/tokens.py` → `python scripts/build.py`
> token ใหม่ในไฟล์นี้อยู่ใน `design.md § v3` แล้ว

---

## 1. ที่มา — แกะจากอะไร

`NCT Template.pptx` 43 สไลด์ · อ่าน OOXML ตรง ๆ (ค่าจริงทุกตัว) ควบกับ render
`NCT Template.pdf` รายหน้า (เห็นจังหวะจริง) เลยไม่มี blind spot แบบ URL mode

สไลด์ 33–43 เป็น 11 หน้าที่บังคับ แยกได้ 5 archetype

| archetype | สไลด์ | ปลายทางในระบบ |
|---|---|---|
| Phase Card | 35 · 36 · 37 · 38 · 39 | **layout 17** (ใหม่) |
| Table + Evidence | 42 | **layout 18** (ใหม่) |
| Concept Explainer | 33 · 34 | `SlideDiagram` (L14) เดิม |
| Deliverables Matrix | 40 | `SlideDenseTable` (L16) + `rowSpan` / `groupColumn` |
| Diagonal Photo Split | 41 · 43 | เนื้อหาไป L11/L13/L10 — **แถบรูปทแยงไม่รับ** |

หน้าปก (สไลด์ 1) แกะทีหลัง ลง **layout 01 สาขา corp** — ดู §4

**ทำไมไม่รับแถบรูปทแยง** — รูปที่อยู่หลังมันคือ stock ประชุมยิ้ม / headset ซึ่ง
`design.md` และ conventions ระบุเป็น anti-pattern ไว้ก่อนหน้านี้แล้ว ทำเป็น layout
= ฝัง anti-pattern เข้าระบบถาวร เนื้อหาจริงของสไลด์ 41 (support tier 3 ชั้น +
ช่องทางติดต่อ) ลง L11 หรือ L13 ได้ครบอยู่แล้ว

---

## 2. Brand mode

ระบบมีสองชุด **เลือกต่อเด็ค ไม่ผสมในสไลด์เดียว**

| | `web` (default) | `corp` |
|---|---|---|
| ที่มา | nctthai.com | `NCT Template.pptx` |
| accent | `TEAL #216B7F` | `CORP #006666` |
| accent on dark | `TEAL_UP #8FBACE` | `CORP_UP #8CC2C2` |
| เส้นใต้หัวเรื่อง | stub 0.600in ที่ margin | **เต็มความกว้าง 13.333in** |
| มุมขวาบน | ไม่มี | **การ์ดโลโก้ ขอบ accent** |
| ก้นสไลด์ | hairline + date + footer + page | **แถบ 3 ช่วง** + footer + page |
| สีหัวเรื่อง | `NAVY` | `INK` |
| **layout 01** | gradient navy→teal อ่านชิดซ้าย | **คนละสไลด์** — พื้นขาว จัดกลาง ดู §4 |

**สิ่งที่ไม่ตามโหมด** — `PAPER` `PAPER2` `INK` `INK2` `RULE` status ทั้ง 3 คู่
และ category ทั้ง 4 ใช้ร่วมกัน ตารางเลยแปลความหมายเหมือนกันทั้งสอง brand
category เป็น hex ตายตัวโดยตั้งใจ — 4 คอลัมน์ที่ code สีคือ taxonomy และ
taxonomy ที่เปลี่ยนสีตามหัวจดหมายไม่ใช่ taxonomy

### วิธีสลับ

```tsx
<Deck brand="corp" footer="NCT · ข้อเสนอโครงการ">…</Deck>
```

ฝั่ง React สลับได้ใน deck เดียว เพราะ `.nct-slide--corp` แค่ repoint
`--nct-accent` / `--nct-accent-up` ซึ่ง `slides.css` อ่านทุกที่ที่เคยเขียน
`--nct-teal` ตรง ๆ (แทนไปแล้ว 17 + 8 จุด) **ของใหม่ทุกชิ้นต้องอ่าน
`--nct-accent` ห้ามเรียก `--nct-teal` ตรง ๆ อีก**

ฝั่ง PowerPoint **แยกไฟล์** — `NCT-Slide-Template-Corp.potx` เพราะ layout ใน
PowerPoint สลับ chrome ตัวเองไม่ได้ chrome ฝังอยู่ใน layout `build.py` ตั้ง
`PM.BRAND = "corp"` แล้ว build รอบสอง ได้ 18 layout ชุดเดิมทุกเบอร์

### Token ใหม่

| token | ค่า | contrast | ใช้ที่ |
|---|---|---|---|
| `CORP` | `#006666` | 6.8:1 บน `PAPER` ทั้งสองทาง | เส้น, tab, ขอบการ์ด, หัวตาราง |
| `CORP_UP` | `#8CC2C2` | 5.1:1 บน `NAVY` · 6.2:1 บน `CORP_DEEP` | **บนพื้นเข้มเท่านั้น** — 2.0:1 บน `PAPER` |
| `CORP_DEEP` | `#193B36` | 12.2:1 บน `PAPER` ทั้งสองทาง | แถบหัวชั้นสอง, พาเนลเข้ม |
| `CORP_DIM` | `#E1E1E1` | 1.2:1 | **ตกแต่งเท่านั้น** — ช่วงที่ผ่านไปแล้วของแถบก้น |
| `CORP_BAR_MID` | `#A9C2C2` | — | **ตกแต่งเท่านั้น** — ช่วงกลางของแถบก้น |

`CORP` เองได้ 1.5:1 บน `NAVY` ใช้บนพื้นเข้มไม่ได้ ต้องยก — เหตุผลเดียวกับที่
`TEAL_UP` มีอยู่ กับดักเดียวกัน กติกาเดียวกัน

**ไม่มี corp tint** ต้นฉบับใช้ `#C9D9D4` เป็นพื้นการ์ดและ zebra แต่ `INK2` ได้
4.37:1 บนมัน และ `OK_T` ได้ 1.05:1 — คือบั๊ก status fill หายที่ v2 §3.2 เขียน
กันไว้แล้ว พื้น corp ใช้ `PAPER2` เหมือน v1

---

## 3. Chrome — geometry (นิ้ว)

เส้น corp อยู่ที่ `RULE_Y` เดิม **ไม่ใช่ 2.29cm ตามต้นฉบับ** ต้นฉบับวางเส้นไว้ใต้
หัวเรื่อง 28pt ระบบเราหัวเรื่องอยู่ต่ำกว่า ถ้าย้ายตามต้องขยับจังหวะทั้งเด็ค
ซึ่งกลายเป็น geometry ชุดที่สอง ไม่ใช่ chrome layer — ทั้งหมดนี้คือเหตุผลที่
สลับ mode แล้วไม่มี layout ไหน re-flow

| ชิ้น | x | y | w | h | สเปก |
|---|---|---|---|---|---|
| Accent Rule | 0.000 | 1.500 | 13.333 | **0.075** | fill `CORP` เต็มความกว้าง |
| Corner Lockup | 11.533 | −0.300 | 1.800 | 0.900 | `round2SameRect` **rot 180°** · fill `PAPER` · ln 1pt `CORP` · มุมล่าง 0.100 |
| NCT Mark | 12.133 | 0.109 | 0.600 | 0.382 | `mark-color.png` |
| Foot Bar 1 | 0.000 | 7.300 | 0.900 | 0.150 | fill `CORP` |
| Foot Bar 2 | 0.900 | 7.300 | 0.900 | 0.150 | fill `CORP_BAR_MID` |
| Foot Bar 3 | 1.800 | 7.300 | 0.900 | 0.150 | fill `CORP_DIM` |
| Footer PH | 2.950 | 7.000 | 5.000 | 0.300 | 10 pt `INK2` (idx 11) |
| Slide Number PH | 11.583 | 7.000 | 1.500 | 0.300 | 10 pt `INK2` ชิดขวา (idx 12) |

- **การ์ดโลโก้บลีดพ้นขอบบน** ตัวกล่องเริ่มที่ −0.300 เห็นแค่ครึ่งล่าง ขอบบนถูก
  ตัดที่ขอบสไลด์ จึงไม่ต้องลบเส้นด้านบน (preset ลบทีละด้านไม่ได้) rot 180° คือ
  สิ่งที่ย้ายมุมโค้งจากบนไปล่างโดยกล่องไม่ขยับ
- **การ์ดโลโก้ขึ้นเฉพาะพื้นสว่าง** พื้นเข้ม (L01/02/08/10/15) ตกไปใช้ mark มุมล่าง
  เหมือนเดิม — การ์ดขาวบน navy คือรูโหว่ และต้นฉบับก็ทำแบบเดียวกันบนสไลด์เข้มของมัน
- **`partnerMark`** ฝั่ง React เติมโลโก้ลูกค้า/ผลิตภัณฑ์ข้าง mark ได้ — ต้นฉบับ
  วางแบดจ์ของโครงการไว้ตรงนั้น ฝั่ง `.potx` ยังไม่มี ต้องวางเอง
- **แถบก้น 3 ช่วง** ต้นฉบับวาด 2 shape — แถบ accent ทับด้วยแถบเทา alpha 75%
  เหลื่อมไป 1 ช่วง `CORP_BAR_MID` คือค่าผสมนั้นที่คำนวณไว้แล้ว วาด 3 ช่วงตรง ๆ
  สื่อความหมายเดียวกันโดยไม่ต้องพึ่ง alpha trick
- **ไม่มี hairline เหนือ footer** ต้นฉบับไม่มี และแถบก้นก็ทำหน้าที่เส้นนอนแทนแล้ว

---

## 4. Layout 01 — cover คนละใบ

**นี่คือ layout เดียวที่สอง brand เป็นคนละสไลด์จริง ๆ ไม่ใช่สไลด์เดียวกันเปลี่ยน
furniture** ตัวอื่นเปลี่ยนแค่ chrome กับ accent แต่ cover ของสองฝั่งต่างกันที่โครง

| | `web` | `corp` |
|---|---|---|
| พื้น | gradient `NAVY`→`TEAL_B` 45° | `PAPER` + mark เป็น watermark |
| การจัดวาง | ชิดซ้าย | จัดกลางทั้งหน้า |
| โลโก้ | lockup ขาว 2.80in มุมบนซ้าย | lockup สี **4.375in กลางหน้า เป็นพระเอก** |
| เส้น | ใต้หัวเรื่อง 0.60in `PAPER` 70% | **เหนือ**หัวเรื่อง 6.90in accent |
| หัวเรื่อง | 44pt ขาว ชิดซ้าย | 44pt `INK` **จัดกลาง 1–3 บรรทัด** |
| ขอบขวา | diamond decor 2 ใบ | **คอลัมน์สี่เหลี่ยมกระจาย** |
| ก้นสไลด์ | footer chrome ปกติ | date ซ้าย + page ขวา · **ไม่มีแถบ ไม่มีการ์ดโลโก้** |

| ชิ้น | x | y | w | h | สเปก |
|---|---|---|---|---|---|
| Watermark A | 1.500 | −2.300 | 8.000 | 5.089 | `mark-color` **alpha 3.5%** |
| Watermark B | 4.500 | 2.500 | 8.000 | 5.089 | เหมือนกัน |
| Scatter × 28 | 10.083 → ขอบขวา | ทั้งหน้า | 3.250 (คอลัมน์) | 7.500 | `MID` alpha 5–75% |
| NCT Logo | จัดกลาง | 0.750 | 4.375 | 2.226 | `logo-color` |
| Accent Rule | จัดกลาง | 3.750 | 6.900 | 0.031 | accent (2.25pt ตามต้นฉบับ) |
| Title PH | 1.000 | 4.063 | 11.333 | 2.250 | 44 pt Kanit Bold `INK` จัดกลาง · anchor ctr |
| Subtitle PH | 1.000 | 6.463 | 11.333 | 0.500 | 20 pt `INK2` จัดกลาง (idx 1) |
| Date PH | 0.250 | 7.000 | 5.000 | 0.300 | 10 pt `INK2` (idx 10) |
| Slide Number PH | 11.583 | 7.000 | 1.500 | 0.300 | 10 pt `INK2` ชิดขวา (idx 12) |

- **ไม่มีการ์ดโลโก้มุมขวาบน** ทุกสไลด์อื่นเซ็นด้วยการ์ดนั้น แต่หน้านี้ lockup
  **คือ**สไลด์ ใส่ซ้ำอีกที่มุมคือมาร์กเดียวกันสองครั้ง
- **ไม่มีแถบก้น 3 ช่วง** ต้นฉบับก็ไม่มี — หน้าเดียวที่หน้าที่ของมันคือเงียบ
  date เลยได้ช่องซ้ายทั้งช่องไปเอง
- **watermark คือ mark ของตัวเอง ไม่ใช่ลายอื่น** ต้นฉบับทำแบบเดียวกัน ที่ 3.5%
  ยังอยู่ใต้ 3:1 ที่ lockup ทับมันต้องการ
- **`date` เป็น prop ที่มีอยู่แล้ว** ฝั่ง React ส่ง `<Deck date="Updated date: …">`
  ทั้งสตริง layout ไม่ประกอบข้อความให้ — จะเขียนไทยหรืออังกฤษก็เรื่องของเด็ค

### คอลัมน์สี่เหลี่ยม

ต้นฉบับวางเป็นภาพ raster (`image2.png` 472×1080) ระบบไม่รับ raster ที่วาดเองได้ —
สแกนออกมาแล้วพบว่าเป็น**สีเดียวทั้งคอลัมน์** `#1E5876` (คือ `MID` ในระยะปัดเศษ)
ต่างกันแค่ alpha กับขนาด เลยเก็บเป็นข้อมูล 28 ชิ้นใน `tokens.COVER_SCATTER`
(พิกัดบนกล่อง 472×1080 ให้ปลายทางย่อเอง) แล้วป้อนสองทาง

- ฝั่ง web · `emit_web_assets.py` ปั้นเป็น SVG data URI (`coverScatter`) ~2.4 KB
- ฝั่ง `.potx` · `l01_corp_cover()` วาดเป็น 28 `shape()`

ได้ลายเดียวกัน เล็กกว่าเดิม 16 เท่า และเปลี่ยนสีตาม token ได้

---

## 5. Layout ที่เพิ่ม — 17 กับ 18

### 17 Phase Card

พื้นขาว · เฟสหนึ่งของแผน implementation · 5 ใน 11 สไลด์ต้นฉบับเป็นทรงนี้

| ชิ้น | x | y | w | h | สเปก |
|---|---|---|---|---|---|
| Title PH | 1.000 | 0.600 | 11.333 | 0.800 | 32 pt Kanit Bold (`NAVY` / `INK` ตาม brand) |
| Accent Rule | ตาม brand — §3 | | | | |
| Key Activity label PH | 1.000 | 1.850 | 1.640 | 0.300 | 14 pt Kanit Bold `INK` (idx 1) |
| Key Activity value PH | 2.640 | 1.850 | 9.693 | 0.300 | 14 pt `INK` (idx 2) |
| Participant label PH | 1.000 | 2.150 | 1.640 | 0.300 | 14 pt Kanit Bold `INK` (idx 3) |
| Participant value PH | 2.640 | 2.150 | 9.693 | 0.300 | 14 pt `INK` (idx 4) |
| Phase Card (รูปทรง) | 1.000 | 2.875 | 11.333 | 3.725 | `noFill` · ln 1pt accent |
| Phase Tab | 1.000 | 2.650 | 3.750 | 0.450 | `roundRect` adj 50000 · fill accent |
| Phase Number PH | 1.100 | 2.650 | 0.550 | 0.450 | 16 pt Kanit Bold `PAPER` กลาง (idx 5) |
| Tab Divider | 1.650 | 2.725 | 0.014 | 0.300 | fill `PAPER` alpha 32% |
| Phase Label PH | 1.800 | 2.650 | 2.800 | 0.450 | 14 pt Kanit Bold `PAPER` (idx 6) |
| Phase Intro PH | 1.250 | 3.200 | 10.833 | 0.300 | 12 pt dense `INK2` (idx 7) |
| Phase Body PH | 1.250 | 3.600 | 10.833 | 2.750 | 12 pt dense `INK` (idx 8) |

- **tab คร่อมกึ่งกลางขอบบนการ์ด และชิด margin** ต้นฉบับยื่นซ้ายพ้นการ์ด
  0 / 0.32 / 0.42 / 0.69 cm ใน 5 สไลด์ — คือ copy-paste jitter ไม่ใช่การตัดสินใจ
  และ 3 ใน 5 หน้ามันเริ่มนอก margin เอาแค่การคร่อมแนวตั้งซึ่งเป็นท่าจริง
- **`number` พิมพ์เอง ไม่ auto** ต้นฉบับมี `03-04` (เฟสรวบ) เป็นค่าจริง
- **meta 2 แถวคือเพดาน** แถวละ 0.300in แถวที่สามกินความสูงการ์ด
- ข้างในการ์ดใส่อะไรก็ได้ที่ระบบมีอยู่ — `nct-cols` + `densehead`, ตาราง, ผัง

### 18 Evidence Strip

พื้นขาว · ข้ออ้าง + ข้อสรุปหนึ่งบรรทัด + หลักฐาน 2–4 กรอบ

| ชิ้น | x | y | w | h | สเปก |
|---|---|---|---|---|---|
| Title PH | 1.000 | 0.600 | 11.333 | 0.800 | 32 pt Kanit Bold |
| Kicker Pill | 1.000 | 1.850 | 3.500 | 0.450 | `roundRect` adj 50000 · fill accent |
| Kicker PH | 1.200 | 1.850 | 3.100 | 0.450 | 14 pt Kanit Bold `PAPER` กลาง (idx 1) |
| Claim PH (`tbl`) | 1.000 | 2.450 | 11.333 | 1.600 | ตาราง 10 pt (idx 2) |
| Takeaway Band | 1.000 | 4.200 | 11.333 | 0.450 | fill `NAVY` |
| Band label PH | 1.200 | 4.267 | 2.000 | 0.317 | 12 pt Bold `spc 120` accent-up (idx 3) |
| Band copy PH | 3.200 | 4.267 | 8.933 | 0.317 | 14 pt `PAPER` (idx 4) |
| Caption PH × 3 | 1.000 / 4.844 / 8.689 | 4.800 | 3.644 | 0.250 | 12 pt dense `INK2` (idx 20 / 22 / 24) |
| Frame × 3 | เท่ากัน | 5.112 | 3.644 | 1.488 | `noFill` · ln 1pt `RULE` |
| Evidence PH × 3 (`pic`) | เท่ากัน | 5.112 | 3.644 | 1.488 | (idx 21 / 23 / 25) |

- **แถบเหนือ strip คือ takeaway ไม่ใช่ป้ายหัวข้อ** ต้นฉบับใส่
  `SAMPLE OF TRAINING SETUP` ตรงนั้น ซึ่งบอกว่ารูปคืออะไรแต่ไม่บอกว่ารูป**พิสูจน์**
  อะไร สไลด์เลยจบที่หลักฐานโดยไม่มีข้อสรุป — ฝั่ง React บังคับ `takeaway` เป็น
  required prop
- **strip สูงคงที่ ข้ออ้างข้างบนยุบให้** หลักฐานไม่โดนบีบเพื่อให้ตารางพอ
- **2–4 กรอบ เป็น tuple union** ที่ 5 กรอบกว้าง 199px สูง 84px ซึ่งไม่ได้พิสูจน์อะไร
- **ต้องเป็นของจริง** screenshot ระบบจริง หรือรูปห้องจริง — stock ใน evidence strip
  แย่กว่าไม่มี strip
- กรอบ hairline ทำให้ strip ที่ยังไม่ใส่รูปอ่านออกว่า "รอ screenshot" ไม่ใช่พื้นที่ว่าง

---

## 6. ส่วนขยายของ `DataTable`

สองอย่างที่เพิ่มเพื่อรับ Deliverables Matrix (สไลด์ 40) โดยไม่ต้องมี layout ใหม่

| prop | ทำอะไร |
|---|---|
| `rowSpan` (บน cell) | ผสานเซลล์ลงหลายแถว |
| `groupColumn` (บนตาราง) | คอลัมน์ที่บอกกลุ่มของแถว — หัวเป็นสี accent ตัวคอลัมน์เป็น `PAPER2` ตัวหนา `NAVY` |

```tsx
rows={[
  [{ value: '2. วิเคราะห์และออกแบบ', rowSpan: 2 }, 'SRS', 'Word', {…}],
  [null,                                            'BPF', 'Word', {…}],
]}
```

- **แถวที่ถูกผสานกลืนต้องใส่ `null` ตรงตำแหน่งนั้น** ตารางเป็น `table-layout: fixed`
  แถวสั้นจะเลื่อนทุกเซลล์หลังจากนั้นไปทางซ้ายหนึ่งช่องเงียบ ๆ
- **`groupColumn` ป้ายกำกับแถว · `recommended` เชียร์คอลัมน์** ห้ามตั้งทั้งคู่ที่
  index เดียวกัน มันขัดกันเอง

---

## 7. บั๊กเก่าที่เจอระหว่างทาง (ไม่ใช่ของ v3)

| # | จุด | อาการ | แก้เป็น |
|---|---|---|---|
| 1 | `chrome()` จอง placeholder `idx` 10 / 11 / 12 ทุก layout แต่ L12 กับ L13 นับจาก 1 ชนเข้าไป | การ์ด 4 ใบ (L12) และ step 5 อัน (L13) แชร์ idx กับ date / footer / page number | ทั้งคู่เริ่มที่ `PH_FREE = 20` — **layout ที่มี placeholder เกิน 9 ตัวต้องเริ่มเหนือ 12 ห้ามนับจาก 1 ขึ้นไปชน** |
| 2 | `web/tsconfig.json` include แค่ `src` | `demo/` ไม่เคยถูก typecheck ทั้งที่เป็นไฟล์ที่ทุกคนก๊อป — ส่ง `<>fragment</>` เป็น `BulletItem` แล้ว render เป็น bullet เปล่าโดยไม่มี error ที่ไหน | include `["src", "demo"]` |

v2 §5 layout 12 เขียน idx เป็น `i×3+1..3` — ค่านั้นล้าสมัยแล้ว ดูตารางในไฟล์นี้

---

## 8. Script ที่เพิ่ม

```bash
python scripts/build.py             # → 4 ไฟล์: .potx / -Demo.pptx ทั้ง web และ corp
python scripts/check_template.py    # ตรวจไฟล์ที่ build แล้ว
python scripts/render_previews.py   # → preview/ (Windows + PowerPoint เท่านั้น)
```

### `check_template.py`

ตรวจต่อ layout: XML parse ผ่าน · shape id ไม่ซ้ำ · placeholder idx ไม่ซ้ำ ·
ไม่มี shape หลุดนอก canvas ทั้งชิ้น · จำนวน layout ตรงกับ `build.LAYOUTS`
ตรวจต่อสไลด์: ทุก idx ที่สไลด์เติม ต้องมีอยู่บน layout ที่มันชี้

generator เขียน OOXML เป็น string ล้วน อัญประกาศหลุดหรือ idx ซ้ำจะไม่มีอะไรจับได้
จนกว่า PowerPoint จะขึ้น "repair" — นี่คือสิ่งที่เล็กที่สุดที่ fail ก่อนถึงตรงนั้น
บลีดที่ตั้งใจ (การ์ดโลโก้เริ่มเหนือ y=0) ผ่าน เฉพาะที่หลุดทั้งชิ้นถึงนับเป็น error

### `render_previews.py`

render ผ่าน PowerPoint COM จริง (เปิดแบบ read-only ไม่มีหน้าต่าง ไม่ save กลับ)
ได้ `preview/layout-01..18.png` เรียงตามเบอร์ layout กับ contact sheet สองใบ
`all-layouts.png` (web) และ `corp-all-layouts.png`

preview ในรีโปนี้เคยค้างข้ามรีลีสเพราะต้องทำมือและเครื่อง build ไม่มี PowerPoint —
เขียนเป็น script เพื่อไม่ให้ค้างอีก และการ render ผ่าน PowerPoint เองแทน converter
แปลว่า sheet แสดงสิ่งที่ลูกค้าจะเปิดจริง รวมการ substitute ฟอนต์และ placeholder
inheritance ด้วย

---

## 9. สรุปการเปลี่ยนแปลง

| | v2 | v3 |
|---|---|---|
| layout | 16 | **18** |
| brand mode | 1 | **2** (`web` · `corp`) |
| ไฟล์ PowerPoint | 2 | **4** |
| colour token | 21 | **26** (+ `--nct-accent` / `--nct-accent-up`) |
| cover | 1 แบบ | **2** — L01 เป็นคนละสไลด์ต่อ brand |
| script | build · emit · fonts · assets · serve · prepare | + **check_template** · **render_previews** |
| ทดสอบ | ไม่มี | `check_template.py` ผ่านทั้ง 4 ไฟล์ · เปิดใน PowerPoint จริงไม่มี repair prompt |
