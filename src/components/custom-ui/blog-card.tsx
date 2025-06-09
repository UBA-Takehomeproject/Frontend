import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import type { Blog } from "@/types";
import { Link } from "react-router-dom";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <Card className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pt-80 pb-8 sm:pt-48 lg:pt-80">
      <Link to={`/blog?blogid=${blog.objectId}`}>
        <img
          src={blog.coverImage}
          alt=""
          className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
        <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

        <CardContent className="text-sm text-gray-300">
          <div className="flex flex-wrap items-center gap-y-1">
            <time dateTime={blog.date} className="mr-8">
              {blog.date}
            </time>
            <div className="-ml-4 flex items-center gap-x-4">
              <svg
                viewBox="0 0 2 2"
                className="-ml-0.5 size-0.5 flex-none fill-white/50"
              >
                <circle cx="1" cy="1" r="1" />
              </svg>
              <div className="flex items-center gap-x-2.5">
                <Avatar className="h-6 w-6 bg-white/10">
                  <AvatarImage src={blog.authorsInfo.lName} />
                </Avatar>
                {blog.authorsInfo.fName}
              </div>
            </div>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-white leading-6">
            <a href={blog.href} className="relative z-10">
              {blog.title}
            </a>
          </h3>
        </CardContent>
      </Link>
    </Card>
  );
};

export default BlogCard;
