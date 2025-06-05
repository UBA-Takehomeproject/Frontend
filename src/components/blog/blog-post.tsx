import { CardContent } from "../ui/card";
import { Card } from "../ui/card";

const BlogPostCard = ({
  name,
  title,
  description,
  date,
}: {
  name: string;
  title: string;
  description: string;
  date: string;
}) => (
  <Card className="hover:shadow-lg transition duration-300">
    <CardContent className="flex flex-col md:flex-row justify-between items-start gap-4 p-6">
      <div className="flex-1">
        <p className="text-sm text-gray-500">{name}</p>
        <h2 className="text-xl font-bold font-roboto text-gray-900 mb-1">
          {title}
        </h2>
        <p className="text-base text-gray-700 line-clamp-2">{description}</p>
        <p className="text-xs text-gray-400 mt-2">{date}</p>
      </div>
      <div className="w-full md:w-32 h-24 bg-gray-300 rounded object-cover" />
    </CardContent>
  </Card>
);

export default BlogPostCard;
