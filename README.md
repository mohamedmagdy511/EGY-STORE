# EGY STORE - Next.js Dashboard

نظام إدارة متجر إلكتروني مبني بـ Next.js App Router مع واجهة حديثة.

## الميزات

- ✅ Next.js 15 مع App Router
- ✅ React Components مع Hooks
- ✅ CSS Modules و Global Styles
- ✅ API Routes للـ backend
- ✅ MongoDB لقاعدة البيانات
- ✅ Socket.io للوقت الفعلي
- ✅ واجهة متجاوبة بالعربية
- ✅ نظام صلاحيات ومستخدمين

## متطلبات التشغيل

- Node.js >= 18.0.0
- MongoDB
- npm أو pnpm

## التثبيت والتشغيل

1. **تثبيت التبعيات:**
   ```bash
   npm install
   # أو
   pnpm install
   ```

2. **إعداد قاعدة البيانات:**
   - تأكد من تشغيل MongoDB
   - عدل ملف `.env` إذا لزم الأمر

3. **تشغيل التطبيق:**
   ```bash
   npm run dev
   ```

4. **فتح المتصفح:**
   - اذهب إلى `http://localhost:3001`

## البنية المعمارية

```
app/
├── layout.js          # Root layout
├── page.js            # Main page
├── globals.css        # Global styles
└── api/               # API routes

components/
├── Sidebar.js         # Navigation sidebar
├── Dashboard.js       # Dashboard component
└── ...

lib/
├── db.js              # Database connection
└── ...

models/
├── User.js            # User model
├── Order.js           # Order model
└── ...
```

## حساب المدير الافتراضي

- **البريد الإلكتروني:** mhamedmagdy053@gmail.com
- **كلمة المرور:** Eladwe511

## التحويل من HTML/CSS/JS

تم تحويل المشروع بالكامل من:
- HTML pages → React Components
- Vanilla JavaScript → React Hooks (useState, useEffect)
- DOM manipulation → React state management
- Inline CSS → CSS Modules & globals.css
- External APIs → Next.js API routes

## API Endpoints

### المصادقة
- `POST /api/register` - تسجيل مستخدم جديد
- `POST /api/login` - تسجيل الدخول

### إدارة المستخدمين (Admin Only)
- `GET /api/users` - جلب جميع المستخدمين
- `GET /api/pending-count` - عدد الطلبات المعلقة
- `PUT /api/users/:userId/approve` - الموافقة على مستخدم
- `PUT /api/users/:userId` - تحديث بيانات مستخدم

### الصحة
- `GET /api/health` - فحص حالة الخادم

## التقنيات المستخدمة

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Real-time:** Socket.io
- **Frontend:** Vanilla JavaScript, HTML, CSS
- **Charts:** Chart.js

## هيكل المشروع

```
├── models/           # نماذج قاعدة البيانات
├── controllers/      # متحكمات API
├── middleware/       # الوسائط المتوسطة
├── scripts/          # سكريبتات المساعدة
├── public/           # الملفات الثابتة والواجهة
├── server.js         # الخادم الرئيسي
├── .env              # متغيرات البيئة
└── package.json      # التبعيات
```

## الأمان

- تشفير كلمات المرور باستخدام bcrypt
- رموز JWT محمية
- التحقق من الصلاحيات
- حماية من الوصول غير المصرح به

## التطوير

للمساهمة في التطوير:

1. قم بعمل Fork للمشروع
2. أنشئ فرع للميزة الجديدة
3. ارفع التغييرات
4. أنشئ Pull Request

## الترخيص

هذا المشروع مفتوح المصدر تحت رخصة MIT.