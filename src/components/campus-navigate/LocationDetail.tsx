
import { Badge } from "@/components/ui/badge";
import { CampusLocation } from "./types";

interface LocationDetailProps {
  selectedLocation: CampusLocation | null;
  directions: google.maps.DirectionsResult | null;
}

export const LocationDetail = ({ selectedLocation, directions }: LocationDetailProps) => {
  if (!selectedLocation) return null;
  
  return (
    <div className="p-4 bg-blue-50 rounded-b-lg border-t border-blue-200">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium text-blue-900 text-lg">{selectedLocation.name}</h3>
          <p className="text-sm text-blue-700">
            {directions?.routes[0]?.legs[0]?.distance?.text || 'Select Get Directions to calculate distance'}
          </p>
        </div>
        {directions?.routes[0]?.legs[0]?.duration && (
          <Badge className="bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1">
            {directions.routes[0].legs[0].duration.text} walking
          </Badge>
        )}
      </div>
    </div>
  );
};
