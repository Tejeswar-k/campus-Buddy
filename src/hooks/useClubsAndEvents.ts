
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type Club = Database["public"]["Tables"]["clubs"]["Row"];
type Event = Database["public"]["Tables"]["events"]["Row"] & {
  clubs: Pick<Club, "name"> | null;
};

export const useClubsAndEvents = () => {
  const { toast } = useToast();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClubsAndEvents = async () => {
    try {
      setLoading(true);
      
      const { data: clubsData, error: clubsError } = await supabase
        .from("clubs")
        .select("*")
        .order("name");

      if (clubsError) throw clubsError;
      
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

  const initializeData = async () => {
    try {
      await supabase.from('events').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('clubs').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      const { error: clubsError } = await supabase.from('clubs').insert([
        {
          name: "IEEE Student Branch",
          category: "Professional Chapter",
          description: "The IEEE Student Branch at SRMIST provides opportunities for IEEE student members to begin networking and career planning."
        },
        {
          name: "Computer Society of India",
          category: "Professional Chapter",
          description: "CSI Student Chapter facilitates research, knowledge sharing, learning and career enhancement for all categories of IT professionals."
        },
        {
          name: "ACM Student Chapter",
          category: "Professional Chapter",
          description: "The ACM Student Chapter is an official student organization that promotes knowledge sharing and professional growth in computing."
        },
        {
          name: "Coding Club",
          category: "Technical Club",
          description: "A community of coding enthusiasts who collaborate on projects and participate in coding competitions."
        },
        {
          name: "Internet of Things Club",
          category: "Technical Club",
          description: "Focuses on IoT projects, workshops, and research in emerging technologies."
        }
      ]);

      if (clubsError) throw clubsError;

      const { data: clubsData } = await supabase.from('clubs').select('*');
      
      if (clubsData) {
        const { error: eventsError } = await supabase.from('events').insert([
          {
            title: "IEEE Project Exhibition 2025",
            description: "Annual project showcase featuring innovative student projects in various IEEE fields.",
            date: "2025-05-15",
            time: "10:00 AM",
            venue: "Tech Park Auditorium",
            club_id: clubsData.find(club => club.name === "IEEE Student Branch")?.id,
            available: true
          },
          {
            title: "CSI TechWeek",
            description: "Week-long technical festival featuring workshops, competitions, and expert talks.",
            date: "2025-06-01",
            time: "9:00 AM",
            venue: "University Main Building",
            club_id: clubsData.find(club => club.name === "Computer Society of India")?.id,
            available: true
          },
          {
            title: "ACM Coding Competition",
            description: "Annual coding competition testing algorithmic and problem-solving skills.",
            date: "2025-07-10",
            time: "2:00 PM",
            venue: "Computer Science Block",
            club_id: clubsData.find(club => club.name === "ACM Student Chapter")?.id,
            available: true
          }
        ]);

        if (eventsError) throw eventsError;
      }

      await fetchClubsAndEvents();
      
      toast({
        title: "Success",
        description: "Sample clubs and events have been added successfully!",
      });
    } catch (error) {
      console.error("Error initializing data:", error);
      toast({
        title: "Error",
        description: "Failed to initialize sample data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchClubsAndEvents();
  }, []);

  return {
    clubs,
    events,
    loading,
    initializeData,
    fetchClubsAndEvents,
  };
};

