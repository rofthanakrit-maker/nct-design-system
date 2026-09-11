# NCT Design System

Design system ของ New Computer Technology Consulting Co., Ltd. — token ชุดเดียว
ป้อนสองปลายทาง: **template PowerPoint** และ **React component library**

```
scripts/tokens.py            ← single source of truth
   ├── scripts/build.py            → NCT-Slide-Template.potx   (19 layouts x 2 brands)
   └── scripts/emit_web_tokens.py  → web/src/tokens.{css,ts}   (@nct/slides)
```

แก้สีหรือขนาด → แก้ `design.md` ก่อน → sync ลง `scripts/tokens.py` → rebuild ทั้งสองฝั่ง
**ห้ามแก้ไฟล์ที่ generate** (`web/src/tokens.css`, `tokens.ts`, `fonts.css`, `assets.ts`)

## เอกสาร

| ไฟล์ | เนื้อหา |
|---|---|
| [`design.md`](design.md) | brand token ต้นทาง (studied จาก nctthai.com) + ส่วนขยาย v2 / v3 |
| [`slide-design-system.md`](slide-design-system.md) | v1 — canvas, grid, type scale, layout 01–10, กติกาการทำเด็ค |
| [`slide-design-system-v2.md`](slide-design-system-v2.md) | v2 — token dense, status/category, layout 11–16 |
| [`slide-design-system-v3.md`](slide-design-system-v3.md) | v3 — brand mode `corp`, chrome geometry, cover คนละใบ, layout 17–18 (แกะจาก `NCT Template.pptx`) |
| [`slide-design-system-v4.md`](slide-design-system-v4.md) | v4 — สีข้อมูลที่ผ่าน validator ของ dataviz (`CAT_1..4` ชุดใหม่), mark spec ของกราฟ, layout 19 (สเปก 20–23 ยังไม่ทำ) |
| [`.design-sync/conventions.md`](.design-sync/conventions.md) | กติกาที่ design agent ต้องอ่านก่อนสร้างสไลด์ |
| [`.design-sync/NOTES.md`](.design-sync/NOTES.md) | กับดักเฉพาะ repo นี้ อ่านก่อน re-sync |

## Layout ทั้ง 19

Render จาก PowerPoint จริง ไม่ต้อง clone ก็ดูได้ — ภาพในนี้คือไฟล์ใน `preview/`
ที่ `scripts/render_previews.py` เขียนทับทุกครั้งที่ geometry หรือสีขยับ

| web | corp |
|---|---|
| <img src="preview/all-layouts.png" alt="contact sheet ของ 19 layout brand web" width="380"> | <img src="preview/corp-all-layouts.png" alt="contact sheet ของ 19 layout brand corp" width="380"> |

<details>
<summary>ดูทีละ layout — web (19 ภาพ)</summary>

![layout 01](preview/layout-01.png)

![layout 02](preview/layout-02.png)

![layout 03](preview/layout-03.png)

![layout 04](preview/layout-04.png)

![layout 05](preview/layout-05.png)

![layout 06](preview/layout-06.png)

![layout 07](preview/layout-07.png)

![layout 08](preview/layout-08.png)

![layout 09](preview/layout-09.png)

![layout 10](preview/layout-10.png)

![layout 11](preview/layout-11.png)

![layout 12](preview/layout-12.png)

![layout 13](preview/layout-13.png)

![layout 14](preview/layout-14.png)

![layout 15](preview/layout-15.png)

![layout 16](preview/layout-16.png)

![layout 17](preview/layout-17.png)

![layout 18](preview/layout-18.png)

![layout 19](preview/layout-19.png)

</details>

<details>
<summary>ดูทีละ layout — corp (19 ภาพ)</summary>

![corp layout 01](preview/corp-layout-01.png)

![corp layout 02](preview/corp-layout-02.png)

![corp layout 03](preview/corp-layout-03.png)

![corp layout 04](preview/corp-layout-04.png)

![corp layout 05](preview/corp-layout-05.png)

![corp layout 06](preview/corp-layout-06.png)

![corp layout 07](preview/corp-layout-07.png)

![corp layout 08](preview/corp-layout-08.png)

![corp layout 09](preview/corp-layout-09.png)

![corp layout 10](preview/corp-layout-10.png)

![corp layout 11](preview/corp-layout-11.png)

![corp layout 12](preview/corp-layout-12.png)

![corp layout 13](preview/corp-layout-13.png)

![corp layout 14](preview/corp-layout-14.png)

![corp layout 15](preview/corp-layout-15.png)

![corp layout 16](preview/corp-layout-16.png)

![corp layout 17](preview/corp-layout-17.png)

![corp layout 18](preview/corp-layout-18.png)

![corp layout 19](preview/corp-layout-19.png)

</details>

## PowerPoint

```bash
python scripts/build.py          # เขียนทับ .potx และ .pptx ที่ root
```

- `NCT-Slide-Template.potx` — 1 slide master + 19 custom layouts + NCT theme
- `NCT-Slide-Template-Demo.pptx` — เดโม 19 สไลด์ layout ละ 1
- `NCT-Slide-Template-Corp.potx` — 19 layout เบอร์เดิม ใส่ chrome แบบฟอร์มบริษัท
  (เส้นเต็มความกว้าง, การ์ดโลโก้มุมขวาบน, แถบสามช่วงที่ก้นสไลด์) **ยกเว้น layout 01
  ที่เป็นคนละสไลด์** — พื้นขาว จัดกลาง watermark ตามหน้าปกที่บริษัทใช้จริง
  แยกไฟล์เพราะ layout ใน PowerPoint สลับ chrome ของตัวเองไม่ได้
