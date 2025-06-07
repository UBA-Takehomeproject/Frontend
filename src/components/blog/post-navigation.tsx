import { Avatar, AvatarImage } from "@/components/ui/avatar";

const comments = [
  {
    name: "John Jones",
    time: "Feb 24, 2022 at 10:59 AM",
    message: "Lorem Ipsum has been the industry's standard dummy text...",
    avatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Steven Smith",
    time: "Feb 24, 2022 at 10:59 AM",
    message: "When an unknown printer took a galley of type...",
    avatar:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function CommentSection() {
  return (
    <div className="pt-10 border-t space-y-4">
      <h3 className="text-xl font-semibold">2 Comments</h3>
      {comments.map((c, i) => (
        <div key={i} className="flex gap-4 items-start">
          <Avatar>
            <AvatarImage src={c.avatar} />
          </Avatar>
          <div>
            <p className="text-sm font-semibold">{c.name}</p>
            <p className="text-xs text-gray-400">{c.time}</p>
            <p className="mt-2 text-sm text-gray-700">{c.message}</p>
            <button className="text-xs text-uba-red hover:underline mt-1">
              Reply
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
