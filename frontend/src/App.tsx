import { useState } from "react";
import "./App.css";
import type { CampusEvent } from "./types/campus-event";
import { events } from "./data/events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

const titles: Record<PageName, string> = {
  home: "Kampüs Etkinlikleri",
  events: "Tüm Etkinlikler",
  detail: "Etkinlik Detayı",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle",
};

function formatDate(isoDate: string): string {
  return new Date(isoDate + "T00:00").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const title = titles[page];

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p>
          {event.category} · <time dateTime={event.date}>{formatDate(event.date)}</time>,{" "}
          {event.time} · {event.location}
        </p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detay →
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
        <nav>
          {menu.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <section>
              <h2>Hakkında</h2>
              <p>
                Fakültemizdeki seminer, atölye, söyleşi ve yarışmaları tek yerden
                takip edebileceğin uygulama.
              </p>
            </section>

            <section>
              <h2>Yaklaşan Etkinlikler</h2>
              <div className="kartlar">{upcoming.map(renderCard)}</div>
              <p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  Tüm etkinlikleri gör →
                </a>
              </p>
            </section>
          </>
        )}
        {page === "events" && <p>Etkinlik listesi burada</p>}
        {page === "detail" && <p>Detay burada: {selectedId}</p>}
        {(page === "add" || page === "update") && <p>Form burada</p>}
      </main>

      <footer>
        <p>İbrahim Eren Yayla · 2416501088 · 2026</p>
      </footer>
    </>
  );
}

export default App;