- `NCT-Slide-Template-Corp-Demo.pptx` — เดโมฝั่ง corp

```bash
python scripts/check_template.py   # ตรวจไฟล์ที่ build แล้ว
python scripts/render_previews.py  # → preview/ (ต้องมี PowerPoint บน Windows)
```

`check_template.py` ตรวจ 5 อย่าง — XML parse, shape id / placeholder idx ซ้ำ,
shape หลุดขอบ canvas, **ข้อความล้นลงไปทับเส้น footer** (คิดความสูงบรรทัดไทยจริง
ที่ 1.511 em ไม่ใช่ค่า spcPct ตรง ๆ) และ **สีบ้าน `#216B7F` / `#8FBACE` / navy
`#23436D` โผล่ในไฟล์ corp** (navy ยกเว้น gradient ของ layout 10) สองข้อหลังคือ
บั๊กที่เคยหลุดไปแล้วทั้งคู่

- `preview/` — `layout-01..19.png` (web) + `corp-layout-01..19.png` (corp)
  เรียงตามเบอร์ layout + contact sheet สองใบ (`all-layouts.png` = web,
  `corp-all-layouts.png` = corp) render จาก PowerPoint จริง
  **รันใหม่ทุกครั้งที่ geometry ขยับ**

**ติดตั้งฟอนต์ก่อนเปิด** — Noto Sans Thai อยู่ใน `fonts/` (คลิกขวา → Install),
Kanit โหลดจาก [Google Fonts](https://fonts.google.com/specimen/Kanit)
ไม่ติดตั้งแล้ว PowerPoint จะ substitute ฟอนต์อื่น ผิดหน้าตาทั้งเด็ค

## React (`@nct/slides`)

```bash
npm install                  # ที่ root — workspace จะลิงก์ web/ ให้
npm run build                # → web/dist/index.js + index.d.ts
npm run fonts                # woff2 (ต้องมี Kanit ติดตั้งบนเครื่อง)
npm run assets               # โลโก้เป็น data URI
```

19 component ตรงกับ 19 layout ใน `.potx` เลขเดียวกัน ออกแบบฝั่งเว็บแล้วมาทำต่อ
ใน PowerPoint ได้โดยหยิบ layout เบอร์เดิม

`<Deck brand="corp">` เปลี่ยนเป็นแบบฟอร์มบริษัท — เส้นเต็มความกว้าง, การ์ดโลโก้
มุมขวาบน, แถบสามช่วงที่ก้น และย้าย role สีทั้งเด็ค: `--nct-accent` → `#006666`,
`--nct-heading` → ink, `--nct-dark` (หัวตาราง, panel เข้ม, กล่องระบบ) → `#193B36`
ฝั่งเว็บสลับได้ใน deck เดียว ฝั่ง PowerPoint ต้องหยิบไฟล์ `-Corp.potx`

สองแบรนด์ **เลือกทั้งเด็ค ไม่ผสมในสไลด์เดียว** — ฝั่ง `.potx` บังคับด้วย
`check_template.py` ที่ fail ถ้าเจอสีบ้านหลุดเข้าไฟล์ corp สีที่ไม่ย้ายตามแบรนด์คือ
paper, ink, tint, status และ category 4 สี โดยตั้งใจ — ตารางต้องแปลว่าเหมือนกัน
ไม่ว่าอยู่บนหัวจดหมายไหน

`SlideCover` เป็น layout เดียวที่สอง brand เป็น**คนละสไลด์** ไม่ใช่สไลด์เดียวกัน
เปลี่ยน furniture — `web` เปิดด้วย gradient อ่านชิดซ้าย, `corp` เป็นพื้นขาว จัดกลาง
โลโก้เป็นพระเอก และตัดแถบก้นกับการ์ดมุมทิ้ง `date` ลงมุมซ้ายล่างเป็นบรรทัด
"Updated date" ตามต้นฉบับ

```tsx
<Deck brand="corp" date="Updated date: 2026.09.07">
  <SlideCover title={<><span>PROPOSAL</span><span>For</span><span>“ลูกค้า”</span></>} />
  …
</Deck>
```

ดูของจริง:

```bash
npm run demo                 # bundle demo.tsx -> demo.js (demo:watch = แก้แล้ว build เอง)
npm run serve                # เปิด /demo/index.html
```

## Import เข้า Claude Design

`.design-sync/config.json` ตั้งค่าไว้ครบแล้ว (`pkg`, `globalName`, `buildCmd`,
`cssEntry`, `readmeHeader`) รันจาก root ของ repo:

```
/design-sync
```

converter จะอ่าน `web/dist/` แล้วสร้าง bundle + preview card + `.prompt.md`
ต่อ component ก่อนอัปโหลด ถ้ายังไม่เคย sync มันจะสร้าง project ใหม่ให้แล้วจำ
`projectId` ลง config เอง

## โครงสร้าง

```
design.md  slide-design-system*.md      เอกสารระบบ
scripts/                                generator ทั้งหมด (Python, ไม่ต้องลง library)
  tokens.py                             ← แก้ที่นี่
  build.py ooxml.py parts_*.py          OOXML → .potx
  check_template.py                     ตรวจ .potx/.pptx ที่ build แล้ว
  render_previews.py                    .pptx → preview/ ผ่าน PowerPoint
  emit_web_tokens.py build_webfonts.py emit_web_assets.py
web/                                    @nct/slides
  src/  Slide.tsx primitives.tsx layouts.tsx  + ไฟล์ที่ generate
  demo/ demo.tsx                        17 layout (web) + 5 สไลด์อ้างอิง corp
assets/  fonts/  preview/               โลโก้ · ฟอนต์ต้นฉบับ · ภาพ render (generate)
```
