
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/integrations/supabase/types";

type Club = Database["public"]["Tables"]["clubs"]["Row"];

interface ClubsListProps {
  clubs: Club[];
}

export const ClubsList = ({ clubs }: ClubsListProps) => {
  if (clubs.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={3} className="text-center py-8 text-gray-500">
          No clubs found
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {clubs.map((club) => (
        <TableRow key={club.id}>
          <TableCell className="font-medium">{club.name}</TableCell>
          <TableCell>
            <Badge variant="outline">{club.category}</Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">
            {club.description || 'No description available'}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};
