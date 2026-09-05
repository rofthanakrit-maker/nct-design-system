---
target: web/src/layouts.tsx
total_score: 20
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 3
timestamp: 2026-09-05T06-45-28Z
slug: web-src-layouts-tsx
---
Method: dual-agent (A: design review, isolated · B: detector + browser evidence, isolated). Both completed before synthesis. HEAD `a8a96fd`.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 1 | ทุก overflow เงียบสนิท: agenda 6 บรรทัดทับ footer 24.5px, process flow 8 ขั้นล้นขอบ 518px, `.nct-body` สไลด์ 6 เลยขอบล่าง 4.8px — ไม่มี clamp ไม่มี warning |
| 2 | Match System / Real World | 3 | default เป็นไทยจริง (`สรุป` / `ผลลัพธ์` / `สภาพปัจจุบัน`), 10pt floor มีเพราะไทยต้องการ; หัก `title = "ขอบคุณครับ"` ฮาร์ดโค้ดคำลงท้ายเพศชาย และคำว่า "category" ที่สีบอกไม่ได้ |
| 3 | User Control and Freedom | 2 | ไม่มี vertical-centering, ไม่มี auto-height card, ไม่มีทางมาร์ก recommended column; ทางออกเดียวคือ bare `Slide` = หลุดระบบ |
| 4 | Consistency and Standards | 2 | table style เดียว + band เดียว ดีมาก แต่ L02 / L08 `fade` / L15 เรนเดอร์เป็นภาพเดียวกัน; `SlideClosing` เลือก class จาก `image` แทน `band` ที่ตัวเองคำนวณไว้ (`layouts.tsx:337,344`) |
| 5 | Error Prevention | 2 | `takeaway` required + `cards` เป็น tuple = ป้องกันจริง; แต่ `steps`, `items`, `contact`, `rows` เป็น array ไม่จำกัด เพดานอยู่ใน JSDoc เฉย ๆ |
| 6 | Recognition Rather Than Recall | 2 | `variant="full"\|"fade"` (L08) กับ `imageMode="band"\|"full"` (L10) คือความคิดเดียวกันสองชื่อ; `category: 1–4` ต้องจำว่าเลขไหนสีอะไรและแปลว่าอะไร |
| 7 | Flexibility and Efficiency | 2 | `{...chrome}` spread ช่วยได้ แต่ `pageNumber` พิมพ์มือทั้ง 16 สไลด์ — แทรกสไลด์เดียว = แก้ 14 จุด ไม่มี `Deck` chrome inheritance |
| 8 | Aesthetic and Minimalist Design | 2 | สะอาดจริง แต่ล่างสุดของ layout สว่างเกือบทุกใบว่าง; `.nct-band__label { flex: 0 0 168px }` เว้นช่องว่างตาย ~130px หลัง label ไทย 3 ตัวอักษร บน 6 สไลด์ |
| 9 | Error Recovery | 1 | ไม่มีเลย พื้นผิว error ทั้งหมดคือ TypeScript จับ tuple arity |
| 10 | Help and Documentation | 3 | ชั้นที่แข็งที่สุด — `conventions.md` เขียนกฎพร้อม "ความพังที่กฎนี้กัน" ทุกข้อ; หักเพราะกฎ handshake ขัดตัวเอง, `preview/*.png` เก่ากว่าทุก commit ที่แก้ดีไซน์ แต่ `README.md:44` ยังอ้างว่าเป็นภาพจริง |
| **Total** | | **20/40** | **Acceptable — ต้องแก้จริงจังก่อนถึงมือลูกค้า** |

## Design Specificity Verdict

**เขียนเองครึ่งเดียว.**

**LLM assessment** — ชั้น token เป็นของ NCT จริง: Kanit เป็นเสียง display เพราะทีมวินิจฉัยข้อบกพร่องของเว็บตัวเอง (`design.md:72` เขียนไว้เองว่า "single font family… flat typographic voice"), gradient navy→teal มาจากโลโก้จริง, `.nct-decor` สี่เหลี่ยมหมุนมาจาก diamond mark, 10pt floor มีเพราะภาษาไทยต้องการ, ภาพถ่ายเป็นอาคาร NCT เอง (`scripts/prepare_images.py:27-33`) ไม่ใช่ stock

