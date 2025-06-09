import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { BlogPost } from "../../types";

const BlogPostCard = ({ blogPost }: { blogPost: BlogPost }) => {
  const { title, date, description, content, category, authorsInfo, coverImage, href } = blogPost;
  // Fallback to initials if no image
  const getInitials = (name: string) => {
    if (!name) return "";
    const names = name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase();
  };

  return (
    <Card className="hover:shadow-lg transition duration-300">
      <Link to={`/blog-post?postid=${blogPost.objectId}`}>
        <CardContent className="flex flex-col md:flex-row justify-between items-start gap-4 p-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Avatar className="w-6 h-6">
                <AvatarImage src={authorsInfo?.photoURL} alt={authorsInfo?.fName} />
                <AvatarFallback>
                  {getInitials(authorsInfo?.fName || "")}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm text-gray-500">{authorsInfo?.fName}</p>
            </div>
            <h2 className="text-xl font-bold font-roboto text-gray-900 mb-1">
              {title}
            </h2>
            <p className="text-base text-gray-700 line-clamp-2">{description||content}</p>
            <p className="text-xs text-gray-400 mt-2">{date}</p>
          </div>
          <div className="w-full md:w-32 h-24 bg-gray-300 rounded object-cover overflow-hidden">
            {coverImage ? (
              <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover rounded"
              />
            ) : null}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default BlogPostCard;
