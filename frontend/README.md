Canlı: https://ibrahimerenyayla-frontend2.vercel.app

# Kampüs Etkinlikleri · Sprint 6 (Router, Context, Yönetim)

İbrahim Eren Yayla · 2416501088

Sprint 5'teki tek sayfalık uygulama React Router ile gerçek adreslere kavuştu. Etkinlik listesi ve ekle / güncelle / sil fonksiyonları EventsContext'te duruyor; bütün sayfalar aynı listeyi okuyor. Yönetim panelinde tablo, onaylı silme ve telefonda kart görünümü var. Etkinlik formu, giriş, kayıt ve şifremi unuttum sayfaları doğrulama yapıyor.

Not: Veri bellekte tutulur; sayfa yenilenince başlangıç listesine döner. Kalıcılık backend bağlanınca gelecek.

## Kurulum

    npm install
    npm run dev      # geliştirme: http://localhost:5173
    npm run build    # tip kontrolü + dist/ klasörüne yayın sürümü
    npm run preview  # dist/ önizlemesi
    npm run lint     # Oxlint

## Route listesi

| Adres | Sayfa | İçerik |
|---|---|---|
| `/` | HomePage | Hakkında, yaklaşan 2 etkinlik |
| `/events` | EventsPage | Arama, kategori filtresi, kartlar |
| `/events/:id` | EventDetailPage | Etkinlik detayı (örn. `/events/event-2`) |
| `/login` | LoginPage | E-posta ve şifre doğrulaması |
| `/register` | RegisterPage | Ad soyad, e-posta, şifre ve şifre tekrarı |
| `/forgot-password` | ForgotPasswordPage | E-posta ile bağlantı (demo) |
| `/admin` | AdminPage | Etkinlik tablosu, Düzenle, onaylı Sil |
| `/admin/new` | AddEventPage | Yeni etkinlik formu |
| `/admin/:id/edit` | EditEventPage | Dolu form ile güncelleme |
| `*` | NotFoundPage | Sayfa bulunamadı |

## Klasör yapısı

    src/
      components/
        layout/   Header Navigation Footer
        events/   EventCard EventList EventFilter EventDetail
        forms/    EventForm
      context/    EventsContext.tsx   (events, addEvent, updateEvent, deleteEvent)
      pages/      10 sayfa
      data/       events.ts           (başlangıç listesi, 6 etkinlik)
      types/      campus-event.ts     (CampusEvent, EventFormData, EventFormErrors)
      utils/      filter-events.ts  format-date.ts  validate-event.ts
      App.tsx     Header, Routes, Footer
      main.tsx    BrowserRouter + EventsProvider
      App.css     Sprint 3 CSS'i + tablo ve buton stilleri

`vercel.json`: Vercel'de her adres `index.html`'e yönlenir; `/admin` gibi bir sayfada yenileme yapınca 404 olmaz.

## Önceki sprintler

- Sprint 4: https://kampus-etkinlik-api-sprint4.vercel.app
- Sprint 5: https://kampus-etkinlik-api-sprint5.vercel.app