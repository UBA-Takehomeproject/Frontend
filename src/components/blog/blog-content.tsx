import { Avatar, AvatarImage } from "@/components/ui/avatar";
import type { BlogPost } from "@/types";

export default function BlogContent({ post }: { post: BlogPost }) {
  const { title, date, content,category, authorsInfo, coverImage } = post;

  return (
    <div>
      <img src={coverImage} alt={title} className="w-full rounded-md mb-6 max-h-[500px] object-cover" />
      <div className="flex items-center space-x-3 text-sm text-gray-500 mb-4">
        <Avatar className="w-6 h-6">
          <AvatarImage src={authorsInfo?.photoURL} alt={authorsInfo?.fName} />
        </Avatar>
        <span>{authorsInfo?.fName} {authorsInfo?.lName}</span>
        <span>•</span>
        <time>{new Date(date).toLocaleDateString()}</time>
      </div>
      <h1 className="text-3xl font-bold mb-4 text-uba-300">{title}</h1>
      <div className="space-y-4 text-gray-700 text-base leading-7" dangerouslySetInnerHTML={{ __html: content }} />
      <div className="mt-6 flex gap-2">
        {category.map(tag => (
          <span key={tag} className="px-2 py-1 bg-muted rounded text-sm text-muted-foreground">{tag}</span>
        ))}
      </div>
    </div>
  );
}
