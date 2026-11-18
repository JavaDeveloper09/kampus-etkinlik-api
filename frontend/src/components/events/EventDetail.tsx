import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay">
      {event.image && (
        <figure>
          <img src={event.image} alt={`${event.title} etkinlik afişi`} />
          <figcaption>Şekil 1: {event.title} afişi</figcaption>
        </figure>
      )}

      <div className="detay-bilgi">
        <dl className="kunye">
          <dt>Tarih</dt>
          <dd>
            <time dateTime={`${event.date}T${event.time}`}>
              {formatDate(event.date)}, {event.time}
            </time>
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>

        <p>{event.description}</p>

        <p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onEdit(event.id);
            }}
          >
            Bu etkinliği güncelle
          </a>{" "}
          ·{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            ← Listeye dön
          </a>
        </p>
      </div>
    </article>
  );
}

export default EventDetail;