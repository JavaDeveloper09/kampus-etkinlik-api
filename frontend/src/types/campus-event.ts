export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string; // YYYY-AA-GG, örn. "2026-10-12"
  time: string; // SS:DD, örn. "14:00"
  location: string;
  capacity: number;
  description: string;
  image?: string; // isteğe bağlı: afiş yolu, örn. "/beyin.jpg"
}