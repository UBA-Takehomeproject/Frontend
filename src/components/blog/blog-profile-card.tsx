import type { Blog } from "@/types";

export default function BlogProfileCard({ blog }: { blog: Blog }) {
  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden relative md:w-9/12 w-11/12 max-h-fit">
      {/* Cover Image */}
      <div className="h-32 w-full overflow-hidden">
        <img
          src={blog.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute top-20 left-6 w-24 h-24 bg-white rounded-md shadow-md overflow-hidden border">
        <img
          src={blog.authorsInfo.photoURL}
          alt="REM Waste Logo"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3">
        <div className="mt-16">
          <h2 className="text-2xl font-bold"> {blog.title}</h2>
          <p className="text-sm text-muted-foreground">{blog.description}</p>
          <div className="mt-4 flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1 text-gray-700">
              <span className="text-xl">
                <img src="/svg/clap2.svg" className="w-4 h-4" alt="Save" />
              </span>
              <span className="font-medium">1.2k</span>
              <span className="text-xs text-gray-400">Applauds</span>
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              <span className="text-xl">
                <img src="/svg/send.svg" className="w-4 h-4" alt="Save" />
              </span>
              <span className="font-medium">320</span>
              <span className="text-xs text-gray-400">Saves</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
