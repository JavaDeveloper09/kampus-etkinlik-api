import { useState } from "react";
import "./App.css";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import { searchEvents, filterByCategory } from "./utils/filter-events";

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

const categories = [...new Set(events.map((e) => e.category))];

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
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const title = titles[page];

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filtered = filterByCategory(searchEvents(events, searchText), category);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p>
          {event.category} ·{" "}
          <time dateTime={event.date}>{formatDate(event.date)}</time>,{" "}
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

        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="algoritma, okçuluk..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p id="sonuc">
              {filtered.length === 0
                ? "Aramana uyan etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="kartlar">{filtered.map(renderCard)}</section>
          </>
        )}

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