
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { center, locations, CampusLocation } from './types';
import { LocationDetail } from './LocationDetail';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { Button } from '@/components/ui/button';
import { Navigation, LocateIcon, MapPinIcon, XCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Extend the L namespace to include Routing for TypeScript
declare module 'leaflet' {
  namespace Routing {
    function control(options?: any): Control;
    
    interface Control {
      setWaypoints(waypoints: L.LatLng[]): void;
      on(event: string, fn: Function): Control;
      addTo(map: L.Map): Control;
    }
    
    // Add OSRMv1 router class to the declaration
    class OSRMv1 {
      constructor(options?: any);
    }
  }
}

interface CampusMapProps {
  selectedLocation: CampusLocation | null;
  directions: google.maps.DirectionsResult | null; // Keep for compatibility
  userLocation: google.maps.LatLngLiteral | null; // Keep for compatibility
  onLocationSelect: (location: CampusLocation) => void;
  routeActive: boolean;
  onClearRoute: () => void;
}

export const CampusMap = ({
  selectedLocation,
  directions,
  userLocation,
  onLocationSelect,
  routeActive,
  onClearRoute
}: CampusMapProps) => {
  const { toast } = useToast();
  const mapRef = useRef<L.Map | null>(null);
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const markersRef = useRef<{[key: string]: L.Marker}>({});
  const userMarkerRef = useRef<L.Marker | null>(null);
  const [travelTime, setTravelTime] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) {
      // Set default icon path (needed because Leaflet's CSS assumes images in a different location)
      const DefaultIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      L.Marker.prototype.options.icon = DefaultIcon;

      // Create map centered on SRM campus
      const map = L.map('campus-map').setView([center.lat, center.lng], 17);
      
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      
      // Add routing control but don't show it yet
      if (!routingControlRef.current) {
        routingControlRef.current = L.Routing.control({
          waypoints: [],
          routeWhileDragging: true,
          lineOptions: {
            styles: [{ color: '#4285F4', weight: 5, opacity: 0.8 }]
          },
          show: false, // Hide the instruction panel
          addWaypoints: false, // Disable adding waypoints by clicking on the map
          draggableWaypoints: false, // Disable dragging waypoints
          createMarker: function() { return null; }, // Don't create default markers
          router: new L.Routing.OSRMv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1',
            profile: 'foot' // Use walking profile
          })
        });
        
        // Add the routing control to the map
        routingControlRef.current.addTo(map);
        
        // Listen for route calculation results
        routingControlRef.current.on('routesfound', function(e: any) {
          const routes = e.routes;
          const summary = routes[0].summary;
          // Convert time from seconds to minutes
          const timeInMinutes = Math.round(summary.totalTime / 60);
          const timeString = `${timeInMinutes} min`;
          setTravelTime(timeString);
          
          // Convert distance from meters to kilometers if over 1000m
          const distanceInMeters = summary.totalDistance;
          let distanceString;
          if (distanceInMeters >= 1000) {
            distanceString = `${(distanceInMeters / 1000).toFixed(1)} km`;
          } else {
            distanceString = `${Math.round(distanceInMeters)} m`;
          }
          setDistance(distanceString);
        });
      }

      // Add location markers
      locations.forEach((location) => {
        const markerColor = 
          location.category === 'academic' ? 'blue' :
          location.category === 'facility' ? 'gold' :
          location.category === 'residence' ? 'green' : 'purple';
        
        const marker = L.marker([location.position.lat, location.position.lng], {
          title: location.name,
          icon: L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: ${markerColor}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          })
        }).addTo(map);
        
        marker.on('click', () => onLocationSelect(location));
        markersRef.current[location.id] = marker;
      });
      
      mapRef.current = map;
    }
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        routingControlRef.current = null;
        markersRef.current = {};
        userMarkerRef.current = null;
      }
    };
  }, [onLocationSelect, toast]);

  // Update view when selected location changes
  useEffect(() => {
    if (mapRef.current && selectedLocation) {
      mapRef.current.setView([selectedLocation.position.lat, selectedLocation.position.lng], 18);
      
      // Open popup for selected location
      const marker = markersRef.current[selectedLocation.id];
      if (marker) {
        marker.bindPopup(`<b>${selectedLocation.name}</b>`).openPopup();
      }
    }
  }, [selectedLocation]);

  // Update user location marker
  useEffect(() => {
    if (mapRef.current && userLocation) {
      // Remove existing user marker if it exists
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }
      
      // Add new user marker
      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon: L.divIcon({
          className: 'custom-user-icon',
          html: `<div style="background-color: #4285F4; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 0 4px rgba(66, 133, 244, 0.4);"></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11]
        })
      }).addTo(mapRef.current);
      
      userMarkerRef.current.bindPopup('<b>Your Location</b>').openPopup();
    }
  }, [userLocation]);

  // Handle route activation
  useEffect(() => {
    if (routeActive && userLocation && selectedLocation && routingControlRef.current) {
      // Set waypoints and calculate route
      routingControlRef.current.setWaypoints([
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(selectedLocation.position.lat, selectedLocation.position.lng)
      ]);
      
      // Fit the map to show both points
      if (mapRef.current) {
        const bounds = L.latLngBounds(
          L.latLng(userLocation.lat, userLocation.lng),
          L.latLng(selectedLocation.position.lat, selectedLocation.position.lng)
        );
        mapRef.current.fitBounds(bounds, { padding: [50, 50] });
      }
    } else if (!routeActive && routingControlRef.current) {
      // Clear route
      routingControlRef.current.setWaypoints([]);
      setTravelTime(null);
      setDistance(null);
      
      // Return to selected location view if available
      if (mapRef.current && selectedLocation) {
        mapRef.current.setView([selectedLocation.position.lat, selectedLocation.position.lng], 18);
      }
    }
  }, [routeActive, userLocation, selectedLocation]);
  
  // Function to center on user location
  const centerOnUser = () => {
    if (mapRef.current && userLocation) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 18);
      if (userMarkerRef.current) {
        userMarkerRef.current.openPopup();
      }
    } else {
      toast({
        title: "Location not available",
        description: "Please enable location access in your browser",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="shadow-lg border-blue-200 h-full">
      <CardContent className="p-0 relative">
        <div id="campus-map" className="h-[600px] rounded-xl overflow-hidden"></div>
        
        {/* Interactive Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            onClick={centerOnUser}
            variant="outline"
            size="icon"
            className="bg-white shadow-md hover:bg-blue-50"
            title="Center on your location"
          >
            <LocateIcon className="h-5 w-5 text-blue-600" />
          </Button>
          
          {selectedLocation && (
            <Button
              onClick={() => mapRef.current?.setView([selectedLocation.position.lat, selectedLocation.position.lng], 18)}
              variant="outline"
              size="icon"
              className="bg-white shadow-md hover:bg-blue-50"
              title="Center on selected location"
            >
              <MapPinIcon className="h-5 w-5 text-red-600" />
            </Button>
          )}
        </div>
        
        {selectedLocation && (
          <div className="absolute bottom-20 left-0 right-0 mx-auto w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 p-4 bg-white rounded-lg shadow-lg border border-blue-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-blue-900">{selectedLocation.name}</h3>
              {distance && travelTime && routeActive && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-700">{distance}</span>
                  <span className="text-sm bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">{travelTime} walking</span>
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              {!routeActive ? (
                <Button 
                  onClick={() => {
                    if (!userLocation) {
                      toast({
                        title: "Cannot get directions",
                        description: "Please ensure location access is enabled",
                        variant: "destructive",
                      });
                      return;
                    }
                    if (userLocation && selectedLocation && routingControlRef.current) {
                      routingControlRef.current.setWaypoints([
                        L.latLng(userLocation.lat, userLocation.lng),
                        L.latLng(selectedLocation.position.lat, selectedLocation.position.lng)
                      ]);
                      
                      toast({
                        title: "Directions loaded",
                        description: `Route to ${selectedLocation.name} found`,
                      });
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
                  disabled={!userLocation}
                >
                  <Navigation className="h-4 w-4" />
                  Get Directions
                </Button>
              ) : (
                <Button 
                  onClick={() => {
                    if (routingControlRef.current) {
                      routingControlRef.current.setWaypoints([]);
                      onClearRoute();
                    }
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 gap-2"
                >
                  <XCircle className="h-4 w-4" />
                  Clear Route
                </Button>
              )}
            </div>
          </div>
        )}
        
        <LocationDetail selectedLocation={selectedLocation} directions={directions} />
      </CardContent>
    </Card>
  );
};
