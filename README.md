# NCT Design System

Design system ของ New Computer Technology Consulting Co., Ltd. — token ชุดเดียว
ป้อนสองปลายทาง: **template PowerPoint** และ **React component library**

```
scripts/tokens.py            ← single source of truth
   ├── scripts/build.py            → NCT-Slide-Template.potx   (16 layouts)
   └── scripts/emit_web_tokens.py  → web/src/tokens.{css,ts}   (@nct/slides)
```

แก้สีหรือขนาด → แก้ `design.md` ก่อน → sync ลง `scripts/tokens.py` → rebuild ทั้งสองฝั่ง
**ห้ามแก้ไฟล์ที่ generate** (`web/src/tokens.css`, `tokens.ts`, `fonts.css`, `assets.ts`)

## เอกสาร

| ไฟล์ | เนื้อหา |
|---|---|
| [`design.md`](design.md) | brand token ต้นทาง (studied จาก nctthai.com) + ส่วนขยาย v2 |
| [`slide-design-system.md`](slide-design-system.md) | v1 — canvas, grid, type scale, layout 01–10, กติกาการทำเด็ค |
| [`slide-design-system-v2.md`](slide-design-system-v2.md) | v2 — token dense, status/category, layout 11–16 |
| [`.design-sync/conventions.md`](.design-sync/conventions.md) | กติกาที่ design agent ต้องอ่านก่อนสร้างสไลด์ |
| [`.design-sync/NOTES.md`](.design-sync/NOTES.md) | กับดักเฉพาะ repo นี้ อ่านก่อน re-sync |

## PowerPoint

```bash
python scripts/build.py          # เขียนทับ .potx และ .pptx ที่ root
```

- `NCT-Slide-Template.potx` — 1 slide master + 16 custom layouts + NCT theme
- `NCT-Slide-Template-Demo.pptx` — เดโม 16 สไลด์ layout ละ 1
- `preview/` — ภาพ render จาก PowerPoint จริง

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

16 component ตรงกับ 16 layout ใน `.potx` เลขเดียวกัน ออกแบบฝั่งเว็บแล้วมาทำต่อ
ใน PowerPoint ได้โดยหยิบ layout เบอร์เดิม

ดูของจริง:

```bash
npx esbuild web/demo/demo.tsx --bundle --format=esm --jsx=automatic \
  --outfile=web/demo/demo.js --loader:.tsx=tsx
python -m http.server 5173 --directory web    # เปิด /demo/index.html
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
  emit_web_tokens.py build_webfonts.py emit_web_assets.py
web/                                    @nct/slides
  src/  Slide.tsx primitives.tsx layouts.tsx  + ไฟล์ที่ generate
  demo/ demo.tsx                        ตัวอย่างใช้งานครบ 16 layout
assets/  fonts/  preview/               โลโก้ · ฟอนต์ต้นฉบับ · ภาพ render
```
