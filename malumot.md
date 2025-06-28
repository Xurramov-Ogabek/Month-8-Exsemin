**Online Courses Backend**
NestJS asosida yaratilgan Online Kurslarni Boshqarish Backend API. Bu tizim kurslar, modullar, darslar, topshiriqlar va natijalarni boshqarish imkonini beradi. Loyihada JWT autentifikatsiya, role-based access, ma’lumotlar bilan ishlash uchun TypeORM, va PostgreSQL ma’lumotlar bazasi ishlatilgan.

**Texnologiyalar**
NestJS – Backend arxitektura

TypeORM – ORM (PostgreSQL bilan ishlash)

PostgreSQL – Ma’lumotlar bazasi

JWT – Token asosidagi autentifikatsiya

Class-validator – DTO validatsiyasi

@nestjs/config – .env bilan ishlash

**O‘rnatiladigan paketlar**
npm install
Asosiy ishlatilgan paketlar:
@nestjs/common
@nestjs/core
@nestjs/typeorm
@nestjs/jwt
@nestjs/passport
passport-jwt
bcrypt
dotenv
class-validator
class-transformer
pg
**Sozlash (Environment)**
.env fayliga quyidagilarni yozing:

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=Yasgirin
DATABASE_NAME=coursesdb

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h
**Arxitektura**
src/
│
├── auth/              → Ro‘yxatdan o‘tish, login va tokenlar
├── users/             → Foydalanuvchilar CRUD
├── courses/           → Kurslar CRUD
├── modules/           → Kurs modullari
├── lessons/           → Darslar
├── assignments/       → Topshiriqlar (assignment)
├── enrollment/        → Kursga yozilish
├── results/           → Foydalanuvchining natijalari
└── main.ts            → Entry point

**Autentifikatsiya**
JWT token quyidagi API orqali olinadi:

POST /auth/register – Ro‘yxatdan o‘tish

POST /auth/login – Login

POST /auth/refresh – Refresh token

Barcha protected routelarga kirishda Authorization: Bearer <access_token> sarlavhasi yuboriladi.

**API Endpointlar (Ba'zilari)**
Method	Endpoint	Tavsif
POST	/auth/register	Foydalanuvchi ro'yxatdan o'tadi
POST	/courses	Yangi kurs qo‘shish
GET	/courses	Barcha kurslarni olish
POST	/courses/:id/enroll	Kursga yozilish
POST	/modules/:id/assignment	Topshiriq yaratish
POST	/results	Natijani yuborish (assignment ga)
GET	/results	O‘z natijalarini ko‘rish

**Test qilish (Postman)**
Avval /auth/register yoki /auth/login orqali token oling.

Keyin kerakli endpointlarga Bearer Token bilan murojaat qiling.

CRUD operatsiyalarini POSTMAN orqali sinab ko‘ring.

**Vazifalarning bajarilgan holati**
 JWT autentifikatsiya ishladi

 Foydalanuvchini ro‘yxatdan o‘tkazish va login

 Kurslar va modullarni yaratish

 Darslar va topshiriqlarni boshqarish

 Har bir foydalanuvchi faqat o‘z natijalarini ko‘radi

 Guard va validatsiyalar ishlaydi

 POSTMAN orqali to‘liq test qilindi

**Muallif**
Og'abek Xurramov
Telegram = **@Legenda3403**