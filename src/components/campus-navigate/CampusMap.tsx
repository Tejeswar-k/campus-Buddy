
import { GoogleMap, MarkerF, DirectionsRenderer } from '@react-google-maps/api';
import { Card, CardContent } from "@/components/ui/card";
import { center, locations, CampusLocation } from './types';
import { LocationDetail } from './LocationDetail';

interface CampusMapProps {
  selectedLocation: CampusLocation | null;
  directions: google.maps.DirectionsResult | null;
  userLocation: google.maps.LatLngLiteral | null;
  onLocationSelect: (location: CampusLocation) => void;
}

const libraries = ["places"];

export const CampusMap = ({
  selectedLocation,
  directions,
  userLocation,
  onLocationSelect
}: CampusMapProps) => {
  return (
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
                onClick={() => onLocationSelect(location)}
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
        <LocationDetail selectedLocation={selectedLocation} directions={directions} />
      </CardContent>
    </Card>
  );
};
