import BlogContent from "@/components/blog/blog-content";
import PostNavigation from "@/components/blog/post-navigation";
import Sidebar from "@/components/blog/sidebar";
import BlogContentSkeleton from "@/components/skeleton/blog-content-skeleton";
import CommentSectionSkeleton from "@/components/skeleton/comment-section-skeleton";
import { useBlogPost } from "@/hooks/use-blog-posts";
import type { BlogPost } from "@/types";
import { useLocation } from "react-router-dom";

export default function BlogPostPage() {
  // The postid is coming from the query string (?postid=...), not the route params.
  // So we need to read it from the URL search params instead of useParams.
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const postid = searchParams.get("postid") || undefined;
  const { data: post, isLoading } = useBlogPost(postid);

  return (
    <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-8 space-y-10">
        {isLoading ? (
          <BlogContentSkeleton />
        ) : (
          <BlogContent post={post as BlogPost} />
        )}
        {isLoading ? <CommentSectionSkeleton /> : <PostNavigation />}
        {/* <CommentSection /> */}
      </div>
      <aside className="lg:col-span-4 ">
        <Sidebar />
      </aside>
    </div>
  );
}
