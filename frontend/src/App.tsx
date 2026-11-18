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
import { formatDate } from "./utils/format-date";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";

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
          <article className="detay">
            {selected.image && (
              <figure>
                <img
                  src={selected.image}
                  alt={`${selected.title} etkinlik afişi`}
                />
                <figcaption>Şekil 1: {selected.title} afişi</figcaption>
              </figure>
            )}

            <div className="detay-bilgi">
              <dl className="kunye">
                <dt>Tarih</dt>
                <dd>
                  <time dateTime={`${selected.date}T${selected.time}`}>
                    {formatDate(selected.date)}, {selected.time}
                  </time>
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>

              <p>{selected.description}</p>

              <p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("update", selected.id);
                  }}
                >
                  Bu etkinliği güncelle
                </a>{" "}
                ·{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  ← Listeye dön
                </a>
              </p>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

            <form
              key={page}
              id="etkinlik-formu"
              noValidate
              onSubmit={(e) => e.preventDefault()}
            >
              <p>
                <label htmlFor="ad">Etkinlik Adı</label>
                <input
                  type="text"
                  id="ad"
                  name="ad"
                  maxLength={80}
                  placeholder="Örn. Temel Algoritma Öğrenimi"
                />
              </p>

              <p>
                <label htmlFor="kategori">Kategori</label>
                <select id="kategori" name="kategori" defaultValue="">
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </p>

              <p>
                <label htmlFor="tarih">Tarih</label>
                <input type="date" id="tarih" name="tarih" />
              </p>

              <p>
                <label htmlFor="saat">Saat</label>
                <input type="time" id="saat" name="saat" />
              </p>

              <p>
                <label htmlFor="yer">Yer</label>
                <input
                  type="text"
                  id="yer"
                  name="yer"
                  placeholder="Örn. B Blok Konferans Salonu"
                />
              </p>

              <p>
                <label htmlFor="kontenjan">Kontenjan (isteğe bağlı)</label>
                <input
                  type="number"
                  id="kontenjan"
                  name="kontenjan"
                  min={1}
                  max={1000}
                />
              </p>

              <p>
                <label htmlFor="aciklama">Açıklama</label>
                <textarea id="aciklama" name="aciklama" rows={4} />
              </p>

              <button type="submit">Kaydet</button>
            </form>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;