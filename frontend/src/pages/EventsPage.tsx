import { useState } from "react";
import type { Category } from "../types/campus-event";
import { useEvents } from "../context/EventsContext";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <h2>Tüm Etkinlikler</h2>

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
        emptyText="Aramana uyan etkinlik bulunamadı."
      />
    </>
  );
}

export default EventsPage;