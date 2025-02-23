
import { useLoadScript, GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Navigation } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: libraries as any,
  });

  useEffect(() => {
    if (loadError) {
      toast({
        title: "Error loading map",
        description: "Please check your internet connection and try again",
        variant: "destructive",
      });
    }
  }, [loadError, toast]);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          toast({
            title: "Location access denied",
            description: "Please enable location access to use directions feature",
            variant: "destructive",
          });
        }
      );
    }
  }, [toast]);

  const getDirections = useCallback(async () => {
    if (!selectedLocation || !userLocation) {
      toast({
        title: "Cannot get directions",
        description: "Please ensure location access is enabled and a destination is selected",
        variant: "destructive",
      });
      return;
    }

    const directionsService = new google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin: userLocation,
        destination: selectedLocation.position,
        travelMode: google.maps.TravelMode.WALKING,
      });
      setDirections(result);
    } catch (error) {
      toast({
        title: "Error getting directions",
        description: "Could not calculate route to the selected location",
        variant: "destructive",
      });
    }
  }, [selectedLocation, userLocation, toast]);

  const handleSearch = () => {
    const found = locations.find(loc => 
      loc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (found) {
      setSelectedLocation(found);
      setDirections(null); // Clear existing directions when new location is selected
    } else {
      toast({
        title: "Location not found",
        description: "Please try searching for a different location",
        variant: "destructive",
      });
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* SRM University Info Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            SRM Institute of Science and Technology
          </CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Kattankulathur, Chennai - 603203
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-800">About SRMIST</h3>
              <p className="text-gray-600">
                SRMIST is one of India's top-ranking universities with over 52,000 full-time students and more than 3,200 faculty across all campuses, offering a wide range of undergraduate, postgraduate and doctoral programs in Engineering, Management, Medicine and Health sciences, and Science and Humanities.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-gray-800">Quick Facts</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Established in 1985</li>
                <li>NAAC Accredited with 'A++' Grade</li>
                <li>QS World Rankings: 401-450</li>
                <li>500+ Acres Green Campus</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campus Navigation Card */}
      <Card className="shadow-lg border-none">
        <CardHeader>
          <CardTitle className="text-2xl">Campus Navigation</CardTitle>
          <CardDescription>Find your way around SRM Kattankulathur campus</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input
              placeholder="Search for a building..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
            {selectedLocation && (
              <Button 
                onClick={getDirections}
                variant="outline"
                className="gap-2"
                disabled={!userLocation}
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </Button>
            )}
          </div>
          <div className="h-[600px] rounded-xl overflow-hidden shadow-inner border border-gray-200">
            <GoogleMap
              zoom={17}
              center={selectedLocation?.position || center}
              mapContainerClassName="w-full h-full"
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: true,
                fullscreenControl: true,
                styles: [
                  {
                    featureType: "poi.school",
                    elementType: "geometry",
                    stylers: [{ color: "#c7eaf9" }],
                  },
                ],
              }}
            >
              {userLocation && <MarkerF position={userLocation} />}
              {locations.map((location) => (
                <MarkerF
                  key={location.id}
                  position={location.position}
                  onClick={() => setSelectedLocation(location)}
                />
              ))}
              {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
          </div>
          {selectedLocation && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-medium text-blue-900">{selectedLocation.name}</h3>
              <p className="text-sm text-blue-700">
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
