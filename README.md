# Italiano Bari — public website

Customers ke liye: menu, loyalty card, join aur rewards. Staff ka koi hissa is project mein nahi.

- Pages: `/` (menu), `/menu`, `/?view=card`, `/?view=rewards`, `/?view=visits`, `/?view=how`, `/?join=1`
- API: `/api/member` (customer login), `/api/health`
- Env: `DATABASE_URL`, `DATABASE_SSL` (dekhein `.env.example`)
- Dashboard ke saath **wahi database** use karein. Poori guide ke liye ek folder upar `README.md` dekhein.

```bash
npm install
npm run build
npm start
```
