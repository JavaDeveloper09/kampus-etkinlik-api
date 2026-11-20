import type { CampusEvent } from "../../types/campus-event";
import EventCard from "./EventCard";

interface EventListProps {
  events: CampusEvent[];
  emptyText?: string;
}

function EventList({ events, emptyText }: EventListProps) {
  if (events.length === 0) {
    return emptyText ? <p id="sonuc">{emptyText}</p> : null;
  }

  return (
    <div className="kartlar">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;