Canlı: https://kampus-etkinlik-api-sprint4.vercel.app

# Kampüs Etkinlikleri · Sprint 4 (React + TypeScript)

İbrahim Eren Yayla · 2416501088

Sprint 3'teki 5 sayfalık site Vite, React ve TypeScript ile yeniden yazıldı. Sayfa geçişi Router yerine state ile yapılıyor.

## Çalıştırma

    npm install
    npm run dev      # geliştirme: http://localhost:5173
    npm run build    # tip kontrolü + dist/ klasörüne yayın sürümü
    npm run preview  # dist/ önizlemesi

## Dosyalar

| Dosya | Görevi |
|---|---|
| `package.json` | Proje adı, komutlar (dev, build, preview, lint) ve paket listesi. |
| `package-lock.json` | Yüklenen paketlerin tam sürümleri; her bilgisayarda aynı kurulum. |
| `node_modules/` | İndirilen paketler; GitHub'a gönderilmez. |
| `tsconfig*.json` | TypeScript derleyici ayarları. |
| `vite.config.ts` | Vite ayarları ve React eklentisi. |
| `.oxlintrc.json` | Oxlint kod denetimi kuralları. |
| `index.html` | Tek HTML dosyası; React'in çizdiği boş `div#root` burada. |
| `public/` | Olduğu gibi kopyalanan dosyalar: afiş (`beyin.jpg`) ve favicon. |
| `src/main.tsx` | React'i başlatır, `App` bileşenini `#root` içine çizer. |
| `src/App.tsx` | 5 sayfanın hepsi; `page` ve `selectedId` state'iyle sayfa değişir. |
| `src/App.css` | Sprint 3'ün CSS'i (ton 8, system-ui) ve aktif menü stili. |
| `src/index.css` | Bu sprintte boş. |
| `src/types/campus-event.ts` | `CampusEvent` arayüzü ve `Category` union tipi. |
| `src/data/events.ts` | 6 etkinlik, `CampusEvent[]` tipinde. |
| `src/utils/filter-events.ts` | Saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |