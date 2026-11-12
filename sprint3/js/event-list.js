import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");

function formatDate(isoDate) {
  const date = new Date(isoDate + "T00:00");
  return date.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function createCard(event) {
  return `
    <article class="kart">
      <h3>${event.title}</h3>
      <p>${event.category} · <time datetime="${event.date}">${formatDate(event.date)}</time> · ${event.location}</p>
      <a href="etkinlik-detay.html?id=${event.id}">Detay →</a>
    </article>
  `;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

render(events);