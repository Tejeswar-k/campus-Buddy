
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ClubEvents = () => {
  const events = [
    {
      id: 1,
      title: "Tech Talk 2024",
      club: "Computer Society",
      date: "March 15, 2024",
      time: "2:00 PM",
      venue: "Main Auditorium",
      available: true,
    },
    {
      id: 2,
      title: "Cultural Night",
      club: "Literary Club",
      date: "March 20, 2024",
      time: "6:00 PM",
      venue: "Open Air Theatre",
      available: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Upcoming Events</h2>
      <div className="grid gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{event.title}</CardTitle>
                  <p className="text-sm text-gray-600">by {event.club}</p>
                </div>
                <Badge variant="secondary">{event.available ? "Available" : "Full"}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Date:</span> {event.date}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Time:</span> {event.time}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Venue:</span> {event.venue}
                  </p>
                </div>
                <Button variant="outline">RSVP</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClubEvents;
