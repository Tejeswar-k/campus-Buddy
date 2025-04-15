
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Users, Calendar, ExternalLink } from "lucide-react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database } from "@/integrations/supabase/types";
import { ClubsList } from "@/components/clubs/ClubsList";
import { ClubsFilter } from "@/components/clubs/ClubsFilter";
import { EventsList } from "@/components/events/EventsList";
import { useClubsAndEvents } from "@/hooks/useClubsAndEvents";

type Club = Database["public"]["Tables"]["clubs"]["Row"];

const ClubEvents = () => {
  const { clubs, events, loading, initializeData } = useClubsAndEvents();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-900">Clubs & Events at SRM University</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={initializeData}
          className="text-xs"
        >
          Initialize Sample Data
        </Button>
      </div>
      
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
              <ClubsFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
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
                <ClubsList clubs={filteredClubs} />
              </TableBody>
            </Table>
            
            <div className="text-center text-sm text-gray-500 mt-4">
              <a 
                href="https://www.srmist.edu.in/department/department-of-networking-and-communications/student-clubs-professional-chapters-and-association-bodies/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center justify-center gap-1"
              >
                View More Clubs at SRM University
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </TabsContent>
          
          <TabsContent value="events" className="space-y-6">
            <h3 className="text-xl font-semibold text-blue-800">University Events</h3>
            <EventsList events={events} formatDate={formatDate} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ClubEvents;

