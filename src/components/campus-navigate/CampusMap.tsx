
import { useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { center, locations, CampusLocation } from './types';
import { LocationDetail } from './LocationDetail';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

// Extend the L namespace to include Routing for TypeScript
declare module 'leaflet' {
  namespace Routing {
    function control(options?: any): any;
    interface Control {
      setWaypoints(waypoints: L.LatLng[]): void;
    }
  }
}

interface CampusMapProps {
  selectedLocation: CampusLocation | null;
  directions: google.maps.DirectionsResult | null; // Keep for compatibility
  userLocation: google.maps.LatLngLiteral | null; // Keep for compatibility
  onLocationSelect: (location: CampusLocation) => void;
}

export const CampusMap = ({
  selectedLocation,
  directions,
  userLocation,
  onLocationSelect
}: CampusMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const markersRef = useRef<{[key: string]: L.Marker}>({});
  const userMarkerRef = useRef<L.Marker | null>(null);

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
      
      // Add routing control
      if (!routingControlRef.current) {
        routingControlRef.current = L.Routing.control({
          waypoints: [],
          routeWhileDragging: true,
          lineOptions: {
            styles: [{ color: '#4285F4', weight: 5, opacity: 0.8 }]
          },
          show: false, // Hide the instruction panel
          addWaypoints: false, // Disable adding waypoints by clicking on the map
          draggableWaypoints: false // Disable dragging waypoints
        }).addTo(map);
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
  }, [onLocationSelect]);

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
          html: `<div style="background-color: #4285F4; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white;"></div>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9]
        })
      }).addTo(mapRef.current);
    }
  }, [userLocation]);

  // Update routing when user location or selected location changes
  useEffect(() => {
    if (routingControlRef.current && userLocation && selectedLocation) {
      routingControlRef.current.setWaypoints([
        L.latLng(userLocation.lat, userLocation.lng),
        L.latLng(selectedLocation.position.lat, selectedLocation.position.lng)
      ]);
    } else if (routingControlRef.current) {
      routingControlRef.current.setWaypoints([]);
    }
  }, [userLocation, selectedLocation]);

  return (
    <Card className="shadow-lg border-blue-200 h-full">
      <CardContent className="p-0">
        <div id="campus-map" className="h-[600px] rounded-xl overflow-hidden"></div>
        <LocationDetail selectedLocation={selectedLocation} directions={directions} />
      </CardContent>
    </Card>
  );
};
