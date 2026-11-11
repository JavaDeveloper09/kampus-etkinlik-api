import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface Props {
  event: CampusEvent;
}

// Etkinliğe özel afiş: başlık, yıl, tarih ve yer içeren küçük bir SVG
function posterSrc(event: CampusEvent): string {
  const esc = (t: string) =>
    t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 280">
    <rect width="520" height="280" fill="#15223f"/>
    <rect x="10" y="10" width="500" height="260" fill="none" stroke="#e8834a" stroke-width="3"/>
    <text x="260" y="115" fill="#fff" font-family="Georgia, serif" font-size="32" text-anchor="middle">${esc(event.title)}</text>
    <text x="260" y="160" fill="#e8834a" font-family="Georgia, serif" font-size="28" text-anchor="middle">${event.date.slice(0, 4)}</text>
    <text x="260" y="205" fill="#c9d3e6" font-family="Georgia, serif" font-size="17" text-anchor="middle">${esc(formatDate(event.date) + " · " + event.location)}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// Sadece çizer: useParams yok, useEvents yok.
function EventDetail({ event }: Props) {
  return (
    <article className="detay">
      <img className="detay-afis" src={posterSrc(event)} alt={`${event.title} afişi`} />
      <div className="detay-bilgi">
        <span className="etiket">{event.category}</span>
        <dl>
          <dt>Tarih</dt>
          <dd>{formatDate(event.date)}</dd>
          <dt>Saat</dt>
          <dd>{event.time}</dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
        <p>{event.description}</p>
        <div className="buton-grubu">
          <Link className="buton buton-ikincil" to="/events">Listeye dön</Link>
          <Link className="buton" to={`/admin/${event.id}/edit`}>Güncelle</Link>
        </div>
      </div>
    </article>
  );
}

export default EventDetail;
