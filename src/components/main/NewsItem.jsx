import publisherImg from "@/assets/apple_logo_black.png";

export default function NewsItem({ news }) {
  return (
    <div className="flex gap-6 px-4 py-6 border-b border-border hover:cursor-pointer">
      {news.image && (
        <div className="w-28 aspect-square overflow-hidden rounded-lg">
          <img
            className="w-full h-full object-cover"
            src={news.image}
            alt={news.title}
          />
        </div>
      )}
      <div className="w-3/4">
        <div className="mb-4">
          <h2 className="font-bold hover:underline line-clamp-2">
            {news.title}
          </h2>
        </div>
        <div className="flex items-center">
          <div className="w-5 h-5 mr-2">
            <img
              className="w-full h-full rounded-full"
              src={publisherImg}
              alt="Publisher"
            />
          </div>
          <span className="text-sm font-bold text-gray-600">
            {news.publisher}
          </span>
          <span className="mx-2">·</span>
          <span className="text-sm text-gray-400">{news.time}</span>
        </div>
      </div>
    </div>
  );
}
