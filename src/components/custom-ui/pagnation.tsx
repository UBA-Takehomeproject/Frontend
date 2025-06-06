import { Button } from "@/components/ui/button";

const Pagination = () => (
    <div className="flex justify-center items-center gap-2 mt-8">
      {[1, 2, 3, 4, 5].map((num) => (
        <Button
          key={num}
          variant="outline"
          className="w-9 h-9 text-sm rounded-full text-gray-700 hover:bg-uba-red hover:text-white"
        >
          {num}
        </Button>
      ))}
      <Button
        variant="outline"
        className="w-9 h-9 text-sm rounded-full hover:bg-uba-red hover:text-white text-gray-700"
      >
        ▶
      </Button>
    </div>
  );

  export default Pagination