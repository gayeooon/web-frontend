import home_default from '@/assets/home_default.svg';
import home_green from '@/assets/home_green.svg';
import search_default from '@/assets/search_default.svg';
import search_green from '@/assets/search_green.svg';
import my_default from '@/assets/my_default.svg';
import my_green from '@/assets/my_green.svg';
import { useRouter } from 'next/router';

export default function NavigationBar() {
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
        <img
          className="w-full h-full"
          src={pathname === '/' ? home_green.src : home_default.src}
          alt="home"
        />
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
        <img
          className="w-full h-full"
          src={pathname === '/search' ? search_green.src : search_default.src}
          alt="search-icon"
        />
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
        <img
          className="w-full h-full"
          src={pathname === '/user' ? my_green.src : my_default.src}
          alt="my-icon"
        />
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
}
