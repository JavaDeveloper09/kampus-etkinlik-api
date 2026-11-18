# Kampüs Etkinlik API

Express ile yazılmış REST API. Veriler MongoDB'de tutulur (Mongoose ile). Sunucu kapanıp açılsa da kayıtlar durur.

## Çalıştırma

    npm install
    npm run seed     # veritabanını 6 örnek etkinlikle doldurur
    npm run dev

Sunucu `http://localhost:3000` adresinde açılır. Önce MongoDB'ye bağlanır; bağlanamazsa sunucu açılmaz.

`npm run seed` önce `events` collection'ını boşaltır, sonra 6 etkinlik ekler. Kaç kez çalıştırılırsa çalıştırılsın sonuç 6 kayıttır.

## Ortam değişkenleri

`.env.example` dosyasını `.env` olarak kopyalayıp doldurun. Gerçek bağlantı adresi sadece `.env` içinde durur; `.env` GitHub'a gönderilmez.

| Değişken | Açıklama | Örnek |
|---|---|---|
| PORT | Sunucunun dinlediği port | 3000 |
| MONGODB_URI | MongoDB bağlantı adresi (sonu `/kampus`) | mongodb://127.0.0.1:27017/kampus |

## Klasörler

| Dosya | Görevi |
|---|---|
| `src/server.js` | `.env` okur, veritabanına bağlanır, sonra sunucuyu açar |
| `src/app.js` | Express uygulaması, `/health`, 404 ve hata middleware'i |
| `src/config/database.js` | `MONGODB_URI` ile bağlantı |
| `src/models/event-model.js` | Event schema'sı ve modeli |
| `src/data/seed-events.js` | 6 örnek etkinlik (id alanı yok, `_id` MongoDB'den) |
| `src/seed.js` | `npm run seed` ile çalışan doldurma programı |
| `src/routes/event-routes.js` | `/events` adresleri |
| `src/controllers/event-controller.js` | `find`, `findById`, `create` |
| `requests/kampus-api.json` | Postman koleksiyonu |

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /health | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | /events | Listeyi getir (tarihe göre) | 200 | — | Sprint 8 |
| GET | /events/:id | Tek etkinlik (`_id` ile) | 200 | 404 | Sprint 8 |
| POST | /events | Yeni etkinlik | 201 | 400 | Sprint 8 |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

`GET /events` isteğe bağlı `?category=` filtresi alır.

- `/events/:id`: biçimi geçersiz id (`yok`) ve bulunamayan id ikisi de 404 döner.
- `POST /events`: kurallar schema'da; `title`, `category`, `date` zorunlu, `title` en az 3 karakter, `category` Seminer / Atölye / Söyleşi / Yarışma. Kurala uymayan veri 400 döner.
- Beklenmeyen bir hata 500 döner; ayrıntı sadece sunucu terminaline yazılır.

Bütün hatalar aynı biçimde döner:

    { "error": { "message": "Event not found" } }