import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface Props {
  events: CampusEvent[];
  emptyText?: string;
}

function EventList({ events, emptyText = "Gösterilecek etkinlik yok." }: Props) {
  if (events.length === 0) {
    return <p className="bos-mesaj">{emptyText}</p>;
  }

  return (
    <div className="kart-listesi">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;
