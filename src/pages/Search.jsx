import NavigationBar from "@/components/ui/custom/NavigationBar";
import NewsList from "@/components/news/NewsList";
import CategoryNewsCarousel from "@/components/search/CategoryNewsCarousel";
import RecentSearches from "@/components/search/RecentSearches";
import SearchInput from "@/components/search/SearchInput";
import { useState } from "react";
import PageLayout from "@/components/ui/custom/PageLayout";

const categoryList = ["경제", "사회", "연예"];

const Search = () => {
  const [search, setSearch] = useState("");

  const onClickRecents = (recent) => {
    setSearch(recent);
  };

  return (
    <PageLayout page="search">
      <div className="sticky top-0 bg-white z-50 pb-2">
        <SearchInput setSearch={setSearch} />
      </div>
      <RecentSearches search={search} onClickRecents={onClickRecents} />
      <div className="h-0 w-full border-[0.5px] border-border my-8"></div>
      {!search ? (
        categoryList.map((category) => (
          <CategoryNewsCarousel key={category} category={category} />
        ))
      ) : (
        <>
          <div className="m-6 mt-0 text-xl font-extrabold">{`"${search}"에 대한 뉴스`}</div>
          <NewsList search={search} />
        </>
      )}

      <NavigationBar />
    </PageLayout>
  );
};

export default Search;
