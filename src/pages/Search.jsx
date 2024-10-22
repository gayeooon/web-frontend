import NavigationBar from "@/components/common/NavigationBar";
import CategoryNewsCarousel from "@/components/search/CategoryNewsCarousel";
import RecentSearches from "@/components/search/RecentSearches";
import SearchInput from "@/components/search/SearchInput";

const categoryList = ["IT / 과학", "경제", "생활 / 문화"];
const Search = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full max-w-2xl mb-32">
        <SearchInput />
        <RecentSearches />
        <div className="h-0 w-full border-[0.5px] border-border my-8"></div>
        {categoryList.map((category) => (
          <CategoryNewsCarousel category={category} />
        ))}

        <NavigationBar />
      </div>
    </div>
  );
};

export default Search;
