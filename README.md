# ZAC Corporate Services — Website

Next.js 15 + TypeScript + Tailwind CSS + Framer Motion + next-intl (ar/en)

## تشغيل محلي
```bash
npm install
npm run dev
```
افتح http://localhost:3000 (هيحولك تلقائي لـ /ar)

## رفع على GitHub
```bash
git init
git add .
git commit -m "Initial homepage"
git branch -M main
git remote add origin <رابط الريبو بتاعك>
git push -u origin main
```

## النشر على Vercel
1. ادخل vercel.com وسجل دخول بحساب GitHub
2. "Add New Project" → اختر الريبو
3. أضف Environment Variables: `RESEND_API_KEY` و `CONTACT_EMAIL_TO`
4. Deploy

## ملاحظات
- الصفحة الرئيسية فقط جاهزة دلوقتي. باقي الصفحات (about, services, faq, contact) لسه placeholders في الروابط.
- استبدل `REPLACE_WITH_CLIENT_EMAIL` في `src/app/api/contact/route.ts` بإيميل العميل الحقيقي.
- الأرقام في قسم Stats تقريبية — لازم تتأكد من العميل.
