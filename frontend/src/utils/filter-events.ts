import type { CampusEvent, Category } from "../types/campus-event";

// Başlık, açıklama ve yer içinde arar (büyük/küçük harf duyarsız)
export function searchEvents(events: CampusEvent[], text: string): CampusEvent[] {
  const query = text.trim().toLocaleLowerCase("tr");
  if (query === "") return events;
  return events.filter((e) =>
    [e.title, e.description, e.location]
      .some((field) => field.toLocaleLowerCase("tr").includes(query)),
  );
}

// Kategori "" ise hepsi döner
export function filterByCategory(events: CampusEvent[], category: Category | ""): CampusEvent[] {
  if (category === "") return events;
  return events.filter((e) => e.category === category);
}

export function findEventById(events: CampusEvent[], id: string): CampusEvent | undefined {
  return events.find((e) => e.id === id);
}
