# Slide Design System — NCT

ระบบดีไซน์สำหรับทำ template slide ของ New Computer Technology Consulting Co., Ltd.
สืบทอด token ทั้งหมดจาก [`design.md`](design.md) (studied จาก nctthai.com) — ไฟล์นี้คือ
ส่วนขยายเฉพาะงาน presentation ไม่ใช่ระบบใหม่ **ถ้าสีหรือฟอนต์ใน `design.md` เปลี่ยน
ให้แก้ที่นั่นก่อน แล้วค่อย sync ลงมาที่ `scripts/tokens.py` และ rebuild**

---

## 1. ไฟล์ในระบบ

| ไฟล์ | คืออะไร |
|---|---|
| `NCT-Slide-Template.potx` | ตัว template จริง — 1 slide master + 16 custom layouts + NCT theme |
| `NCT-Slide-Template-Demo.pptx` | เดโม 16 สไลด์ สไลด์ละ 1 layout ไว้ดูของจริง |
| `slide-design-system.md` | ไฟล์นี้ — กติกาและ token (v1, layout 01–10) |
| `slide-design-system-v2.md` | ส่วนต่อขยาย — token dense, layout 11–16 |
| `assets/` | logo 4 เวอร์ชัน (color/white × lockup/mark) พื้นหลังโปร่ง |
| `fonts/` | Noto Sans Thai 9 weights + OFL license — ไว้ให้คนในทีมติดตั้ง |
| `preview/` | ภาพ render จาก PowerPoint ของทุก layout |
| `scripts/` | ตัว generate `.potx` จาก token (Python, ไม่ต้องลง library) |

