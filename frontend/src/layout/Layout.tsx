import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";

function Layout() {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      <Header />
      {location.pathname.includes("register") ||
      location.pathname.includes("login") ? null : (
        <Hero />
      )}
      <Outlet />
      <Footer />
    </div>
  );
}
export default Layout;
