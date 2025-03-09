
import { useLoadScript, GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Navigation, Map, Loader2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

// SRM University Kattankulathur campus coordinates
const center = { lat: 12.8230, lng: 80.0444 };

const libraries = ["places"];

// More detailed campus locations for SRM University
const locations = [
  { id: 1, name: "Main Building", position: { lat: 12.8230, lng: 80.0444 }, category: "academic" },
  { id: 2, name: "Tech Park", position: { lat: 12.8235, lng: 80.0450 }, category: "academic" },
  { id: 3, name: "University Library", position: { lat: 12.8225, lng: 80.0440 }, category: "academic" },
  { id: 4, name: "Student Center", position: { lat: 12.8240, lng: 80.0445 }, category: "facility" },
  { id: 5, name: "Hostel Block A", position: { lat: 12.8220, lng: 80.0460 }, category: "residence" },
  { id: 6, name: "Hostel Block B", position: { lat: 12.8225, lng: 80.0465 }, category: "residence" },
  { id: 7, name: "Food Court", position: { lat: 12.8245, lng: 80.0448 }, category: "facility" },
  { id: 8, name: "Sports Complex", position: { lat: 12.8250, lng: 80.0470 }, category: "recreation" },
  { id: 9, name: "Engineering Block", position: { lat: 12.8232, lng: 80.0455 }, category: "academic" },
  { id: 10, name: "Science Block", position: { lat: 12.8237, lng: 80.0460 }, category: "academic" },
  { id: 11, name: "Medical Center", position: { lat: 12.8243, lng: 80.0438 }, category: "facility" },
  { id: 12, name: "Auditorium", position: { lat: 12.8228, lng: 80.0428 }, category: "facility" },
];

// Category colors for the badges
const categoryColors = {
  academic: "bg-blue-100 text-blue-800 border-blue-200",
  facility: "bg-amber-100 text-amber-800 border-amber-200",
  residence: "bg-green-100 text-green-800 border-green-200",
  recreation: "bg-purple-100 text-purple-800 border-purple-200"
};

const CampusNavigate = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [selectedLocation, setSelectedLocation] = useState<typeof locations[0] | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [isLoadingDirections, setIsLoadingDirections] = useState(false);

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

  const getDirections = useCallback(async () => {
    if (!selectedLocation || !userLocation) {
      toast({
        title: "Cannot get directions",
        description: "Please ensure location access is enabled and a destination is selected",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingDirections(true);
    const directionsService = new google.maps.DirectionsService();

    try {
      const result = await directionsService.route({
        origin: userLocation,
        destination: selectedLocation.position,
        travelMode: google.maps.TravelMode.WALKING,
      });
      setDirections(result);
      toast({
        title: "Directions loaded",
        description: `Route to ${selectedLocation.name} found`,
      });
    } catch (error) {
      toast({
        title: "Error getting directions",
        description: "Could not calculate route to the selected location",
        variant: "destructive",
      });
    } finally {
      setIsLoadingDirections(false);
    }
  }, [selectedLocation, userLocation, toast]);

  const handleLocationSelect = (location: typeof locations[0]) => {
    setSelectedLocation(location);
    setDirections(null); // Clear existing directions when new location is selected
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* SRM University Info Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-900">
            SRM Institute of Science and Technology
          </CardTitle>
          <CardDescription className="text-blue-800 mt-2 font-medium">
            Kattankulathur, Chennai - 603203
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-900">About SRMIST</h3>
              <p className="text-blue-800">
                SRMIST is one of India's top-ranking universities with over 52,000 full-time students and more than 3,200 faculty across all campuses, offering a wide range of undergraduate, postgraduate and doctoral programs in Engineering, Management, Medicine and Health sciences, and Science and Humanities.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-blue-900">Quick Facts</h3>
              <ul className="list-disc list-inside text-blue-800 space-y-2">
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
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
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
              <div className="mb-4">
                <Input
                  placeholder="Search for a building..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-blue-200 focus-visible:ring-blue-500"
                />
              </div>
              <div className="h-[400px] overflow-y-auto pr-2 space-y-2">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((location) => (
                    <div 
                      key={location.id}
                      onClick={() => handleLocationSelect(location)}
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
                          className={categoryColors[location.category as keyof typeof categoryColors]}
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
                    onClick={getDirections}
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
        </div>

        <div className="md:col-span-2">
          <Card className="shadow-lg border-blue-200 h-full">
            <CardContent className="p-0">
              <div className="h-[600px] rounded-xl overflow-hidden">
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
                      {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{ color: "#b3e0ff" }],
                      },
                      {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{ color: "#e6f2ff" }],
                      },
                    ],
                  }}
                >
                  {userLocation && (
                    <MarkerF 
                      position={userLocation} 
                      icon={{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 7,
                        fillColor: "#4285F4",
                        fillOpacity: 1,
                        strokeColor: "#ffffff",
                        strokeWeight: 2,
                      }}
                    />
                  )}
                  
                  {locations.map((location) => (
                    <MarkerF
                      key={location.id}
                      position={location.position}
                      onClick={() => handleLocationSelect(location)}
                      icon={{
                        url: `https://maps.google.com/mapfiles/ms/icons/${
                          location.category === 'academic' ? 'blue' :
                          location.category === 'facility' ? 'yellow' :
                          location.category === 'residence' ? 'green' : 'purple'
                        }-dot.png`
                      }}
                    />
                  ))}
                  
                  {directions && <DirectionsRenderer directions={directions} options={{
                    polylineOptions: {
                      strokeColor: "#4285F4",
                      strokeWeight: 5,
                      strokeOpacity: 0.8
                    }
                  }} />}
                </GoogleMap>
              </div>
              {selectedLocation && (
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
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CampusNavigate;
