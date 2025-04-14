import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Users, Calendar, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Database } from "@/integrations/supabase/types";

type Club = Database["public"]["Tables"]["clubs"]["Row"];
type Event = Database["public"]["Tables"]["events"]["Row"] & {
  clubs: Pick<Club, "name"> | null;
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
      
      setClubs(clubsData || []);
      setEvents(eventsData || []);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-blue-900">Clubs & Events at SRM University</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <Tabs defaultValue="clubs">
          <TabsList className="mb-4">
            <TabsTrigger value="clubs" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Student Clubs
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="clubs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-blue-800">Professional Chapters & Association Bodies</h3>
              {categories.length > 0 && (
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
              )}
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
                {filteredClubs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-8 text-gray-500">
                      No clubs found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClubs.map((club) => (
                    <TableRow key={club.id}>
                      <TableCell className="font-medium">{club.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{club.category}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {club.description || 'No description available'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            
            <div className="text-center text-sm text-gray-500 mt-4">
              <p>Source: <a href="https://www.srmist.edu.in/department/department-of-networking-and-communications/student-clubs-professional-chapters-and-association-bodies/" className="text-blue-600 hover:underline flex items-center justify-center gap-1">
                SRM University Student Clubs
                <ExternalLink className="w-3 h-3" />
              </a></p>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-800">University Events</h3>
            <div className="grid gap-6">
              {events.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No events found</p>
              ) : (
                events.map((event) => (
                  <Card key={event.id} className="overflow-hidden border-l-4 border-l-blue-500">
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
