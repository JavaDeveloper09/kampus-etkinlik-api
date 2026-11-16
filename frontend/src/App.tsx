import { useState } from "react";
import "./App.css";

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

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const title = titles[page];

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
        {page === "home" && <p>Ana sayfa burada</p>}
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