import { useRouter } from 'next/router';
import IcHome from '@/assets/IcHome';
import IcSearch from '@/assets/IcSearch';
import IcMyPage from '@/assets/IcMyPage';

const NavigationBar = () => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="nav-bar">
      <button
        className="flex flex-col justify-center items-center w-6 gap-1"
        onClick={() =>
          pathname === '/' ? window.location.reload() : router.push('/')
        }
      >
        <IcHome active={pathname === '/'} />
        <div
          className={`text-xs ${pathname === '/' || 'text-txt-placeholder'}`}
        >
          홈
        </div>
      </button>

      <button
        className="flex flex-col justify-center items-center w-6 gap-1"
        onClick={() =>
          pathname === '/search'
            ? window.location.reload()
            : router.push('/search')
        }
      >
        <IcSearch active={pathname === '/search'} />
        <div
          className={`text-xs ${
            pathname === '/search' || 'text-txt-placeholder'
          }`}
        >
          검색
        </div>
      </button>

      <button
        className="flex flex-col justify-center items-center w-6 gap-1"
        onClick={() =>
          pathname === '/user' ? window.location.reload() : router.push('/user')
        }
      >
        <IcMyPage active={pathname === '/user'} />
        <div
          className={`text-xs ${
            pathname === '/user' || 'text-txt-placeholder'
          }`}
        >
          마이
        </div>
      </button>
    </div>
  );
};

export default NavigationBar;
