
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { CampusInfo } from '@/components/campus-navigate/CampusInfo';
import { LocationList } from '@/components/campus-navigate/LocationList';
import { CampusMap } from '@/components/campus-navigate/CampusMap';
import { CampusLocation, locations } from '@/components/campus-navigate/types';

const CampusNavigate = () => {
  const { toast } = useToast();
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [isLoadingDirections, setIsLoadingDirections] = useState(false);
  const [routeActive, setRouteActive] = useState(false);

  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          toast({
            title: "Location found",
            description: "Using your current location for directions",
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

  // Initialize user location
  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  const getDirections = useCallback(() => {
    if (!selectedLocation || !userLocation) {
      toast({
        title: "Cannot get directions",
        description: "Please ensure location access is enabled and a destination is selected",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingDirections(true);
    setRouteActive(true);
    
    // The actual routing is now handled by Leaflet in the CampusMap component
    // Here we just simulate the loading state for UI consistency
    setTimeout(() => {
      toast({
        title: "Directions loaded",
        description: `Route to ${selectedLocation.name} found`,
      });
      setIsLoadingDirections(false);
    }, 500);
  }, [selectedLocation, userLocation, toast]);

  const handleLocationSelect = (location: CampusLocation) => {
    setSelectedLocation(location);
    setDirections(null); // Clear existing directions when new location is selected
    setRouteActive(false); // Reset route state when selecting a new location
  };

  const refreshLocation = () => {
    getUserLocation();
  };

  const clearRoute = () => {
    setRouteActive(false);
  };

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
            onRefreshLocation={refreshLocation}
          />
        </div>

        <div className="md:col-span-2">
          <CampusMap 
            selectedLocation={selectedLocation}
            directions={directions}
            userLocation={userLocation}
            onLocationSelect={handleLocationSelect}
            routeActive={routeActive}
            onClearRoute={clearRoute}
          />
        </div>
      </div>
    </div>
  );
};

export default CampusNavigate;