แต่ **inventory ของ layout กับตัว demo คือเด็ค B2B สำเร็จรูป** เปลี่ยน hex สามค่าแล้วเป็นบริษัทที่ปรึกษาที่ไหนก็ได้ ไม่มีอะไรใน 16 layout ที่เจาะจงว่านี่คือ **IT consulting**: ไม่มี scope/RACI, ไม่มี timeline, ไม่มี SLA matrix, ไม่มีคำศัพท์ environment/tier เกินกล่องหนึ่งใบกับลูกศรหนึ่งเส้น และ demo — ไฟล์ที่ทุกคนจะก๊อป — หยิบสามช่วงที่เป็นแม่แบบที่สุดของ B2B: การ์ดสามเสาหลัก, สถิติสามตัว `12 / 99.9% / 24-7`, และภาพจับมือปิดท้าย

จุดที่ทั่วไปจนสลับกับใครก็ได้:
- `web/demo/demo.tsx:66-74` — "สามเสาหลักของบริการ" หัวข้อเป็นภาษาอังกฤษ (`Infrastructure` / `Managed Service` / `Cloud & Security`) ในเด็คไทย
- `web/demo/demo.tsx:79-83` — `12 ปี / 99.9% Uptime / 24/7` ตัวเลขสามตัวที่ลูกค้าตรวจสอบไม่ได้ วางที่สไลด์ 6 ก่อนจะมีปัญหาให้แก้
- `.design-sync/conventions.md:77` ห้าม "meetings, handshakes and stacked hands" ระบุว่าเป็น "templated-AI tell that this system exists to avoid" แล้ว `:85` ให้ข้อยกเว้นกับสิ่งนั้นพอดีบนสไลด์ปิด และ `demo.tsx:210-214` ก็ส่งมันจริง — ระบบตั้งชื่อ anti-pattern ของตัวเองแล้ววางไว้ที่จุด peak-end
- `--nct-cat-1..4` = `#23436D / #216B7F / #4E8FA8 / #16324F` วัดได้ cat1↔cat4 **1.31:1**, cat1↔cat2 **1.66:1**, cat2↔cat3 **1.67:1** — ไม่ใช่ระบบรหัสสี เป็นน้ำเงินเฉดเดียวกันสี่เฉด
- mascot ซึ่งน่าจะเป็น asset ที่เป็นตัวตนที่สุด ถูก inline เข้าทุก bundle (`assets.ts:29`, ~1MB) แล้วไม่มี layout ไหนใช้เลย ทั้งที่ `conventions.md` บอกว่า "welcome wherever a slide has room"

**Deterministic scan** — `detect.mjs --json web/src web/demo` ออก **exit 0, 0 findings** และตรวจแล้วว่าเป็นการผ่านจริงไม่ใช่ no-op: ไฟล์ทั้งหมดอยู่ใน `SCANNABLE_EXTENSIONS` และ control file ที่ใส่ slop pattern ตั้งใจก็ยิงถูก (`gradient-text`, `bounce-easing`, exit 2) แต่ registry ตัวนี้ (~40 rule) จับ **AI-slop visual tell** เท่านั้น ไม่ใช่ a11y หรือ geometry linter — ทุกอย่างข้างล่างอยู่นอกขอบเขตมัน ไม่มี false positive ให้หัก เพราะไม่มี finding เลย ข้อยกเว้น fixed-geometry (absolute px เป็นเจตนา ไม่ใช่ defect) ไม่ต้องใช้

**Visual overlays** — ไม่ได้ inject ไม่มี overlay ให้ดูในเบราว์เซอร์ หลักฐานทั้งหมดมาจากการวัด `getComputedStyle` / `getBoundingClientRect` ตรง ๆ

## Overall Impression

ระบบนี้แข็งตรงที่คนส่วนใหญ่หย่อน และหย่อนตรงที่มันควรจะแข็งที่สุด token layer, rule doc, และการบังคับ `takeaway` ผ่าน type checker คือของจริงระดับที่ทีมส่วนใหญ่ไม่ทำ แต่มันเป็นชุด layout ที่ **ขอไม่เป็น** — เด็คข้อเสนอที่จบด้วย "ขอบคุณครับ" บนภาพจับมือ ไม่มีราคา ไม่มีขั้นถัดไป ไม่มีวันตัดสินใจ ทั้งที่ agenda ของ demo เองสัญญาว่าจะมี "งบประมาณและเงื่อนไข"

