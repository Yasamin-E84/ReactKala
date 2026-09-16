import Logo from "./Logo";
import Search from "./Search/Search";
import User from "./User/User";

const SearchBar = () => {
  return (
    <div className="absolute top-0 left-0 z-[300] w-full bg-white">
      <div className="mx-auto flex max-w-[2400px] min-w-350 w-[95%] items-center justify-between px-4 pt-4 pb-3 max-h-20">
        <div className="flex items-center justify-center gap-4">
          <Logo />
          <Search />
        </div>

        <User />
      </div>
    </div>
  );
};

export default SearchBar;