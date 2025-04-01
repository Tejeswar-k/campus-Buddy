
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Users, Calendar, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database } from "@/integrations/supabase/types";

type Club = Database['public']['Tables']['clubs']['Row'];
type Event = Database['public']['Tables']['events']['Row'] & {
  club_name?: string;
};

const ClubEvents = () => {
  const { toast } = useToast();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const fetchClubsAndEvents = async () => {
    try {
      setLoading(true);
      
      // Fetch clubs
      const { data: clubsData, error: clubsError } = await supabase
        .from("clubs")
        .select("*")
        .order("name");

      if (clubsError) throw clubsError;
      
      // Fetch events with club names
      const { data: eventsData, error: eventsError } = await supabase
        .from("events")
        .select("*, clubs(name)")
        .order("date");

      if (eventsError) throw eventsError;
      
      // Map events with club names
      const eventsWithClubNames = eventsData.map((event) => ({
        ...event,
        club_name: event.clubs?.name,
      }));
      
      setClubs(clubsData);
      setEvents(eventsWithClubNames);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load clubs and events",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchClubsAndEvents();
  }, []);

  const categories = [...new Set(clubs.map((club) => club.category))];
  
  const filteredClubs = selectedCategory
    ? clubs.filter((club) => club.category === selectedCategory)
    : clubs;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">Clubs & Events</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <Tabs defaultValue="clubs">
          <TabsList className="mb-4">
            <TabsTrigger value="clubs" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Clubs
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="clubs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-blue-800">SRM University Clubs</h3>
              <div className="flex gap-2">
                <Button 
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs"
                >
                  All
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Club Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClubs.map((club) => (
                  <TableRow key={club.id}>
                    <TableCell className="font-medium">{club.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{club.category}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {club.description || 'No description available'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-800">Upcoming Events</h3>
            <div className="grid gap-6">
              {events.length === 0 ? (
                <p className="text-gray-500">No upcoming events found</p>
              ) : (
                events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>{event.title}</CardTitle>
                          <p className="text-sm text-gray-600">by {event.club_name}</p>
                        </div>
                        <Badge variant={event.available ? "secondary" : "outline"}>
                          {event.available ? "Available" : "Full"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Time:</span> {event.time}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Venue:</span> {event.venue}
                          </p>
                          {event.description && (
                            <p className="text-sm mt-2">{event.description}</p>
                          )}
                        </div>
                        <Button variant="outline">RSVP</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ClubEvents;
