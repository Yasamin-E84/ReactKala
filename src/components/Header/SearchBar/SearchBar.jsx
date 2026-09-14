import Logo from "./Logo";
import Search from "./Search/Search";
import User from "./User/User";

const SearchBar = () => {
  return (
    <div className="flex justify-between items-center px-4 pt-4 max-w-[2400px] min-w-[1400px] w-[95%] mx-auto max-h-20 pb-3">
      <div className="flex justify-center items-center gap-4">
        <Logo />
        <Search />
      </div>
      <User />
    </div>
  );
};

export default SearchBar;
