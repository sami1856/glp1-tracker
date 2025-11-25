# Phase 7 – Part 8  
Elisence Voice – Accessibility, Personalisation & Future Expansion Blueprint

این بخش «کد نیست»؛ فقط نقشه‌ی رسمی کارهایی است که بعداً باید بسازیم تا سیستم Voice واقعاً جهانی، قابل‌دسترسی و آماده‌ی فاز ۸ (Voice Assistant کامل + تماس صوتی/ویدئویی) باشد.

--------------------------------
1) هدف‌های Part 8
--------------------------------

1.1. کامل‌کردن دسترسی (Accessibility):  
امکان استفاده‌ی راحت از اپ برای کاربرانی که مشکل بینایی، حرکتی، یا خستگی شدید دارند؛ فقط با صدا و چند فرمان ساده‌ی عددی.

1.2. شخصی‌سازی هوشمند (Personalised Voice Hints):  
Elisa بتواند بر اساس زبان، بخش مورد علاقه و تاریخچه‌ی کاربر، پیشنهاد فرمان صوتی بدهد.

1.3. حریم خصوصی و لاگ‌برداری شفاف (Privacy & Logging):  
دقیقاً مشخص کنیم چه چیزی از Voice ذخیره می‌شود، کجا، برای چه مدت، و چطور کاربر می‌تواند Export / Delete بگیرد.

1.4. آماده‌سازی برای Voice در پس‌زمینه و فاز ۸:  
طراحی‌ طوری باشد که بعداً بتوانیم خیلی راحت:
- ویجت Voice کوچک  
- حالت always-on (با محدودیت‌های امنیتی)  
- و اتصال به سیستم تماس صوتی/ویدئویی را اضافه کنیم.

--------------------------------
2) Accessibility Voice Mode (Numbers Overlay)
--------------------------------

### 2.1. ایده‌ی اصلی

وقتی کاربر بگوید:  
- «فعال‌کردن حالت صوتی»  
- “Enable voice mode”  

اپ وارد **Voice Accessibility Mode** می‌شود:

- روی هر دکمه / کارت / تب اصلی، یک شماره کوچک ۱ تا ۹ (یا بیشتر) نشان داده می‌شود.
- کاربر می‌تواند بگوید:
  - «انتخاب ۱»
  - “Select 3”
- و اپ همان عنصر را کلیک کند.

این حالت مخصوص:
- سالمندان  
- افراد با لرزش دست  
- کاربران در حال رانندگی / حرکت  
- کاربران خسته که نمی‌خواهند اسکرول و کلیک زیاد انجام دهند.

### 2.2. طراحی UX

2.2.1. فعال‌سازی:

- فرمان‌های نمونه:
  - FA: «حالت صوتی را فعال کن»، «Voice Mode روشن»
  - EN: “Enable voice mode”, “Turn on voice navigation mode”
  - AR/TR/RO ورژن‌های معادل.

2.2.2. نمایش UI:

- در هر صفحه‌ی اصلی (Home, Profile, Women’s Health, Kids, Mental Health …)  
  عناصر مهم شماره می‌گیرند:
  - 1 → بخش پروفایل  
  - 2 → بخش زنان  
  - 3 → بخش کودکان  
  - 4 → رژیم/غذا  
  - 5 → دیابت  
  - 6 → Mental Health  
  - 7 → SOS / Contact  
  - 8 → Settings  
  - 9 → More…

- اعداد باید:
  - کنتراست بالا داشته باشند (برای نابینایی نسبی)  
  - در Theme شب/روز با رنگ مناسب نمایش داده شوند.  

2.2.3. فرمان‌های عددی:

- FA:
  - «انتخاب یک»، «شماره ۳»، «گزینه ۵»
- EN:
  - “Select 1”, “Option 5”, “Go to number 3”

Elisa تأیید می‌کند:
- «باشه، می‌برمت به گزینه‌ی ۳ 🌿»
- “Got it, taking you to option 3.”

2.2.4. خروج از حالت:

- FA: «حالت صوتی را خاموش کن»، «Voice Mode خاموش»
- EN: “Disable voice mode”, “Exit voice mode”

### 2.3. طراحی فنی (بدون کد، فقط قرارداد)

2.3.1. داده‌ی UI:

- برای هر صفحه، یک JSON چهارزبانه (EN/FA/AR/TR/RO) که بگوید:
  ```json
  {
    "screen": "home",
    "voice_mode_map": [
      {"number": 1, "target_route": "/v7/home/profile", "label_key": "my_profile"},
      {"number": 2, "target_route": "/v7/home/women_health", "label_key": "women_health"},
      ...
    ]
  }

  # Phase 7 – Future Tasks (Cross-Phase To-Do List)
**Elisence – Voice Navigation Layer (Long-Term Integration Plan)**  
این لیست «کارهایی است که در آینده و با پیشرفت فازهای دیگر» باید به فاز ۷ اضافه شود تا سیستم Voice همیشه کامل، به‌روز و هماهنگ با کل اپ بماند.

---

## 1) هماهنگی با فازهای جدید (Women / Kids / Mental / Diabetes / Diet / Air Quality / SOS)

### 1.1. اضافه‌کردن Intent برای هر فاز جدید  
هر زمانی یک فاز جدید ساخته شد (مثلاً Women’s Cycle Tracking یا Kids Vaccination)، باید:

- یک Intent اصلی برای ورود به فاز اضافه شود:
  - `go_women_cycle`
  - `go_kids_vaccine`
  - `go_air_quality`
  - `go_sos_page`
- و حتماً در پنج زبان (EN/FA/AR/TR/RO) Phrase تعریف کنیم.

### 1.2. اضافه‌کردن Intentهای درونی بخش‌ها  
هر فاز جدید چند بخش دارد. برای هر بخش مهم:

- Intent فرعی لازم داریم  
مثال:
- Women:
  - `go_pms_tracker`
  - `go_period_calendar`
  - `go_pregnancy_mode`
- Kids:
  - `go_growth_chart`
  - `go_immunization_calendar`
- Diabetes:
  - `go_bg_chart`
  - `go_medications_diabetes`
- Diet:
  - `go_meal_planner`
  - `go_calorie_scanner`
- Mental:
  - `go_cbt_exercises`
  - `go_meditation_room`

**هر صفحه جدید = یک Intent جدید برای Voice**

### 1.3. به‌روزرسانی Voice Navigation Map  
هر بار UI جدید ساخته شد باید:

- یک `voice_mode_map` جدید برای صفحه ساخته شود  
(برای Accessibility Voice Mode)
- شماره‌های صفحه (۱ تا ۹) دوباره تنظیم شوند.

---

## 2) هماهنگی با Phase 6 (Smart Input Engine)
Phase 6 باعث می‌شود کاربر بتواند چیزهایی مثل وزن، دوز دارو، خلق، قند خون و… را فقط با گفتن ثبت کند.

### 2.1. اضافه‌کردن Health Actions
برای هر قابلیت جدید باید در Voice این‌ها را اضافه کنیم:

- `log_bp` → ثبت فشار خون  
- `log_hr` → ثبت ضربان  
- `log_sleep_hours`  
- `log_stress_level`  
- `log_bg` → ثبت قند خون  
- `log_activity` → ثبت ورزش  

### 2.2. استانداردسازی JSON Passive Plan  
هر Action جدید باید خروجی استاندارد داشته باشد مثل:

```json
{
  "type": "health_action",
  "intent": "log_bg",
  "plan": {
    "value": 92,
    "unit": "mg/dl",
    "timestamp": "auto"
  }
}