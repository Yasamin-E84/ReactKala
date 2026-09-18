import useFetch from "../Hooks/useFetch";
import DesktopFooter from "./DesktopFooter";
import MobileFooter from "./MobileFooter";

export default function Footer() {
  const { data: footerData, error } = useFetch("http://localhost:5000/footer");

  if (error || !footerData) return null;

  return (
    <footer className="mt-12">
      <DesktopFooter data={footerData} />
      <MobileFooter data={footerData} />
    </footer>
  );
}
