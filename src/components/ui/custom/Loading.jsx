// 작은 크기의 인라인 스피너
export const SpinnerIcon = () => {
  return (
    <div className="animate-spin h-5 w-5 border-4 border-gray-300 border-t-white rounded-full" />
  );
};

// 페이지 전체를 덮는 로딩
export const PageSpinner = () => {
  return (
    <div className="fixed inset-0 bg-white/80 z-50 flex items-center justify-center opacity-50">
      <div className="animate-spin h-8 w-8 border-4 border-gray-500 border-t-white rounded-full" />
    </div>
  );
};

export const NewsSkeleton = () => {
  return (
    <div className="flex min-h-32 gap-6 px-4 py-4 border-b border-border sm:min-h-36">
      <div className="w-1/4 h-24 min-w-24 sm:h-28 animate-pulse bg-gray-200 rounded-lg" />
      <div className="flex flex-col justify-between py-2 w-3/4 gap-6">
        <div className="w-full h-full animate-pulse bg-gray-200" />
        <div className="w-full h-full animate-pulse bg-gray-200" />
      </div>
    </div>
  );
};

export const CarouselSkeleton = () => {
  return (
    <div className="absolute inset-0 bg-gray-100 rounded-lg">
      <div className="absolute flex flex-col h-full w-full justify-between p-4 sm:p-6">
        <div className="w-full h-1/2 animate-pulse bg-gray-200 rounded-lg" />
        <div className="w-full h-1/4 animate-pulse bg-gray-200 rounded-lg" />
        <div />
      </div>
    </div>
  );
};
