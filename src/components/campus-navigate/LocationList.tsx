
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navigation, Loader2, Map, RefreshCw } from 'lucide-react';
import { locations, categoryColors, CampusLocation } from './types';

interface LocationListProps {
  onLocationSelect: (location: CampusLocation) => void;
  selectedLocation: CampusLocation | null;
  onGetDirections: () => void;
  isLoadingDirections: boolean;
  userLocation: google.maps.LatLngLiteral | null;
  onRefreshLocation?: () => void;
}

export const LocationList = ({
  onLocationSelect,
  selectedLocation,
  onGetDirections,
  isLoadingDirections,
  userLocation,
  onRefreshLocation
}: LocationListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocations, setFilteredLocations] = useState(locations);

  useEffect(() => {
    // Filter locations based on search query
    if (searchQuery.trim() === "") {
      setFilteredLocations(locations);
    } else {
      const filtered = locations.filter(location => 
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchQuery]);

  return (
    <Card className="shadow-lg border-blue-200 h-full">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Map className="h-5 w-5" />
          Campus Locations
        </CardTitle>
        <CardDescription className="text-blue-100">
          Find your way around SRM Kattankulathur campus
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-4 flex gap-2">
          <Input
            placeholder="Search for a building..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-blue-200 focus-visible:ring-blue-500"
          />
          {onRefreshLocation && (
            <Button 
              onClick={onRefreshLocation}
              variant="outline"
              size="icon"
              className="border-blue-200 hover:bg-blue-50"
              title="Refresh your location"
            >
              <RefreshCw className="h-4 w-4 text-blue-700" />
            </Button>
          )}
        </div>
        <div className="h-[400px] overflow-y-auto pr-2 space-y-2">
          {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <div 
                key={location.id}
                onClick={() => onLocationSelect(location)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedLocation?.id === location.id 
                    ? 'bg-blue-100 border-2 border-blue-500' 
                    : 'bg-white border border-blue-100 hover:border-blue-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-blue-900">{location.name}</h3>
                  <Badge 
                    variant="outline" 
                    className={categoryColors[location.category]}
                  >
                    {location.category}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-blue-500">No locations found</div>
          )}
        </div>
        {selectedLocation && (
          <div className="mt-4">
            <Button 
              onClick={onGetDirections}
              className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
              disabled={!userLocation || isLoadingDirections}
            >
              {isLoadingDirections ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Calculating route...
                </>
              ) : (
                <>
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
