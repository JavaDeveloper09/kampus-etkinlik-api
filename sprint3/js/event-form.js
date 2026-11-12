import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");

const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];

function hataGoster(alanAdi, metin) {
  const alan = form.elements[alanAdi];
  const hataYeri = document.querySelector(`#${alanAdi}-hata`);

  if (metin) {
    alan.setAttribute("aria-invalid", "true");
    hataYeri.textContent = metin;
  } else {
    alan.removeAttribute("aria-invalid");
    hataYeri.textContent = "";
  }
}

function dogrula(data) {
  const errors = {};

  if (data.title.length < 3) errors.ad = "En az 3 karakter olmalı.";
  if (!data.category) errors.kategori = "Bir kategori seç.";
  if (!data.date) errors.tarih = "Tarih seç.";
  if (!data.time) errors.saat = "Saat seç.";
  if (!data.location) errors.yer = "Yer yaz.";
  if (data.capacity !== null && (data.capacity < 1 || data.capacity > 1000)) {
    errors.kontenjan = "1 ile 1000 arasında olmalı.";
  }

  return errors;
}

// Güncelleme sayfasıysa: adresteki id ile etkinliği bul ve formu doldur
const guncellemeModu = form && form.dataset.mode === "guncelle";
let duzenlenen = null;

if (guncellemeModu) {
  const id = new URLSearchParams(location.search).get("id");
  duzenlenen = events.find((e) => e.id === id);

  if (duzenlenen) {
    form.elements.ad.value = duzenlenen.title;
    form.elements.kategori.value = duzenlenen.category;
    form.elements.tarih.value = duzenlenen.date;
    form.elements.saat.value = duzenlenen.time;
    form.elements.yer.value = duzenlenen.location;
    form.elements.kontenjan.value = duzenlenen.capacity ?? "";
    form.elements.aciklama.value = duzenlenen.description;
  } else {
    form.outerHTML = `
      <div class="hata-kutusu">
        <p>Güncellenecek etkinlik bulunamadı. Güncelleme sayfasına bir etkinliğin detayından gelmelisin.</p>
        <a href="etkinlikler.html">Etkinliklere git →</a>
      </div>
    `;
  }
}

const formKullanilabilir = form && (!guncellemeModu || duzenlenen);

if (formKullanilabilir) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const kontenjan = fd.get("kontenjan");

    const data = {
      id: duzenlenen ? duzenlenen.id : `event-${Date.now()}`,
      title: fd.get("ad").trim(),
      category: fd.get("kategori"),
      date: fd.get("tarih"),
      time: fd.get("saat"),
      location: fd.get("yer").trim(),
      description: fd.get("aciklama").trim(),
      capacity: kontenjan === "" ? null : Number(kontenjan),
    };

    const errors = dogrula(data);

    alanlar.forEach((alan) => hataGoster(alan, errors[alan] || ""));

    if (Object.keys(errors).length > 0) {
      mesaj.innerHTML = `<div class="hata-kutusu">Formda hatalı alanlar var.</div>`;
      return;
    }

    const baslik = duzenlenen
      ? "Etkinlik güncellendi (henüz kaydedilmiyor)."
      : "Etkinlik oluşturuldu (henüz kaydedilmiyor).";

    mesaj.innerHTML = `
      <div class="basari-kutusu">
        <p>${baslik}</p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </div>
    `;
  });
}