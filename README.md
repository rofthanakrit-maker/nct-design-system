# NCT Design System

Design system ของ New Computer Technology Consulting Co., Ltd. — token ชุดเดียว
ป้อนสองปลายทาง: **template PowerPoint** และ **React component library**

```
scripts/tokens.py            ← single source of truth
   ├── scripts/build.py            → NCT-Slide-Template.potx   (18 layouts x 2 brands)
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
| [`slide-design-system-v3.md`](slide-design-system-v3.md) | v3 — brand mode `corp`, chrome geometry, layout 17–18 (แกะจาก `NCT Template.pptx` สไลด์ 33–43) |
| [`.design-sync/conventions.md`](.design-sync/conventions.md) | กติกาที่ design agent ต้องอ่านก่อนสร้างสไลด์ |
| [`.design-sync/NOTES.md`](.design-sync/NOTES.md) | กับดักเฉพาะ repo นี้ อ่านก่อน re-sync |

## PowerPoint

```bash
python scripts/build.py          # เขียนทับ .potx และ .pptx ที่ root
```

- `NCT-Slide-Template.potx` — 1 slide master + 18 custom layouts + NCT theme
- `NCT-Slide-Template-Demo.pptx` — เดโม 18 สไลด์ layout ละ 1
- `NCT-Slide-Template-Corp.potx` — 18 layout เดิม แต่ใส่ chrome แบบฟอร์มบริษัท
  (เส้นเต็มความกว้าง, การ์ดโลโก้มุมขวาบน, แถบสามช่วงที่ก้นสไลด์)
  แยกไฟล์เพราะ layout ใน PowerPoint สลับ chrome ของตัวเองไม่ได้
- `NCT-Slide-Template-Corp-Demo.pptx` — เดโมฝั่ง corp

```bash
python scripts/check_template.py   # ตรวจไฟล์ที่ build แล้ว (XML, id/idx ซ้ำ, หลุดขอบ)
python scripts/render_previews.py  # → preview/ (ต้องมี PowerPoint บน Windows)
```

- `preview/` — `layout-01..18.png` เรียงตามเบอร์ layout + contact sheet สองใบ
  (`all-layouts.png` = web, `corp-all-layouts.png` = corp) render จาก PowerPoint
  จริงด้วย `scripts/render_previews.py` **รันใหม่ทุกครั้งที่ geometry ขยับ**

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

18 component ตรงกับ 18 layout ใน `.potx` เลขเดียวกัน ออกแบบฝั่งเว็บแล้วมาทำต่อ
ใน PowerPoint ได้โดยหยิบ layout เบอร์เดิม

`<Deck brand="corp">` เปลี่ยนเป็น chrome แบบฟอร์มบริษัท — ฝั่งเว็บสลับได้ใน deck
เดียว ฝั่ง PowerPoint ต้องหยิบไฟล์ `-Corp.potx`

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
  demo/ demo.tsx                        ตัวอย่างใช้งานครบ 18 layout ทั้งสอง brand
assets/  fonts/  preview/               โลโก้ · ฟอนต์ต้นฉบับ · ภาพ render (generate)
```
