import type { CampusEvent, Category } from "../types/campus-event";

// Başlık veya açıklamada metin arar. Boş metin → hepsi.
export function searchEvents(
  list: CampusEvent[],
  text: string,
): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  if (q === "") return list;

  return list.filter(
    (e) =>
      e.title.toLocaleLowerCase("tr-TR").includes(q) ||
      e.description.toLocaleLowerCase("tr-TR").includes(q),
  );
}

// "" ise hepsi, değilse sadece o kategori.
export function filterByCategory(
  list: CampusEvent[],
  category: Category | "",
): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

// id ile tek etkinlik; yoksa undefined.
export function findEventById(
  list: CampusEvent[],
  id: string,
): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}