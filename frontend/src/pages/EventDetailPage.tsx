import { useParams } from "react-router-dom";
import { events } from "../data/events";
import { findEventById } from "../utils/filter-events";
import EventDetail from "../components/events/EventDetail";
import NotFoundPage from "./NotFoundPage";

function EventDetailPage() {
  const { id } = useParams();
  const event = findEventById(events, id ?? "");

  if (!event) return <NotFoundPage />;

  return (
    <>
      <h2>{event.title}</h2>
      <EventDetail event={event} />
    </>
  );
}

export default EventDetailPage;