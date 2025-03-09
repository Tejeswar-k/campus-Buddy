
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
          {directions?.routes[0]?.legs[0]?.steps && (
            <div className="mt-2 text-sm text-blue-800">
              <p className="font-medium">Steps:</p>
              <ol className="list-decimal pl-5 mt-1 space-y-1">
                {directions.routes[0].legs[0].steps.slice(0, 3).map((step, index) => (
                  <li key={index} 
                      dangerouslySetInnerHTML={{ __html: step.instructions }}
                      className="text-blue-700" />
                ))}
                {directions.routes[0].legs[0].steps.length > 3 && (
                  <li className="text-blue-600 italic">...and {directions.routes[0].legs[0].steps.length - 3} more steps</li>
                )}
              </ol>
            </div>
          )}
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
