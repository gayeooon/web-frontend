import { AlertTriangle, RefreshCw, Home, Settings } from 'lucide-react';

export const DefaultErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          문제가 발생했습니다
        </h1>
        <p className="text-gray-600 mb-6">{error?.toString()}</p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="flex items-center gap-2 px-4 py-2 bg-my-purple text-white rounded-lg"
          >
            <RefreshCw className="h-4 w-4" />
            다시 시도
          </button>
          <button
            onClick={() => window.location.replace('/')}
            className="flex items-center gap-2 px-4 py-2 bg-dfbt-disabled text-white rounded-lg"
          >
            <Home className="h-4 w-4" />
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
};

export const PublisherErrorFallback = ({ error, resetErrorBoundary }) => {
  const isPublisherCookieError =
    error?.response?.data?.message?.includes('publishers 쿠키');
  if (!isPublisherCookieError) {
    throw error;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <Settings className="mx-auto h-12 w-12 text-my-green mb-4" />
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          설정이 필요합니다
        </h1>
        <p className="text-gray-600 mb-6">
          언론사 정보가 설정되지 않았습니다.
          <br />
          설정 페이지에서 관심 있는 언론사를 선택해주세요.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={resetErrorBoundary}
            className="flex items-center gap-2 px-6 py-2 bg-my-green text-white rounded-lg"
          >
            <Settings className="h-4 w-4" />
            설정하러 가기
          </button>
        </div>
      </div>
    </div>
  );
};
