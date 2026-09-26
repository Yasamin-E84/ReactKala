import useFetch from "../Hooks/useFetch";
import DigikalaLoader from "../Loader/DigikalaLoader";
import { ProgressiveSection } from "../Loader/PageLoadSequence";

const HeaderBanner = () => {
  const { data, error, loading } = useFetch(
    "http://localhost:5000/HeaderBanner",
  );

  if (error) {
    return (
      <div
        className="
          flex
          h-full
          w-full
          items-center
          justify-center
          bg-red-50
          text-sm
          text-red-600
        "
      >
        Banner failed to load
      </div>
    );
  }
  if (loading) {
    return <DigikalaLoader minHeight="60px" />;
  }
  return (
    <ProgressiveSection order={0} ready={!loading} minHeight="60px">
      <div className="lg:h-15 overflow-hidden h-10">
        {data?.map((item) => (
          <img
            key={item.id}
            src={item.img}
            alt={item.alt}
            className="
              block
              h-full
              w-full
              object-cover
              object-center
            "
          />
        ))}
      </div>
    </ProgressiveSection>
  );
};

export default HeaderBanner;
