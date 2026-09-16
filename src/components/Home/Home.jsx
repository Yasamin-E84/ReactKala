import Advertisments from "../Advertisments/Advertisments";
import Banner from "../banner/Banner";
import DeliveryIncredible from "../DeliveryIncredible/DeliveryIncredible";
import useFetch from "../Hooks/useFetch";
import Incredible from "../Incredible/Incredible";
import ServiceList from "../ServiceList/ServiceList";

const Home = () => {
  const { data: ads, error: adsError } = useFetch("http://localhost:5000/ads");
  const { data: ads2, error: ads2Error } = useFetch(
    "http://localhost:5000/ads2",
  );
  const { data: incredible, incredibleError } = useFetch("http://localhost:5000/incredible");
  const { data: incredible2, incredible2Error } = useFetch(
    "http://localhost:5000/amazingmobile",
  );

  if (adsError || ads2Error) {
    return (
      <div className="mx-auto mt-6 flex w-full max-w-325 items-center justify-center rounded-xl bg-red-50 py-10 text-red-600">
        Ads failed to load
      </div>
    );
  }
  if (incredibleError || incredible2Error) {
    return (
      <div className="mx-auto mt-6 flex w-full max-w-325 items-center justify-center rounded-xl bg-red-50 py-10 text-red-600">
        Incredible products failed to load
      </div>
    );
  }

  return (
    <div>
      <Banner />

      <ServiceList />

      <Incredible
        className="bg-[#ef334f]"
        classNameDesktop="bg-[#ef334f]"
        incredible={incredible}
      />

      <Advertisments ads={ads} />
      <DeliveryIncredible />
      <Advertisments ads={ads2} />
      <Incredible
        className="bg-[#6EB929]"
        classNameDesktop="bg-[#6EB929]"
        incredible={incredible2}
      />
    </div>
  );
};

export default Home;
