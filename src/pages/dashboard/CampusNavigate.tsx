
import { useLoadScript, GoogleMap, MarkerF } from '@react-google-maps/api';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

// SRM University Kattankulathur campus coordinates
const center = { lat: 12.8230, lng: 80.0444 };

const libraries = ["places"];

const locations = [
  { id: 1, name: "University Building", position: { lat: 12.8230, lng: 80.0444 } },
  { id: 2, name: "Tech Park", position: { lat: 12.8235, lng: 80.0450 } },
  { id: 3, name: "Main Library", position: { lat: 12.8225, lng: 80.0440 } },
  { id: 4, name: "Student Center", position: { lat: 12.8240, lng: 80.0445 } },
];

const CampusNavigate = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your API key
    libraries: libraries as any,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);

  const handleSearch = () => {
    const found = locations.find(loc => 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (found) {
      setSelectedLocation(found);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campus Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search for a building..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
          <div className="h-[600px] rounded-lg overflow-hidden">
            <GoogleMap
              zoom={17}
              center={selectedLocation?.position || center}
              mapContainerClassName="w-full h-full"
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: true,
                fullscreenControl: true,
              }}
            >
              {locations.map((location) => (
                <MarkerF
                  key={location.id}
                  position={location.position}
                  onClick={() => setSelectedLocation(location)}
                />
              ))}
            </GoogleMap>
          </div>
          {selectedLocation && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium">{selectedLocation.name}</h3>
              <p className="text-sm text-gray-600">
                Latitude: {selectedLocation.position.lat}, Longitude: {selectedLocation.position.lng}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CampusNavigate;
