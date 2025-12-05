"use client";
import { FollowerPointerCard } from "./ui/following-pointer";

export function FollowingPointerDemo() {
  return (
    <div className="mx-auto w-full max-w-sm">
      <FollowerPointerCard
        title={
          <TitleComponent
            title={blogContent.author}
            avatar={blogContent.authorAvatar}
          />
        }
      >
        <div className="group relative h-full overflow-hidden rounded-2xl border border-pink-200 bg-gradient-to-br from-white to-pink-50 transition duration-200 hover:shadow-2xl hover:shadow-pink-200/50">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-gradient-to-br from-pink-100 to-purple-100">
            <img
              src={blogContent.image}
              alt="thumbnail"
              className="h-full w-full transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </div>
          <div className="p-6">
            <h2 className="my-3 text-xl font-bold font-display bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {blogContent.title}
            </h2>
            <h2 className="my-3 text-sm font-normal text-gray-600 leading-relaxed">
              {blogContent.description}
            </h2>
            <div className="mt-6 flex flex-row items-center justify-between">
              <span className="text-sm text-pink-600 font-medium">{blogContent.date}</span>
              <div className="relative z-10 block rounded-full bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-2 text-xs font-bold text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                Read More →
              </div>
            </div>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}

const blogContent = {
  slug: "delicious-custom-cakes",
  author: "Chef Priya",
  date: "4th December, 2025",
  title: "The Art of Custom Cake Design",
  description:
    "Discover how our master bakers craft personalized cakes that turn your dreams into delicious reality. Each creation is a masterpiece made with love.",
  image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
  authorAvatar: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=100&q=80",
};

const TitleComponent = ({
  title,
  avatar,
}: {
  title: string;
  avatar: string;
}) => (
  <div className="flex items-center space-x-2">
    <img
      src={avatar}
      height="20"
      width="20"
      alt="thumbnail"
      className="rounded-full border-2 border-pink-400 shadow-sm"
    />
    <p className="font-semibold text-pink-900">{title}</p>
  </div>
);
