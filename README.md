# Kampüs Etkinlik

- `frontend/`: React + Vite arayüzü
- `backend/`: Express REST API (çalıştırma ve REST sözleşmesi için `backend/README.md`)

## Sprint 1: HTML

Sadece HTML ile yazılmış beş sayfa: `sprint1/` klasöründe.

Canlı adres: https://kampus-etkinlik-api-sprint1.vercel.app

## Sprint 2: CSS ve Responsive

Sprint 1'deki HTML'e CSS giydirildi: `sprint2/` klasöründe, stil dosyası `sprint2/css/2416501088.css`.

- Renk ve font öğrenci numarasından: ton 8, `system-ui`
- Tablolar yerine grid ile kartlar; telefonda tek sütun
- Formlarda hatalı alan kırmızı

Canlı adres: https://kampus-etkinlik-api-sprint2.vercel.app

## Sprint 3: JavaScript ve DOM

Sayfalar tek bir veri dosyasından üretiliyor: `sprint3/` klasöründe.

- `js/data.js`: 6 etkinlik
- `js/event-list.js`: kartları üretir; ana sayfada yaklaşan 2 etkinlik, liste sayfasında arama ve kategori filtresi
- `js/event-detail.js`: `?id=` ile doğru etkinliği açar, bulunamazsa hata kutusu
- `js/event-form.js`: ekleme ve güncelleme formunun doğrulaması; başarıda oluşan nesneyi gösterir

Canlı adres: https://kampus-etkinlik-api-sprint3.vercel.app

## Sprint 4: React ve TypeScript

Sprint 3'teki site Vite + React + TypeScript ile yeniden yazıldı: `frontend/` klasöründe.

- `src/types/campus-event.ts`: `CampusEvent` arayüzü ve 4 değerli `Category` tipi
- `src/data/events.ts`: 6 etkinlik, `CampusEvent[]` tipinde
- `src/utils/filter-events.ts`: saf fonksiyonlar; arama, kategori filtresi, id ile bulma
- `src/App.tsx`: 5 sayfanın hepsi; sayfa geçişi ve arama `useState` ile, sekme başlığı `useEffect` ile
- `src/App.css`: Sprint 3'ün CSS'i; afiş `public/beyin.jpg`

Canlı adres: https://kampus-etkinlik-api-sprint4.vercel.app