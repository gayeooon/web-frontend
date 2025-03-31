'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/main/Header';
import CategoryList from '@/components/main/CategoryList';
import HeadlineNewsCarousel from '@/components/main/HeadlineNewsCarousel';
import NewsList from '@/components/news/NewsList';
import NavigationBar from '@/components/ui/custom/NavigationBar';
import PageLayout from '@/components/ui/custom/PageLayout';
import { useUser } from '@/contexts/UserProvider';
import { MIN_SELECTIONS, MIN_SUBSCRIPTIONS } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';
import { useToaster } from '@/contexts/ToasterProvider';

const Main = () => {
  const [category, setCategory] = useState('allCategory');
  const navigate = useNavigate();
  const { categories, publishers } = useUser();
  const toast = useToaster();

  useEffect(() => {
    if (categories && publishers) {
      if (
        categories.length < MIN_SELECTIONS ||
        publishers.length < MIN_SUBSCRIPTIONS
      ) {
        navigate('/signup');
        toast('error', '회원가입을 완료해주세요.');
      }
    }
  }, [categories, publishers, navigate]);

  return (
    <PageLayout page="main">
      <Header />
      <div className="sticky top-0 bg-gradient-to-b from-white to-white/90 z-10 py-6">
        <CategoryList
          selectedCategory={category}
          setSelectedCategory={setCategory}
        />
      </div>
      <h2 className="text-xl font-extrabold m-6 mt-0">헤드라인 뉴스</h2>
      <HeadlineNewsCarousel className="z-0" />
      <h2 className="text-xl font-extrabold m-6 mt-10">
        구독한 언론사의 최신 뉴스
      </h2>
      <NewsList category={category} />
      <NavigationBar />
    </PageLayout>
  );
};

export default Main;
