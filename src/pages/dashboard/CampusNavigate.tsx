
import { useLoadScript } from '@react-google-maps/api';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { CampusInfo } from '@/components/campus-navigate/CampusInfo';
import { LocationList } from '@/components/campus-navigate/LocationList';
import { CampusMap } from '@/components/campus-navigate/CampusMap';
import { CampusLocation, locations } from '@/components/campus-navigate/types';

const libraries = ["places"];

const CampusNavigate = () => {
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(null);
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

  const handleLocationSelect = (location: CampusLocation) => {
    setSelectedLocation(location);
    setDirections(null); // Clear existing directions when new location is selected
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* SRM University Info Card */}
      <CampusInfo />

      {/* Campus Navigation Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <LocationList 
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
            onGetDirections={getDirections}
            isLoadingDirections={isLoadingDirections}
            userLocation={userLocation}
          />
        </div>

        <div className="md:col-span-2">
          <CampusMap 
            selectedLocation={selectedLocation}
            directions={directions}
            userLocation={userLocation}
            onLocationSelect={handleLocationSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default CampusNavigate;