โอกาสเดียวที่ใหญ่ที่สุด: เอาเทคนิคที่ได้ผลแล้วครั้งเดียว (บังคับข้อสรุปด้วย type) ไปใช้กับเพดานที่เหลือ แล้วเติม layout ที่ปิดการขาย

## What's Working

1. **`TakeawayBand` ที่ required และ pin ติดพื้น** — `takeaway` เป็น prop บังคับบน `SlideTable` / `SlideDiagram` / `SlideDenseTable` และ `.nct-band--foot` ตรึงไว้ที่ y เดิมไม่ว่าตารางจะกี่แถว วัดในเบราว์เซอร์: สไลด์ 9/13/15 ข้อสรุปลงที่ 590.4px เท่ากันหมด ที่ปรึกษาที่รีบจะ **ส่งตารางเปรียบเทียบโดยไม่บอกว่าแนะนำอะไรไม่ได้ในเชิงกายภาพ** นี่คือกรณีหายากที่กฎดีไซน์ถูกบังคับด้วย type checker แทน style guide
2. **Status tint ที่รอดจาก zebra** — วัดได้ `ok 4.96:1`, `warn 5.26:1`, `risk 4.61:1` บน tint ตัวเอง และอ่านออกทั้งบน `--nct-paper` และแถวคู่ `--nct-paper-2` การแก้ปัญหา tint-ชน-zebra แทนที่จะเลือกสีสวย ๆ คือรายละเอียดที่โผล่เฉพาะเมื่อมีคนสร้างตารางแน่น ๆ จริง
3. **`conventions.md` เขียนเป็นผลลัพธ์ ไม่ใช่รสนิยม** — ทุกกฎพ่วง "ความพังที่กฎนี้กัน" มาด้วย นี่คือสิ่งที่รอดตอนคนอ่านมันสี่ทุ่มก่อนประชุมลูกค้า
4. **10pt floor ถือได้จริง** — เล็กสุดในเด็คทั้งใบคือ 13.33px พอดี, `belowFloorTextElements: []` ไม่มีตัวไหนหลุด (99 element นั่งอยู่บนพื้นพอดี ไม่มี headroom แต่ก็ไม่มีการละเมิด)

## Priority Issues

### [P0] เด็คไม่มีคำขอ — ไม่มี layout ราคา และสไลด์ปิดคือคำขอบคุณ

**Why it matters** — agenda ของ demo เอง (`demo.tsx:194-200`) สัญญา "แผนดำเนินงานและผู้รับผิดชอบ" และ "งบประมาณและเงื่อนไข" ระบบไม่มี layout ที่ทำทั้งสองอย่าง `SlideTable` (L09) เทียบแพ็กเกจโดยไม่มีแถวราคาและไม่มีการเน้นคอลัมน์ที่แนะนำ `SlideClosing` (L10) เรนเดอร์ `ขอบคุณครับ` + สามบรรทัดติดต่อ แล้วจบ นี่คือพื้นผิว Persuade — peak-end rule ให้น้ำหนักสูงสุดกับสไลด์สุดท้าย และสไลด์สุดท้ายไม่ขออะไรเลย ที่ปรึกษาที่ต้องการสไลด์งบจะไปสร้างบน bare `Slide` = หลุดระบบทันที ซึ่งคือความพังที่สัญญา parity 1:1 มีไว้กัน

**Fix** — เติม `nextSteps?: ReactNode[]` และ `decisionBy?: string` ใน `SlideClosing` (`layouts.tsx:296-318`) เรนเดอร์เหนือบล็อกติดต่อบน margin 96px เดิม สไลด์ปิดกลายเป็น "จากนี้เกิดอะไร ภายในเมื่อไหร่" และคำขอบคุณลดชั้นลงเป็น title จากนั้นไม่เพิ่ม pricing variant ให้ `SlideTable` ก็ต้องเขียนใน `conventions.md` ว่างบอยู่บน `SlideDenseTable` พร้อมแถวรวมแบบ `bold` และโชว์ใน demo แล้วเรียง `demo.tsx` ใหม่ตามลำดับการโน้มน้าว (cover → agenda → ปัญหา → ผลลัพธ์ → กระบวนการ → สถาปัตยกรรม → ขอบเขต → แพ็กเกจ → ปิด) เพราะไฟล์ที่คนก๊อปคือไฟล์ที่สอน

**Suggested command** — `/impeccable shape`

### [P0] เพดานที่เอกสารเขียนเอง พังเงียบ ๆ ทั้งสามจุด

