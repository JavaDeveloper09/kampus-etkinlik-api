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

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const kontenjan = fd.get("kontenjan");

    const data = {
      id: `event-${Date.now()}`,
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

    mesaj.innerHTML = `
      <div class="basari-kutusu">
        <p>Etkinlik oluşturuldu (henüz kaydedilmiyor).</p>
        <pre>${JSON.stringify(data, null, 2)}</pre>
      </div>
    `;
  });
}