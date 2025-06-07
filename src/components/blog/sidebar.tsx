import { Input } from "../ui/input";

export default function Sidebar() {
  return (
    <div className="space-y-8 md:sticky md:top-0 md:z-10 md:pt-2">
      <div>
        <Input
          type="text"
          placeholder="Search blog..."
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-uba-red shadow-sm transition"
        />
      </div>

      <div>
        <h4 className="font-semibold mb-3">Popular Posts</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>📅 Mar 15 – Top Use Management Tools</li>
          <li>📅 Mar 16 – 21 Must-Read Blogs</li>
          <li>📅 Mar 17 – Workplace Cyber Attacks</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Categories</h4>
        <ul className="text-sm text-muted-foreground">
          <li>Business (5)</li>
          <li>Privacy (10)</li>
          <li>Tips (12)</li>
          <li>Technology (15)</li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Tags</h4>
        <div className="flex flex-wrap gap-2 text-sm">
          {["IT", "React", "Design", "Marketing"].map((tag) => (
            <span key={tag} className="px-2 py-1 bg-muted rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
