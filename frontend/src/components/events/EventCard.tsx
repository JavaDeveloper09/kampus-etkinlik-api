import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface Props {
  event: CampusEvent;
}

function EventCard({ event }: Props) {
  return (
    <article className="kart">
      <span className="etiket">{event.category}</span>
      <h3>{event.title}</h3>
      <p className="kart-bilgi">
        {formatDate(event.date)}, {event.time} · {event.location}
      </p>
      <p>{event.description}</p>
      <Link className="kart-link" to={`/events/${event.id}`}>
        Detayları gör
      </Link>
    </article>
  );
}

export default EventCard;
