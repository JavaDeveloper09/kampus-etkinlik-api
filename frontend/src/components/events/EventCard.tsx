import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
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
          onShowDetail(event.id);
        }}
      >
        Detay →
      </a>
    </article>
  );
}

export default EventCard;