**Why it matters** — วัดที่ 1280×720:
- `SlideAgenda` JSDoc เขียน "Four to six lines" (`layouts.tsx:558`) — 5 บรรทัด: list ล่างสุด **639.9px** เทียบ footer บนสุด **655.2px** เหลือ 15.3px; **6 บรรทัด: 679.7px ทับ footer 24.5px**; 7 บรรทัด: 719.5px ชนขอบ canvas พอดี demo ส่ง 5 จึงซ่อนไว้ห่างขอบแค่บรรทัดเดียว
- `SlideProcessFlow` JSDoc เขียน "Three to five steps" แต่ `steps: FlowStep[]` ไม่จำกัด — **8 ขั้น: ขั้นสุดท้ายจบที่ x = 1797.9px บน canvas กว้าง 1280px** โดน `overflow: hidden` ตัดหาย
- `.nct-body` บนสไลด์ 6 (`layouts.tsx:175` override `top: 268.8` แต่ปล่อย height เป็น `var(--nct-body-h)` = 456px) → 724.8px เลยขอบล่าง 4.8px และกินเข้าไปในแถบ footer 21.6px

ทั้งสามไม่มี warning ไม่มี clamp ไม่มี dev log คนที่อ่าน JSDoc แล้วใช้หกบรรทัดจะได้สไลด์เปิดบทที่พัง และรู้ตอนอยู่ในห้องประชุม

**Fix** — เปลี่ยน `items` เป็น tuple union 4–6 และ `steps` เป็น 3–5 แบบเดียวกับที่ `cards` ทำอยู่แล้ว (`layouts.tsx:190`) เพดานจะถูก **ตรวจ** ไม่ใช่ **เล่า**; แล้วขยับ `.nct-agenda__list` จาก `top: 451.2px` (`slides.css:333`) ขึ้นเป็น 424px ให้หกบรรทัดพอดีจริง; สไลด์ 6 ให้ `height: calc(var(--nct-body-h) - 91.2px)` คู่กับ `top` ที่ override

**Suggested command** — `/impeccable harden`

### [P1] footer chrome ตก AA บนสไลด์เข้ม — และตกบนสองสไลด์ที่ค้างจอนานที่สุด

**Why it matters** — ทั้งสอง assessment ชนกันตรงนี้โดยไม่เห็นกัน `.nct-footer` บน tone เข้มคือ `rgb(255 255 255 / 0.55)` ที่ 13.33px (`slides.css:85-88`) วัดได้ **4.26:1 บน navy**, **3.70:1 บน `--nct-mid`**, **3.00:1 บน `--nct-teal`** ต้องการ 4.5:1 ทั้งหมด `--nct-grad-open` และ `--nct-grad-close` จบที่ `--nct-teal` ทั้งคู่ และเลขหน้าอยู่ขอบขวา = ปลายที่สว่างที่สุด แปลว่าตกทั้ง L01 และ L10 `conventions.md:52` ห้ามใช้เทาจางบนสไลด์เข้มอยู่แล้ว — อันนี้คือ defect เดียวกันที่ใส่ alpha แทน hex

**Fix** — ยก dark-tone footer เป็น `rgb(255 255 255 / 0.72)` (วัดได้ **6.08:1 บน navy**, **4.5:1 บน teal**) ที่ `slides.css:85-88` และให้ demo ส่ง `hideFooter` บน `SlideCover` — การใส่เลข "1" บนปกผิดธรรมเนียมเด็ค prop มีอยู่แล้ว (`Slide.tsx:52`) แต่ไฟล์ที่คนก๊อปไม่ได้สาธิต

**Suggested command** — `/impeccable audit`

### [P1] category coding ถอดรหัสไม่ได้ และหนึ่งในสี่ค่าตก AA

**Why it matters** — วัดระยะห่างระหว่าง `--nct-cat-*`: **1↔4 = 1.31:1**, **1↔2 = 1.66:1**, **2↔3 = 1.67:1** บนสไลด์ 15 คอลัมน์ `#` ใช้ cat-1 / cat-2 / cat-4 อ่านเป็นน้ำเงินเข้มสีเดียวกันหมด และไม่มี legend อยู่บนสไลด์เลย ผู้อ่านต้องจำว่า "navy = AP" โดยไม่มีอะไรให้เปิดดู และต่อให้จำได้ 1.31:1 ก็แยกไม่ออก แยกอีกเรื่อง: `category: 3` เติม `#4E8FA8` กับตัวหนังสือขาวหนา 10pt = **3.61:1** ต่ำกว่า 4.5:1 ที่ 13.33px ต้องการ (ไม่ใช่ large text) คอลัมน์นี้กินหมึก บอกเป็นนัยว่ามี taxonomy ไม่ส่งอะไรเลย และซ้ำกับคอลัมน์ "หมวด" ข้าง ๆ ที่สะกด AP/AR/GL เป็นตัวหนังสืออยู่แล้ว

