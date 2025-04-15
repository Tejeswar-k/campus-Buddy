
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Event = Database["public"]["Tables"]["events"]["Row"] & {
  clubs: Pick<Database["public"]["Tables"]["clubs"]["Row"], "name"> | null;
};

interface EventCardProps {
  event: Event;
  formatDate: (date: string) => string;
}

export const EventCard = ({ event, formatDate }: EventCardProps) => {
  return (
    <Card className="overflow-hidden border-l-4 border-l-blue-500">
      <CardHeader className="bg-blue-50/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-blue-900">{event.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Organized by {event.clubs?.name}</p>
          </div>
          <Badge variant={event.available ? "secondary" : "outline"} className="ml-2">
            {event.available ? "Registration Open" : "Registration Closed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid md:grid-cols-[2fr,1fr] gap-4">
          <div className="space-y-3">
            {event.description && (
              <p className="text-sm text-gray-700">{event.description}</p>
            )}
            
            <div className="text-center text-sm text-gray-500 mt-4">
              <a href="https://www.srmist.edu.in/events/milan25-national-level-cultural-festival/" className="text-blue-600 hover:underline flex items-center justify-center gap-1">
                View Event Details
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          
          <div className="bg-blue-50/50 p-4 rounded-md space-y-2">
            <p className="text-sm">
              <span className="font-medium text-blue-800">Date:</span> {formatDate(event.date)}
            </p>
            <p className="text-sm">
              <span className="font-medium text-blue-800">Time:</span> {event.time}
            </p>
            <p className="text-sm">
              <span className="font-medium text-blue-800">Venue:</span> {event.venue}
            </p>
            
            {event.available && (
              <Button variant="default" className="w-full mt-4">
                Register Now
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