### วิธีใช้ template
0. **ติดตั้งฟอนต์ก่อน** (ทำครั้งเดียวต่อเครื่อง) — เลือกไฟล์ทั้งหมดใน `fonts/` คลิกขวา
   → `Install` และติดตั้ง Kanit จาก [Google Fonts](https://fonts.google.com/specimen/Kanit)
   ถ้ายังไม่มี ไม่ติดตั้งแล้วเปิดไฟล์ PowerPoint จะ substitute ฟอนต์อื่นให้ ผิดหน้าตาทั้งเด็ค
1. ดับเบิลคลิก `NCT-Slide-Template.potx` → PowerPoint เปิดไฟล์ใหม่ที่ใช้ theme นี้
2. `New Slide` → เลือก layout จาก 16 อันในลิสต์ (01–10 คือชุดหลัก v1, 11–16 คือชุด dense v2)
3. ถ้าอยากให้ขึ้นในเมนู `File > New > Personal` ให้ copy `.potx` ไปที่
   `%APPDATA%\Microsoft\Templates\`

### วิธี rebuild หลังแก้ token
```bash
cd scripts && py build.py
```
เขียนทับ `.potx` และ `.pptx` ที่ root ไม่ต้องลงอะไรเพิ่ม (ใช้แค่ Python standard library)

---

## 2. Canvas & Grid

| ค่า | EMU | นิ้ว | หมายเหตุ |
|---|---|---|---|
| Slide | 12192000 × 6858000 | 13.333 × 7.5 | 16:9 widescreen เท่านั้น |
| Margin ซ้าย/ขวา | 914400 | 1.00 | `MX` — ห้ามวางเนื้อหาเลยเส้นนี้ |
| Margin บน | 548640 | 0.60 | `MT` |
| Content width | 10363200 | 11.333 | `CW` |
| Gutter | 182880 | 0.20 | `GUT` |
| Column (1/12) | 695960 | 0.761 | `COL` |
| Half (6 col) | 5090160 | 5.565 | `HALF` — คอลัมน์ซ้าย/ขวา |
| Third | 3332480 | 3.644 | `THIRD` — การ์ด 3 ใบ / ตัวเลข 3 ตัว |

**12-column grid** ตำแหน่ง x ของคอลัมน์ที่ *i* (เริ่มจาก 0) = `914400 + i × 878840`

### จังหวะแนวตั้งของสไลด์เนื้อหา (light layouts)

```
0.60in  ┌ Title box เริ่ม (anchor bottom, สูง 0.80in)
1.40in  ┘
1.50in  ── teal rule  0.60 × 0.05 in
1.85in  ┌ Body เริ่ม
6.60in  ┘ Body จบ
6.75in  ── hairline footer
6.90in     date · footer · page number · mark
```

ค่าทั้งหมดอยู่ใน `scripts/tokens.py` เปลี่ยนที่เดียวแล้ว rebuild

---

## 3. Color tokens

ทั้งหมดมาจาก `design.md` ยกเว้น 2 ตัวที่ derive เพิ่มเพื่อให้ทำ chart/scrim ได้

| Token | HEX | ใช้กับ | ที่มา |
|---|---|---|---|
| `PAPER` | `#FFFFFF` | พื้นสไลด์สว่าง | design.md |
| `PAPER2` | `#E8F6F5` | พื้นการ์ด, พื้น quote slide | design.md |
| `INK` | `#333333` | body text | design.md |
| `INK2` | `#5F5F5F` | caption, label, footer | design.md (แก้จาก `#A4A4A4`) |
| `RULE` | `#E5E5E5` | hairline, divider | design.md |
| `NAVY` | `#23436D` | หัวเรื่อง, ตัวเลขเด่น, พื้น section | design.md accent |
| `TEAL` | `#216B7F` | rule, bullet, tab, link | design.md accent-2 |
| `TEAL_L` | `#4E8FA8` | series ที่ 2 ในกราฟ, หมวดที่ 3 — **พื้นขาวเท่านั้น** | **derived** |
| `TEAL_UP` | `#8FBACE` | เลขหัวข้อ / bullet / label **บนพื้น navy เท่านั้น** | **derived** |
| `DEEP` | `#16324F` | scrim ทับรูป, พื้น full-image | **derived** |

### Theme color slot (PowerPoint)
map ไว้แล้วใน `.potx` — กราฟและตารางจะหยิบสีแบรนด์เองอัตโนมัติ

| slot | ค่า | | slot | ค่า |
|---|---|---|---|---|
| dk1 / tx1 | `INK` | | accent1 | `NAVY` |
| lt1 / bg1 | `PAPER` | | accent2 | `TEAL` |
| dk2 / tx2 | `NAVY` | | accent3 | `TEAL_L` |
| lt2 / bg2 | `PAPER2` | | accent4 | `DEEP` |
| hlink | `TEAL` | | accent5 | `INK2` |
| folHlink | `NAVY` | | accent6 | `PAPER2` |

### กติกาสี
- สไลด์เข้ม (01, 02, 08, 10) ตัวหนังสือเป็น `PAPER` เท่านั้น ห้ามใช้ `NAVY` บนพื้นเข้ม
- ข้อความรอง บนพื้นเข้มใช้ `PAPER` + alpha 78–88% ไม่ใช่สีเทา (เทาบนน้ำเงินจะขุ่น)
- `TEAL` เป็นสี accent เดียวที่ใช้กับเส้น/bullet — ห้ามใช้ `NAVY` ทำ rule เพราะจะแยกจาก
  หัวเรื่องไม่ออก
- ห้ามใส่สีนอกตารางนี้ ถ้าจำเป็นต้องมีสีเตือน (แดง/เหลือง) ให้เพิ่มลง `design.md` ก่อน

---

## 4. Typography

| Role | Font | Size | Weight | Color |
|---|---|---|---|---|
| Display (สไลด์ปก) | Kanit | 44 pt | Bold | `PAPER` |
| Section title | Kanit | 40 pt | Bold | `PAPER` |
| Section number | Kanit | 60 pt | Bold | `TEAL_L` |
| Slide title | Kanit | 32 pt | Bold | `NAVY` |
| Big figure | Kanit | 72 pt | Bold | `NAVY` |
| Pull quote | Kanit | 28 pt | Regular | `NAVY` |
| Card heading | Kanit | 20 pt | Bold | `NAVY` |
| Lead / subtitle | Noto Sans Thai | 20 pt | Regular | ตามพื้น |
| Body L1 | Noto Sans Thai | 18 pt | Regular | `INK` |
| Body L2 | Noto Sans Thai | 16 pt | Regular | `INK` |
| Body L3 / caption | Noto Sans Thai | 14 pt | Regular | `INK2` |
| Quote mark | Kanit | 120 pt | Bold | `TEAL` 25% |
| Stat label / eyebrow | Noto Sans Thai | 12 pt | Bold, `spc 120` | `INK2` |
| Footer / page no. | Noto Sans Thai | 10 pt | Regular | `INK2` |

- **Kanit = เสียงหัวเรื่อง, Noto Sans Thai = เสียงเนื้อหา** ห้ามสลับ นี่คือสิ่งที่แก้ปัญหา
  "flat typographic voice" ที่ `design.md` บันทึกไว้เป็น anti-pattern ของเว็บต้นทาง
- Line height: หัวเรื่อง 106–108%, body 124%, quote 132%
- ระดับ bullet: L1 `•` teal / L2 `–` เทา / L3 `·` เทา — ย่อหน้าเพิ่มระดับละ 0.5in
- **ไม่ใช้ตัวเอียง** กับข้อความไทย (Kanit italic เป็น oblique สังเคราะห์ อ่านแย่)

### แหล่งฟอนต์
- **Kanit** — Google Fonts (OFL) ติดตั้งแล้วบนเครื่องนี้ครบ 18 ไฟล์
- **Noto Sans Thai v2.002** — [notofonts/thai release](https://github.com/notofonts/thai/releases/tag/NotoSansThai-v2.002)
  build `googlefonts/ttf` ติดตั้งแล้ว 9 weights (Thin → Black) สำเนาอยู่ใน `fonts/`

> ⚠️ ต้องใช้ build **`googlefonts/ttf`** เท่านั้น — build `hinted/ttf` และ `unhinted/ttf`
> ในซิปเดียวกันเป็น **Thai-only ไม่มี glyph ละตินและ `·`** ถ้าติดตั้งผิดตัว คำอังกฤษ
> อย่าง "Managed Service" จะขึ้นเป็นกล่องเปล่าทั้งเด็ค (เจอมาแล้วตอน build)

---

## 5. Layout catalog

ทั้ง 16 layout ตั้ง `showMasterSp="0"` และประกาศ chrome ของตัวเอง แปลว่าแก้ layout ไหน
กระทบเฉพาะ layout นั้น ส่วน `<a:lstStyle>` บนทุก placeholder คือสิ่งที่สไลด์จริง inherit —
**ถ้าเพิ่ม placeholder ใหม่แล้วลืม lstStyle ข้อความจะตกไปใช้ style ของ master แทน**
(น้ำเงินบนพื้นน้ำเงิน = มองไม่เห็น)

| # | Layout | พื้น | Placeholder | ใช้เมื่อ |
|---|---|---|---|---|
| 01 | Title Slide | gradient navy→teal 45° | title, subtitle (โลโก้ฝังใน layout แก้ในสไลด์ไม่ได้) | หน้าปกเท่านั้น |
| 02 | Section Divider | navy ทึบ + แถบภาพขวา 40% fade เข้า navy | เลขหัวข้อ, title, คำอธิบาย | คั่นบท ทุก 4–8 สไลด์ |
| 03 | Title and Content | ขาว | title, body 5 ระดับ | สไลด์เนื้อหาปกติ |
| 04 | Two Column | ขาว | title, body ซ้าย, body ขวา | เทียบก่อน/หลัง, ข้อดี/ข้อเสีย |
| 05 | Three Cards | ขาว + การ์ด `PAPER2` | title + (heading, body) × 3 | 3 บริการ / 3 เสาหลัก |
| 06 | Key Figures | ขาว | title + (ตัวเลข, label) × 3 + footnote | ตัวเลขที่อยากให้จำ |
| 07 | Pull Quote | `PAPER2` + แถบ gradient ซ้าย | quote, attribution | testimonial, คำพูดลูกค้า |
| 08 | Full Image | รูปเต็มจอ + scrim | picture, title, caption | ภาพเปิดบท, ภาพผลงาน |
| 09 | Table / Comparison | ขาว | title, intro, table, takeaway | เทียบแพ็กเกจ, spec |
| 10 | Closing / Contact | gradient teal→navy 45° + แถบภาพขวา (web มีโหมดภาพเต็มหน้าเพิ่ม) | title, contact (โลโก้ฝังใน layout มุมซ้ายล่าง) | หน้าสุดท้ายเท่านั้น |

layout 11–16 อยู่ใน `slide-design-system-v2.md`

ดูของจริงที่ `preview/all-layouts.png` หรือเปิด `NCT-Slide-Template-Demo.pptx`

### รายละเอียดที่ต้องรู้ต่อ layout
- **01 / 10** ใช้ gradient คนละทิศ (navy→teal เปิด, teal→navy ปิด) ตั้งใจให้เด็คมี
  bookend รู้สึกจบ — อย่าสลับ
- **02** เลขหัวข้อ (`01`, `02`, …) ต้องพิมพ์เอง ไม่ auto
- **05** การ์ดสูงคงที่ 3.5in ถ้าข้อความยาวเกินให้ตัดคำ อย่ายืดการ์ด (จะเสียแนวฐาน)
- **06** ตัวเลขจัด baseline ล่าง label จัดบน แปลว่าตัวเลขยาวไม่เท่ากันก็ยังเรียงสวย
- **08** scrim เป็น gradient จากโปร่ง → `DEEP` 90% ที่ขอบล่าง ทำให้ตัวหนังสือขาวอ่านออก
  บนภาพทุกแบบ — **ห้ามลบ scrim แล้ววางตัวหนังสือทับภาพตรง ๆ**
- **09** ใส่ตารางผ่านปุ่ม Insert Table ในตัว placeholder จะได้ theme style อัตโนมัติ

---

## 6. กติกาการทำเด็ค

**ทำ**
- หนึ่งสไลด์ = หนึ่งความคิด หัวเรื่องเขียนเป็นข้อสรุป ไม่ใช่หัวข้อ
  (`"ระบบล่มลดลง 90%"` ไม่ใช่ `"ผลลัพธ์"`)
- Bullet ระดับ 1 ไม่เกิน 5 บรรทัดต่อสไลด์ ลึกไม่เกิน 2 ระดับ
- ใช้ layout 06 / 07 / 08 คั่นสไลด์ bullet อย่างน้อยทุก 4 สไลด์
- ใส่ Footer เป็นชื่องาน/ลูกค้า ตั้งครั้งเดียวที่ `Insert > Header & Footer`

**ห้าม**
- เพิ่มฟอนต์ที่ 3 หรือสีนอก token
- ใส่เงา, bevel, 3-D, reflection — theme ตั้ง effect เป็น flat ทั้งหมดโดยตั้งใจ
- ใช้ภาพ stock คนในออฟฟิศ — ประชุมยิ้ม มือประสานกัน (`design.md` ระบุเป็น
  anti-pattern ของเว็บต้นทาง) — บน L08 ใช้ภาพงานจริง screenshot จริง หรือไม่ใส่
  ภาพเลย ข้อยกเว้น:
  - แถบภาพ L02 / L15 / L10 — ภาพสถาปัตยกรรม/นามธรรมโทน navy ทำหน้าเดโคเรต
    ไม่ได้เล่าเรื่องคนทำงาน
  - หน้าปิดฝั่ง web (`SlideClosing imageMode="full"`) — ภาพจับมือเต็มหน้า + scrim
    เจ้าของระบบตัดสินใจเปิดข้อยกเว้นนี้เอง ฝั่ง .potx ยังเป็นแถบตึกเหมือนเดิม
- ลาก placeholder ออกนอก margin 1 นิ้ว
- กด `Reset` หลังแก้ layout เอง — จะดึงกลับไปตามที่ layout กำหนด (นี่คือฟีเจอร์ ไม่ใช่บั๊ก)

---

## 7. สถานะและงานที่เหลือ

**พร้อมใช้**
- Theme (สี + ฟอนต์ + flat effect), slide master, 10 layouts, logo 4 เวอร์ชัน
- Kanit + Noto Sans Thai ติดตั้งครบบนเครื่องนี้ ยืนยันด้วยการ render จาก PowerPoint
  ว่าไทย/ละติน/`·` ขึ้นครบ
- เดโมและภาพ preview render จาก PowerPoint จริง ไม่ใช่ mockup

**ยังไม่มี**
- โลโก้เวอร์ชันขาวสร้างจากการ knockout ไฟล์ JPEG ที่ให้มา — ได้ silhouette ขาวล้วน
  ไม่มี gradient ถ้ามีไฟล์ต้นฉบับ SVG/PNG พื้นโปร่ง ให้แทนที่ `assets/nct-logo-white.png`
  แล้ว rebuild จะคมกว่านี้
- ยังไม่มี chart style ที่กำหนดเอง (กราฟจะใช้ accent1–6 ตาม theme ซึ่งเป็นสีแบรนด์อยู่แล้ว)
- ยังไม่มี layout: timeline, team grid, org chart, pricing —
  เพิ่มได้ใน `scripts/parts_layouts.py` แล้วขยาย `LAYOUTS` ใน `build.py`
  (process flow, agenda, dense table, split panel, four cards, diagram canvas
  เพิ่มแล้วใน v2 — ดู `slide-design-system-v2.md`)

**ของเดิม `NCT Template.pptx`** ไม่ได้ใช้เป็นฐาน เพราะ theme เป็น stock Office
(Calibri, `#4472C4`) สไลด์ใช้สีเขียว `#0A8F62` ผสมฟอนต์ 4 แบบ และ layout ทั้ง 13 อัน
เป็นชื่อ default — ไม่มี design system ให้สืบทอด มีแต่เนื้อหา ถ้าจะย้ายเนื้อหามา
ให้ copy ข้อความ (ไม่ใช่ paste แบบ keep formatting) ลง layout ใหม่
