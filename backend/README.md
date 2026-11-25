# Kampüs Etkinlik API

Express ile yazılmış REST API. Veriler MongoDB'de tutulur (Mongoose ile). Sunucu kapanıp açılsa da kayıtlar durur. Sprint 9 ile tam CRUD: listeleme, arama, ekleme, güncelleme ve silme.

## Çalıştırma

    npm install
    npm run seed     # veritabanını 6 örnek etkinlikle doldurur (2'si geçmiş tarihli)
    npm run dev      # sadece src/ klasörünü izler

Sunucu `http://localhost:3000` adresinde açılır. Önce MongoDB'ye bağlanır; bağlanamazsa sunucu açılmaz.

`npm run seed` önce `events` collection'ını boşaltır, sonra 6 etkinlik ekler. Kaç kez çalıştırılırsa çalıştırılsın sonuç 6 kayıttır.

## Ortam değişkenleri

`.env.example` dosyasını `.env` olarak kopyalayıp doldurun. Gerçek bağlantı adresi sadece `.env` içinde durur; `.env` GitHub'a gönderilmez.

| Değişken | Açıklama | Örnek |
|---|---|---|
| PORT | Sunucunun dinlediği port | 3000 |
| MONGODB_URI | MongoDB bağlantı adresi (sonu `/kampus`) | mongodb://127.0.0.1:27017/kampus |

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /health | Sunucu ayakta mı | 200 | — | çalışıyor |
| GET | /events | Liste (tarihe göre); `?search=` ve `?category=` | 200 | — | çalışıyor |
| GET | /events/upcoming | Bugün ve sonrası, en yakın önce | 200 | — | çalışıyor |
| GET | /events/:id | Tek etkinlik (`_id` ile) | 200 | 404 | çalışıyor |
| POST | /events | Yeni etkinlik | 201 | 400 | çalışıyor |
| PATCH | /events/:id | Sadece gönderilen alanları güncelle | 200, güncel kayıt | 400, 404 | çalışıyor |
| DELETE | /events/:id | Sil | 204, gövde yok | 404 | çalışıyor |

- **Tarih:** API'de her yerde `"GG-AA-YYYY"` (`"15-10-2026"`). Veritabanında gerçek `Date` olarak tutulur, böylece sıralama ve `/upcoming` doğru çalışır. `"2026-10-15"` ya da `"31-02-2026"` gibi bir tarih 400 döner.
- **Arama:** `?search=` başlıkta arar, büyük-küçük harf fark etmez. `( * ?` gibi işaretler aramayı bozmaz.
- **Geçersiz ya da olmayan id** her yerde 404 döner.
- **PATCH:** boş body, `_id` / `createdAt` / `updatedAt` / `__v` değiştirme ve schema kurallarına uymayan değer (örn. `category: "Parti"`) 400 döner.
- Beklenmeyen bir hata 500 döner; ayrıntı sadece sunucu terminaline yazılır.

Bütün hatalar aynı biçimde döner:

    { "error": { "message": "Event not found" } }

## Klasörler

| Dosya | Görevi |
|---|---|
| `src/server.js` | `.env` okur, veritabanına bağlanır, sonra sunucuyu açar |
| `src/app.js` | Express uygulaması, `/health`, 404 ve hata middleware'i |
| `src/config/database.js` | `MONGODB_URI` ile bağlantı |
| `src/models/event-model.js` | Event schema'sı; `date` alanı Date, getter/setter ile GG-AA-YYYY |
| `src/utils/date.js` | `parseDate`, `formatDate`, `todayStart` |
| `src/data/seed-events.js` | 6 örnek etkinlik |
| `src/seed.js` | `npm run seed` ile çalışan doldurma programı |
| `src/routes/event-routes.js` | `/events` adresleri; `/upcoming`, `/:id`'den önce |
| `src/controllers/event-controller.js` | `find`, `findById`, `create`, `findByIdAndUpdate`, `findByIdAndDelete` |
| `requests/kampus-api.json` | Kendi Postman koleksiyonum (9 test) |
| `requests/run-results.json` | Ders test koleksiyonunun Newman sonucu: 18 istek, 45 test, 0 hata |

## Test

Backend açıkken:

    newman run https://webdersi.vercel.app/test.json
    newman run requests/kampus-api.json