**Fix** — ลบ `category` fill ออกจาก `TableCell` เก็บคอลัมน์ตัวหนังสือไว้ หรือถ้าจะเก็บสีไว้ ลดเหลือสองค่า (`--nct-navy` กับ `--nct-teal-l`, ห่าง 2.78:1) และห้ามตัวหนังสือขาวบน cat-3 ใน `conventions.md` — `design.md:100-101` เขียนเองว่า "beyond 4 categories, label instead of coloring" การอ่านตัวเลขอย่างซื่อสัตย์บอกว่าเพดานคือ 2 ไม่ใช่ 4

**Suggested command** — `/impeccable colorize`

### [P1] สไลด์ตัดสินใจ ไม่ตัดสินใจอะไรเลย

**Why it matters** — `SlideTable` (`layouts.tsx:264-292`) ให้น้ำหนักภาพเท่ากันทั้งสามคอลัมน์แพ็กเกจ takeaway บอกว่า "องค์กร 50–200 ที่นั่งเลือก Business" แต่คอลัมน์ Business ไม่มี fill ไม่มี border ไม่มีหัวตารางต่างจากเพื่อน `DataTableProps` ไม่มีแนวคิด `recommended` หรือ `emphasis` เลย นี่คือสไลด์เดียวที่ลูกค้าเลือกจริง แล้วมันยื่นสามทางเลือกที่เท่ากันกับประโยคหนึ่งบรรทัดข้างล่าง

**Fix** — เติม `recommended?: number` (index คอลัมน์) ใน `DataTableProps` (`primitives.tsx:129-142`) เรนเดอร์ `<th>` คอลัมน์นั้นบน `--nct-teal` แทน `--nct-navy`, ให้คอลัมน์นั้นพื้น `--nct-paper-2` ทับ zebra, และวางแถบ `--nct-teal` หนา 4.8px เหนือหัวตาราง — คำศัพท์เส้นเดียวกับที่ `SlideTitle` ใช้อยู่แล้ว หนึ่ง prop ไม่มีภาษาภาพใหม่

**Suggested command** — `/impeccable layout`

## Persona Red Flags

**ที่ปรึกษา NCT ที่ประกอบข้อเสนออยู่สี่ทุ่ม** (project-specific) — `pageNumber` พิมพ์มือทั้ง 16 สไลด์ใน `demo.tsx`; แทรกสไลด์ที่ตำแหน่ง 3 = แก้เลขหน้ามือ 14 จุด และไม่มีอะไรเตือนเมื่อสองสไลด์เลขซ้ำ ไม่มี layout งบประมาณ สไลด์เดียวที่ลูกค้าอ่านจริงจึงต้องสร้างมือบน bare `Slide` แล้วหลุดระบบ `SlideThreeCards` type เป็น 3-tuple ตายตัว (`layouts.tsx:130`) ตัดบริการเหลือสองอันหมายถึงเปลี่ยน layout ไม่ใช่เปลี่ยนเนื้อหา และ `SlideAgenda` ที่หกบรรทัดทับ footer เงียบ ๆ ซึ่งจะรู้ตอนอยู่ในห้องประชุม

**Sam (accessibility)** — footer **3.00:1** บน gradient ปกและสไลด์ปิด; cell `category: 3` ขาวบน `#4E8FA8` **3.61:1** ที่ 10pt; คอลัมน์ category บน L16 ส่งข้อมูลผ่านสีที่ห่างกัน 1.31:1 โดยไม่มี legend; `<th>` **0 จาก 10 ตัวมี `scope`** (`primitives.tsx:164` เรนเดอร์ `<th key={i} data-align={align}>` เปล่า ๆ ทั้งสองตารางเป็น column-header อย่างเดียว จึงขาด `scope="col"`) และไม่มีตารางไหนมี `<caption>`; เอกสารมี `lang="th"` ตัวเดียว ไม่มี `lang="en"` ที่ไหนเลยทั้งที่มี `Infrastructure` / `Managed Service` / `Cloud & Security` / `Essential` / `Business` / `Enterprise` / `contact@nctthai.com` เป็นอักษรละติน; `letter-spacing: 0.12em` ใส่บนข้อความไทยหกจุด (`slides.css:100, 372, 445, 658` และ `0.06em` ที่ `:495, 672` บวก `spc=120` ใน `parts_layouts.py:270,309`) ซึ่งดึงสระและวรรณยุกต์ไทยหลุดจากพยัญชนะฐาน

