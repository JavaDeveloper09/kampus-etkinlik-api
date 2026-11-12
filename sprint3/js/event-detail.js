import { events } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("#sayfa-basligi");

function formatDate(isoDate) {
  const date = new Date(isoDate + "T00:00");
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik bulunamadı · Kampüs Etkinlikleri";
  baslik.textContent = "Etkinlik bulunamadı";
  container.innerHTML = `
    <div class="hata-kutusu">
      <p>Aradığın etkinlik bulunamadı. Adres hatalı olabilir.</p>
      <a href="etkinlikler.html">← Listeye dön</a>
    </div>
  `;
} else {
  document.title = `${event.title} · Kampüs Etkinlikleri`;
  baslik.textContent = event.title;
  container.innerHTML = `
    <article class="detay">
      <figure>
        <img src="beyin.jpg" alt="${event.title} etkinlik afişi">
        <figcaption>Şekil 1: ${event.title} afişi</figcaption>
      </figure>

      <div class="detay-bilgi">
        <dl class="kunye">
          <dt>Tarih</dt>
          <dd><time datetime="${event.date}T${event.time}">${formatDate(event.date)}, ${event.time}</time></dd>
          <dt>Yer</dt>
          <dd>${event.location}</dd>
          <dt>Kategori</dt>
          <dd>${event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>${event.capacity}</dd>
        </dl>

        <p>${event.description}</p>

        <p>
          <a href="etkinlik-guncelle.html?id=${event.id}">Bu etkinliği güncelle</a> ·
          <a href="etkinlikler.html">← Listeye dön</a>
        </p>
      </div>
    </article>
  `;
}