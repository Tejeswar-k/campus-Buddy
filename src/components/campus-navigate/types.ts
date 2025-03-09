
export interface CampusLocation {
  id: number;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  category: 'academic' | 'facility' | 'residence' | 'recreation';
}

export interface CategoryColors {
  [key: string]: string;
}

export const categoryColors: CategoryColors = {
  academic: "bg-blue-100 text-blue-800 border-blue-200",
  facility: "bg-amber-100 text-amber-800 border-amber-200",
  residence: "bg-green-100 text-green-800 border-green-200",
  recreation: "bg-purple-100 text-purple-800 border-purple-200"
};

// SRM University Kattankulathur campus coordinates
export const center = { lat: 12.8230, lng: 80.0444 };

// More detailed campus locations for SRM University
export const locations: CampusLocation[] = [
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
