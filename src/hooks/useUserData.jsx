import { useState, useEffect } from 'react';
import useGetUserInfo from '@/hooks/queries/user/useGetUserInfo';
import useGetUserCategories from '@/hooks/queries/user/useGetUserCategories';
import useGetUserPublishers from '@/hooks/queries/user/useGetUserPublishers';

// 기본 사용자 데이터 구조
const DEFAULT_USER_DATA = {
  memberInfo: {
    name: '',
    email: '',
    phone: '',
    gender: '',
    birth: '',
  },
  categories: [],
  publishers: [],
};

const useUserData = ({ page = 'signup' }) => {
  const [localUserData, setLocalUserData] = useState(DEFAULT_USER_DATA);
  const [isLoading, setIsLoading] = useState(true);

  // setting 모드일 때만 서버 데이터 fetch
  const { data: userInfo, isError: isErrorInfo } = useGetUserInfo(
    page === 'setting'
  );

  const { data: userCategories, isError: isErrorCategories } =
    useGetUserCategories(page === 'setting');

  const { data: userPublishers, isError: isErrorPublishers } =
    useGetUserPublishers(page === 'setting');

  const isError = isErrorInfo || isErrorCategories || isErrorPublishers;

  useEffect(() => {
    if (page === 'setting') {
      if (userInfo && userCategories && userPublishers) {
        setLocalUserData({
          memberInfo: {
            name: userInfo.name || '',
            email: userInfo.email || '',
            phone: userInfo.phone || '',
            gender: userInfo.gender || '',
            birth: userInfo.birth || '',
          },
          categories: userCategories || [],
          publishers: userPublishers || [],
        });
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [page, userInfo, userCategories, userPublishers]);

  // 유저 정보 업데이트
  const updateMemberInfo = (updates) => {
    setLocalUserData((prev) => ({
      ...prev,
      memberInfo: {
        ...prev.memberInfo,
        ...updates,
      },
    }));
  };

  // 카테고리 업데이트
  const updateCategories = (categories) => {
    setLocalUserData((prev) => ({
      ...prev,
      categories,
    }));
  };

  // 퍼블리셔 업데이트
  const updatePublishers = (publishers) => {
    setLocalUserData((prev) => ({
      ...prev,
      publishers,
    }));
  };

  return {
    userData: localUserData,
    isLoading,
    isError,

    // 업데이트 함수들
    updateMemberInfo,
    updateCategories,
    updatePublishers,
  };
};

export default useUserData;
