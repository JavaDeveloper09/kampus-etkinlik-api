import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useEvents();

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <>
      <section>
        <h2>Hakkında</h2>
        <p>
          Fakültemizdeki seminer, atölye, söyleşi ve yarışmaları tek yerden
          takip edebileceğin uygulama.
        </p>
      </section>

      <section>
        <h2>Yaklaşan Etkinlikler</h2>
        <EventList events={upcoming} />
        <p>
          <Link to="/events">Tüm etkinlikleri gör →</Link>
        </p>
      </section>
    </>
  );
}

export default HomePage;