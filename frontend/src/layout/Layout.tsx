import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";

function Layout() {
  const location = useLocation();

  return (
    <div className="flex flex-col relative min-h-[100dvh]">
      <Header />
      {location.pathname.includes("register") ||
      location.pathname.includes("login") ||
      location.pathname.includes("add-hotel") ||
      location.pathname.includes("my-hotels") ||
      location.pathname.includes("hotels") ||
      location.pathname.includes("mybookings") ? null : (
        <Hero />
      )}
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
