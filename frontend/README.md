# Kampüs Etkinlikleri

Fakültedeki seminer, atölye ve söyleşileri listeleyen React + TypeScript + Vite uygulaması.
Sprint 6 ve vize teslimi: React Router, Context, controlled form, ekle / güncelle / sil.

**Öğrenci:** Orhan Öztekin · 2416501017

## Canlı adres

https://orhanoztekin-frontend.vercel.app

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:5173` adresini açın.

## Route listesi

| Adres | Sayfa |
|---|---|
| `/` | HomePage |
| `/events` | EventsPage |
| `/events/:id` | EventDetailPage |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/forgot-password` | ForgotPasswordPage |
| `/admin` | AdminPage |
| `/admin/new` | AddEventPage |
| `/admin/:id/edit` | EditEventPage |
| `*` | NotFoundPage |

## Klasör yapısı

```
src/
  components/
    layout/   Header Navigation Footer
    events/   EventCard EventList EventFilter EventDetail
    forms/    EventForm
  context/    EventsContext.tsx
  pages/      HomePage EventsPage EventDetailPage
              AdminPage AddEventPage EditEventPage
              LoginPage RegisterPage ForgotPasswordPage
              NotFoundPage
  data/       events.ts
  types/      campus-event.ts
  utils/      filter-events format-date validate-event
  App.tsx App.css index.css main.tsx
```

Veriler şimdilik tarayıcı belleğinde tutulur; sayfa yenilenince başlangıç listesine döner.
