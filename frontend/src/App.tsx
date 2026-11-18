import { useEffect, useState } from "react";
import "./App.css";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const titles: Record<PageName, string> = {
  home: "Kampüs Etkinlikleri",
  events: "Tüm Etkinlikler",
  detail: "Etkinlik bulunamadı",
  add: "Etkinlik Ekle",
  update: "Etkinlik Güncelle",
};

const categories = [...new Set(events.map((e) => e.category))];

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const title =
    page === "detail" && selected ? selected.title : titles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <Header title={title}>
        <Navigation current={page} onNavigate={go} />
      </Header>

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
              <EventList
                events={upcoming}
                onShowDetail={(id) => go("detail", id)}
              />
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
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />

            {filtered.length > 0 && (
              <p id="sonuc">{filtered.length} etkinlik listeleniyor.</p>
            )}

            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramana uyan etkinlik bulunamadı."
            />
          </>
        )}

        {page === "detail" && !selected && (
          <div className="hata-kutusu">
            <p>Aradığın etkinlik bulunamadı.</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              ← Listeye dön
            </a>
          </div>
        )}

        {page === "detail" && selected && (
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {(page === "add" || page === "update") && (
          <EventForm key={page} onSubmit={() => window.scrollTo(0, 0)} />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;