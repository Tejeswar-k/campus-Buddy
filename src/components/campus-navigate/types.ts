
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
  { id: 1, name: "University Block", position: { lat: 12.8230, lng: 80.0444 }, category: "academic" },
  { id: 2, name: "Tech Park", position: { lat: 12.8235, lng: 80.0450 }, category: "academic" },
  { id: 3, name: "Boys Hostel", position: { lat: 12.8220, lng: 80.0460 }, category: "residence" },
  { id: 4, name: "M-Block", position: { lat: 12.8225, lng: 80.0445 }, category: "academic" },
  { id: 5, name: "Bio Tech Block", position: { lat: 12.8232, lng: 80.0455 }, category: "academic" },
  { id: 6, name: "Main Auditorium", position: { lat: 12.8228, lng: 80.0428 }, category: "facility" },
  { id: 7, name: "Sports Ground", position: { lat: 12.8250, lng: 80.0470 }, category: "recreation" },
  { id: 8, name: "FAB Lab", position: { lat: 12.8237, lng: 80.0460 }, category: "facility" },
  { id: 9, name: "Food Court", position: { lat: 12.8245, lng: 80.0448 }, category: "facility" },
  { id: 10, name: "Library", position: { lat: 12.8225, lng: 80.0440 }, category: "academic" },
  { id: 11, name: "Medical Center", position: { lat: 12.8243, lng: 80.0438 }, category: "facility" },
  { id: 12, name: "Student Center", position: { lat: 12.8240, lng: 80.0445 }, category: "facility" }
];

