import { Badge } from "@/components/ui/badge";

const TopBar = ({
    selectedFilter,
    onSelect,
  }: {
    selectedFilter: string;
    onSelect: (item: string) => void;
  }) => (
    // md:block md:w-1/4
    <div className="hidden md:block pr-6 mb-8 bg-gray-50  md:w-1/2 ">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Filters</h3>
      <div className="flex flex-wrap gap-2">
        {["All", "Hot", "Suggested", "Latest"].map((item) => (
          <Badge
            key={item}
            onClick={() => onSelect(item)}
            variant={selectedFilter === item ? "default" : "outline"}
            className="cursor-pointer px-3 py-1"
          >
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );

  export default TopBar;
  