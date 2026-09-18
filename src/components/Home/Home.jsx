import Advertisments from "../Advertisments/Advertisments";
import Banner from "../banner/Banner";
import Brands from "../Brands/Brands";
import DeliveryIncredible from "../DeliveryIncredible/DeliveryIncredible";
import FixedHelp from "../FixedHelp/FixedHelp";
import MobileBottomNav from "../Header/Mobile/MobileBottomNav";
import useFetch from "../Hooks/useFetch";
import Incredible from "../Incredible/Incredible";
import Partner from "../Partner/Partner";
import ProductRecommendation from "../ProductRecommendation/ProductRecommendation";
import RankedProducts from "../RankedProducts/RankedProducts";
import ServiceList from "../ServiceList/ServiceList";
import Suggestion from "../Suggestion/Suggestion";
import Grouping from "../WeirdGroup/WeirdGrouping";
const Home = () => {
  const { data: ads, error: adsError } = useFetch("http://localhost:5000/ads");
  const { data: ads2, error: ads2Error } = useFetch(
    "http://localhost:5000/ads2",
  );
  const { data: incredible, incredibleError } = useFetch(
    "http://localhost:5000/incredible",
  );
  const { data: incredible2, incredible2Error } = useFetch(
    "http://localhost:5000/amazingmobile",
  );
  const { data: partner } = useFetch("http://localhost:5000/partner");

  const { data: partner2 } = useFetch("http://localhost:5000/partner2");
  const { data: hotProducts } = useFetch("http://localhost:5000/hot");
  const { data: indemandProducts } = useFetch("http://localhost:5000/indemand");

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
      <Grouping />
      <Partner partners={partner} />
      <ProductRecommendation api="healthProducts" />
      <ProductRecommendation api="schoolProducts" />
      <Partner partners={partner2} />
      <ProductRecommendation api="mobileProducts" />
      <ProductRecommendation api="gamingProducts" />
      <ProductRecommendation api="beautyProducts" />
      <Brands />
      <ProductRecommendation api="carProducts" />
      <ProductRecommendation api="artProducts" />
      <RankedProducts
        title="پرفروش‌ترین‌ها"
        icon="/images/hot.svg"
        products={hotProducts}
      />
      <RankedProducts
        title="داغ‌ترین چند ساعت گذشته"
        icon="/images/hot.svg"
        products={indemandProducts}
      />
      <Suggestion api="chosen"/>
      <FixedHelp/>
      <MobileBottomNav/>
    </div>
  );
};

export default Home;
