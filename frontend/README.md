Canlı: https://kampus-etkinlik-api-sprint5.vercel.app

# Kampüs Etkinlikleri · Sprint 5 (React Bileşenleri)

İbrahim Eren Yayla · 2416501088

Sprint 4'teki tek büyük `App.tsx` bileşenlere bölündü. Her bileşen kendi dosyasında, veriyi props ile alıyor, olayları callback ile App'e bildiriyor. State App'te duruyor. Ekran Sprint 4 ile birebir aynı.

Sprint 4: https://kampus-etkinlik-api-sprint4.vercel.app

## Çalıştırma

    npm install
    npm run dev      # geliştirme: http://localhost:5173
    npm run build    # tip kontrolü + dist/ klasörüne yayın sürümü
    npm run preview  # dist/ önizlemesi
    npm run lint     # Oxlint kod denetimi

## Bileşen ağacı

    App  (state: page, selectedId, searchText, category)
    ├── Header       title, text?, children
    │   └── Navigation   current, onNavigate
    ├── main
    │   ├── EventList    events, onShowDetail, emptyText?
    │   │   └── EventCard    event, onShowDetail
    │   ├── EventFilter  searchText, category, categories, onSearchChange, onCategoryChange
    │   ├── EventDetail  event, onBack, onEdit
    │   └── EventForm    onSubmit
    └── Footer       (props yok)

Veri props ile aşağı iner, olaylar callback ile yukarı çıkar. Arama metnine hem EventFilter hem EventList ihtiyaç duyduğu için state ortak üst bileşen olan App'te durur (lifting state).

## Bileşenler

| Dosya | Görevi |
|---|---|
| `src/App.tsx` | State, hesaplanan değerler, `go()`; hangi sayfada hangi bileşen |
| `src/components/layout/Header.tsx` | Kırmızı bant ve başlık; menüyü `children` olarak içine alır |
| `src/components/layout/Navigation.tsx` | Menü; tıklamayı `onNavigate` ile bildirir |
| `src/components/layout/Footer.tsx` | Ad, numara, yıl |
| `src/components/events/EventCard.tsx` | Tek kart; detay için `onShowDetail(id)` |
| `src/components/events/EventList.tsx` | Kart listesi, `key={event.id}`; boşsa mesaj |
| `src/components/events/EventFilter.tsx` | Arama ve kategori kutuları; değerler App'ten |
| `src/components/events/EventDetail.tsx` | Detay, afiş sadece varsa; `onBack`, `onEdit` |
| `src/components/forms/EventForm.tsx` | Ekle/Güncelle formu; gönderimi `onSubmit` ile bildirir |

## Diğer dosyalar

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
| `src/App.css` | Sprint 3'ün CSS'i (ton 8, system-ui) ve aktif menü stili. |
| `src/index.css` | Boş. |
| `src/types/campus-event.ts` | `CampusEvent` arayüzü ve `Category` union tipi. |
| `src/types/page.ts` | `PageName` tipi; Navigation ve App kullanır. |
| `src/data/events.ts` | 6 etkinlik, `CampusEvent[]` tipinde. |
| `src/utils/filter-events.ts` | Saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |
| `src/utils/format-date.ts` | Tarihi "12 Ekim 2026" biçimine çevirir; EventCard ve EventDetail kullanır. |