ข้อดีที่ต้องบันทึก: 22/22 `<img>` มี `alt`, 7/7 SVG ตกแต่งมี `aria-hidden="true"`, หัวเรื่องทุกสไลด์เป็น heading element จริง (`titleLikeDivs: 0` ทั้ง 16 สไลด์) ไม่มีการข้ามระดับ — มีแค่สไลด์ 6 (pull quote) ที่ไม่มี heading เลย

**Riley (stress tester)** — พังสี่จุดที่วัดได้ ทั้งหมดเงียบ: agenda 6 บรรทัดทับ footer 24.5px; process flow 8 ขั้นต้องการ 1798px ในกล่อง 1280px; `.nct-body` สไลด์ 6 เลย canvas 4.8px; และ label ของ `DiagramLink` ยาว 4 คำ ("ส่งเข้าระบบบัญชีอัตโนมัติ") วัดได้ **130.8px ในช่อง 48px ล้นข้างละ 41.4px** ทับกล่องข้างเคียง (`slides.css:625-634`, `white-space: nowrap` + `translateX(-50%)` ไม่มี containment)

**Jordan (first-timer)** — `conventions.md:32-34` เขียนว่า "**never write new CSS classes**… the `nct-*` class names are internal to the library" แล้วตัวอย่างเดียวของ layout 14 ทำสิ่งนั้นพอดี: `demo.tsx:171` เขียน `<div className="nct-dia-row">` ซึ่งเป็น class ภายในที่ไม่ได้ export และไม่ได้เอกสารไว้ เพราะ diagram kit ส่ง `DiagramBox` / `DiagramLink` / `DiagramGroup` มาโดยไม่มี row primitive **layout 14 ใช้ไม่ได้ถ้าไม่แหกกฎ styling ข้อแรกของระบบ**

## Minor Observations

- **มือถือ**: ไม่มี `<meta name="viewport">` เลย (มีแค่ `charset`) บนจอ 375px เบราว์เซอร์จึง layout ที่ 980px แล้วซูมออก 0.383 ทับกับ `--nct-scale` 0.728 ของระบบเอง — ข้อความ 13.33px ลงเอยที่ **~3.72 CSS px** floor ถือในพื้นที่ออกแบบ แต่ไม่รอดการส่งถึงโทรศัพท์ แยกอีกเรื่อง: `--nct-scale` คำนวณตอน mount เท่านั้น resize แล้วไม่ recompute จนกว่าจะ reload
- **10 token ประกาศแล้วไม่มีใครใช้**: `--nct-teal-l`, `--nct-mid`, `--nct-teal-b`, `--nct-mt`, `--nct-mb`, `--nct-col`, `--nct-half`, `--nct-third`, `--nct-quarter`, `--nct-note-h` (`--nct-cat-2/3/4` ดูเหมือนตายแต่ไม่ตาย — ถูกใช้แบบ dynamic ที่ `primitives.tsx:140` และ `layouts.tsx:430`)
- **gradient เขียน hex ซ้ำ token**: `tokens.css:78-80` ใส่ `#23436D`/`#1E5473`/`#216B7F`/`#16324F` เป็นตัวอักษรทั้งที่ทั้งสี่มี token อยู่ — อธิบายว่าทำไม `--nct-mid` ที่ประกาศว่าเป็น "gradient midpoint" ถึงไม่มี gradient ไหนใช้ (`tokens.css` เป็นไฟล์ generate แก้ที่ `emit_web_tokens.py`)
- `SlideClosing` เลือกทั้ง class ของ title (`layouts.tsx:337`) และของโลโก้ (`:344`) จาก `Boolean(image)` แทนตัวแปร `band` ที่คำนวณไว้ที่ `:321` ใน `imageMode="full"` โลโก้จึงได้ตำแหน่ง `--photo` (`left: 96px; top: 470px`) ซึ่งเหตุผลใน `slides.css:184-185` ("ไม่มีที่ว่างตรง margin เพราะมีแถบภาพขวา") ไม่จริงในโหมด full — โลโก้ขาวไปทับภาพจับมือกับขอบจอ
- `.nct-band__label { flex: 0 0 168px }` เว้นที่ตาย ~130px หลัง label ไทยสามตัวอักษร บนหกสไลด์ `flex: 0 0 auto` + `min-width` จะอ่านเป็น label ไม่ใช่คอลัมน์ที่พัง
- สาม layout เรนเดอร์เป็นภาพเดียวกัน: L02 (`SlideSection` + `image`), L08 `variant="fade"`, L15 (`SlideAgenda` + `image`) ให้ผลเป็น navy ซ้าย / แถบภาพขวา / เลข-เส้น-หัวเรื่อง เหมือนกันหมด และ `photoSection` กับ `photoFacade` เป็นสอง crop จากภาพต้นทางเดียวกัน (`prepare_images.py:28-29`) — สไลด์ 2 กับ 8 จึงโชว์ภาพเดียวกันสองครั้ง
- divergence React↔PowerPoint ที่เอกสารไว้แล้วสองจุด: `SlideFullImage variant="fade"` เป็น web-only และ `imageMode="full"` เป็น web-only สัญญา 1:1 ถือได้ **ตามจำนวน** แต่ไม่ถือ **ตามการเรนเดอร์** บน 2 ใน 16 — ควรระบุตรง ๆ ในข้อความสัญญา parity
- `.nct-quote__mark` × `blockquote` รายงานว่าทับกัน 30.4px แต่วัด ink จริงด้วย `TextMetrics` แล้วห่างกัน 57.9px — false positive ของการวัด line-box ไม่ใช่ข้อบกพร่อง
- `preview/*.png` ลงวันที่ก่อน commit ที่แก้ดีไซน์ทุกอัน แต่ `README.md:44` ยังเสนอว่าเป็น "ภาพ render จาก PowerPoint จริง" — คนที่รีวิวระบบผ่าน README เห็นเด็คก่อนแก้
- `web/src/assets.ts` ~1MB ของ data URI ส่งเข้าทุก consumer รวม mascot ที่ไม่มี layout ไหนวางได้

## Questions to Consider

1. ถ้าที่ปรึกษาสร้างสไลด์งบประมาณ, timeline, หรือ "สิ่งที่เราต้องการจากคุณภายในวันศุกร์" ด้วย 16 layout นี้ไม่ได้ — แล้ว inventory นี้เป็น inventory ของอะไร? เลข 16 มาจาก `.potx` มันเคยถูกอนุมานจาก "ข้อเสนอต้องเถียงอะไรบ้าง" หรือเปล่า?
2. `conventions.md` เรียกภาพจับมือว่า "templated-AI tell ที่ระบบนี้มีไว้เพื่อหลีกเลี่ยง" แล้วให้ข้อยกเว้นกับมันบนสไลด์ที่เดิมพันสูงที่สุด อันไหนจริง — กฎผิด หรือข้อยกเว้นผิด?
3. สี่สีที่ห่างกัน 1.31:1 ไม่ใช่ระบบรหัส มันคือพื้นผิว `category` เป็นชั้นความหมายจริงที่ต้องการสองสีที่แยกออก หรือเป็นของตกแต่งที่ควรลบทิ้งให้คอลัมน์ "หมวด" ทำงานที่มันทำอยู่แล้ว?
4. layout สว่างทุกใบว่างต่ำกว่า y≈560 ทุกสไลด์ ทุกภาพ กล่อง body 456px ที่ยึดบนเป็นจุดยืนเรื่อง white space หรือเป็นสิ่งที่เกิดขึ้นเมื่อพอร์ตเรขาคณิตจาก EMU placeholder ที่ PowerPoint จะ autofit ให้?
5. ระบบบังคับกฎที่สำคัญที่สุด — "ต้องบอกข้อสรุป" — ผ่าน type checker และมันได้ผล ทำไมเทคนิคนี้ถูกใช้ครั้งเดียว? เพดานของ `steps`, `items`, agenda เป็นร้อยแก้วที่ compiler ตรวจได้ และสองอันที่เป็น tuple อยู่แล้ว (`cards`) ไม่เคยพัง
