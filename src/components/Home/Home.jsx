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
import { ProgressiveSection } from "../Loader/PageLoadSequence";

const Home = () => {
  const {
    data: ads,
    error: adsError,
    loading: adsLoading,
  } = useFetch("http://localhost:5000/ads");
  const {
    data: ads2,
    error: ads2Error,
    loading: ads2Loading,
  } = useFetch("http://localhost:5000/ads2");
  const {
    data: incredible,
    error: incredibleError,
    loading: incredibleLoading,
  } = useFetch("http://localhost:5000/incredible");
  const {
    data: incredible2,
    error: incredible2Error,
    loading: incredible2Loading,
  } = useFetch("http://localhost:5000/amazingmobile");
  const { data: partner, loading: partnerLoading } = useFetch(
    "http://localhost:5000/partner",
  );

  const { data: partner2, loading: partner2Loading } = useFetch(
    "http://localhost:5000/partner2",
  );
  const { data: hotProducts, loading: hotLoading } = useFetch(
    "http://localhost:5000/hot",
  );
  const { data: indemandProducts, loading: indemandLoading } = useFetch(
    "http://localhost:5000/indemand",
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
      <ProgressiveSection order={1} minHeight="190px">
        <Banner />
      </ProgressiveSection>
      <ProgressiveSection order={2} minHeight="110px">
        <ServiceList />
      </ProgressiveSection>
      <ProgressiveSection
        order={3}
        ready={!incredibleLoading}
        minHeight="260px"
      >
        <Incredible
          className="bg-[#ef334f]"
          classNameDesktop="bg-[#ef334f]"
          incredible={incredible}
        />
      </ProgressiveSection>
      <ProgressiveSection order={4} ready={!adsLoading} minHeight="150px">
        <Advertisments ads={ads} />
      </ProgressiveSection>
      <ProgressiveSection order={5} minHeight="300px">
        <DeliveryIncredible />
      </ProgressiveSection>
      <ProgressiveSection order={6} ready={!ads2Loading} minHeight="150px">
        <Advertisments ads={ads2} />
      </ProgressiveSection>
      <ProgressiveSection
        order={7}
        ready={!incredible2Loading}
        minHeight="260px"
      >
        <Incredible
          className="bg-[#6EB929]"
          classNameDesktop="bg-[#6EB929]"
          incredible={incredible2}
        />
      </ProgressiveSection>
      <ProgressiveSection order={8} minHeight="180px">
        <Grouping />
      </ProgressiveSection>
      <ProgressiveSection order={9} ready={!partnerLoading} minHeight="160px">
        <Partner partners={partner} />
      </ProgressiveSection>
      <ProgressiveSection order={10} minHeight="280px">
        <ProductRecommendation api="healthProducts" />
      </ProgressiveSection>
      <ProgressiveSection order={11} minHeight="280px">
        <ProductRecommendation api="schoolProducts" />
      </ProgressiveSection>
      <ProgressiveSection order={12} ready={!partner2Loading} minHeight="160px">
        <Partner partners={partner2} />
      </ProgressiveSection>
      <ProgressiveSection order={13} minHeight="280px">
        <ProductRecommendation api="mobileProducts" />
      </ProgressiveSection>
      <ProgressiveSection order={14} minHeight="280px">
        <ProductRecommendation api="gamingProducts" />
      </ProgressiveSection>
      <ProgressiveSection order={15} minHeight="280px">
        <ProductRecommendation api="beautyProducts" />
      </ProgressiveSection>
      <ProgressiveSection order={16} minHeight="220px">
        <Brands />
      </ProgressiveSection>
      <ProgressiveSection order={17} minHeight="280px">
        <ProductRecommendation api="carProducts" />
      </ProgressiveSection>
      <ProgressiveSection order={18} minHeight="280px">
        <ProductRecommendation api="artProducts" />
      </ProgressiveSection>
      <ProgressiveSection order={19} ready={!hotLoading} minHeight="280px">
        <RankedProducts
          title="پرفروش‌ترین‌ها"
          icon="/images/hot.svg"
          products={hotProducts}
        />
      </ProgressiveSection>
      <ProgressiveSection order={20} ready={!indemandLoading} minHeight="280px">
        <RankedProducts
          title="داغ‌ترین چند ساعت گذشته"
          icon="/images/hot.svg"
          products={indemandProducts}
        />
      </ProgressiveSection>
      <ProgressiveSection order={21} minHeight="500px">
        <Suggestion api="chosen" />
      </ProgressiveSection>
        <FixedHelp />
        <MobileBottomNav />
      <FixedHelp/>
    </div>
  );
};

export default Home;
