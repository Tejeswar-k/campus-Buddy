
import { Database } from "@/integrations/supabase/types";
import { EventCard } from "./EventCard";

type Event = Database["public"]["Tables"]["events"]["Row"] & {
  clubs: Pick<Database["public"]["Tables"]["clubs"]["Row"], "name"> | null;
};

interface EventsListProps {
  events: Event[];
  formatDate: (date: string) => string;
}

export const EventsList = ({ events, formatDate }: EventsListProps) => {
  if (events.length === 0) {
    return <p className="text-gray-500 text-center py-8">No events found</p>;
  }

  return (
    <div className="grid gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} formatDate={formatDate} />
      ))}
    </div>
  );
};
