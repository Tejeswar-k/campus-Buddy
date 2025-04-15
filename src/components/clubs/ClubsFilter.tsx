
import { Button } from "@/components/ui/button";

interface ClubsFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
}

export const ClubsFilter = ({ 
  categories,
  selectedCategory,
  onCategorySelect 
}: ClubsFilterProps) => {
  if (!categories.length) return null;

  return (
    <div className="flex gap-2">
      <Button 
        variant={selectedCategory === null ? "default" : "outline"}
        size="sm"
        onClick={() => onCategorySelect(null)}
        className="text-xs"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategorySelect(category)}
          className="text-xs"
        >
          {category}
        </Button>
      ))}
    </div>
  );
};
