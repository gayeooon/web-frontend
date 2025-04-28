import { useState } from 'react';
import Header from '@/components/main/Header';
import CategoryList from '@/components/main/CategoryList';
import HeadlineNewsCarousel from '@/components/main/HeadlineNewsCarousel';
import NewsList from '@/components/news/NewsList';
import NavigationBar from '@/components/ui/custom/NavigationBar';
import PageLayout from '@/components/ui/custom/PageLayout';

const Main = () => {
  const [category, setCategory] = useState('allCategory');

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
      <NewsList type="category" keyword={category} />
      <NavigationBar />
    </PageLayout>
  );
};

export default Main;
