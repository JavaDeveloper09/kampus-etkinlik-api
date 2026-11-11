# Kampüs Etkinlik API

Express ile yazılmış REST API. Veriler şimdilik bellekte tutulur.

## Çalıştırma

    npm install
    npm run dev

Sunucu `http://localhost:3000` adresinde açılır.

## Ortam değişkenleri

`.env.example` dosyasını `.env` olarak kopyalayıp doldurun.

| Değişken | Açıklama | Varsayılan |
|---|---|---|
| PORT | Sunucunun dinlediği port | 3000 |

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /health | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | /events | Listeyi getir | 200 | — | Sprint 7 |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Sprint 7 |
| POST | /events | Yeni etkinlik | 201 | 400 | Sprint 7 |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

`GET /events` isteğe bağlı `?category=` filtresi alır.

Bütün hatalar aynı biçimde döner:

    { "error": { "message": "Event not found" } }