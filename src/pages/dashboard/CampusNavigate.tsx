
import { useLoadScript } from '@react-google-maps/api';
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { CampusInfo } from '@/components/campus-navigate/CampusInfo';
import { LocationList } from '@/components/campus-navigate/LocationList';
import { CampusMap } from '@/components/campus-navigate/CampusMap';
import { CampusLocation, locations } from '@/components/campus-navigate/types';

const libraries = ["places"];

const GOOGLE_MAPS_API_KEY = "AIzaSyDdcbZ1m2oNWxmcB3KeHP9YFT0PviH25Tc";

const CampusNavigate = () => {
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [isLoadingDirections, setIsLoadingDirections] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
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
    // Get user's current location or set to SRM default if not available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // If location access denied, set to a position near SRM
          setUserLocation({
            lat: 12.8230,
            lng: 80.0444
          });
          toast({
            title: "Using default location",
            description: "We've set a default location near SRM campus. Enable location access for better results.",
            variant: "default",
          });
        }
      );
    } else {
      // Fallback for browsers that don't support geolocation
      setUserLocation({
        lat: 12.8230,
        lng: 80.0444
      });
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
        provideRouteAlternatives: true,
        optimizeWaypoints: true,
      });
      setDirections(result);
      toast({
        title: "Directions loaded",
        description: `Route to ${selectedLocation.name} found`,
      });
    } catch (error) {
      console.error("Direction service error:", error);
      toast({
        title: "Error getting directions",
        description: "Could not calculate route to the selected location. Try selecting a closer building.",
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

  if (loadError) return <div className="p-10 text-center text-red-600">Error loading maps: {loadError.message}</div>;
  if (!isLoaded) return <div className="p-10 text-center text-blue-600">Loading maps...</div>;

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
