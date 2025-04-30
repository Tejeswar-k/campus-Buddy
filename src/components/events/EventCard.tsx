
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, QrCode } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Event = Database["public"]["Tables"]["events"]["Row"] & {
  clubs: Pick<Database["public"]["Tables"]["clubs"]["Row"], "name"> | null;
};

interface EventCardProps {
  event: Event;
  formatDate: (date: string) => string;
}

export const EventCard = ({ event, formatDate }: EventCardProps) => {
  const [showQRCode, setShowQRCode] = useState(false);
  
  // Generate a random QR code data URL for each event based on event ID
  const getQRCodeUrl = () => {
    // This would ideally call an API to generate a real QR code
    // For now we'll use a placeholder that's unique per event
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=SRM_EVENT_${event.id}_${event.title}`;
  };

  return (
    <>
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
                <Button 
                  variant="default" 
                  className="w-full mt-4 flex items-center justify-center gap-2"
                  onClick={() => setShowQRCode(true)}
                >
                  <QrCode className="w-4 h-4" />
                  Register Now
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Event Registration QR Code</DialogTitle>
            <DialogDescription>
              Scan this QR code to register for the event: {event.title}
            </DialogDescription>
          </DialogHeader>
          <div className={cn("flex items-center justify-center py-6")}>
            <div className="border-8 border-white p-1 shadow-lg">
              <img 
                src={getQRCodeUrl()} 
                alt={`QR code for ${event.title}`} 
                width={200} 
                height={200} 
                className="aspect-square" 
              />
            </div>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            <p>Please scan this QR code to complete your registration.</p>
            <p className="mt-1 text-blue-600 font-medium">Event ID: {event.id.substring(0, 8)}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
