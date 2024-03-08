import SearchBar from "../SearchBar";

function Hero() {
  return (
    <div className="w-full bg-secondaryMain text-white">
      <div className="container px-5 md:px-10 pt-10 pb-16">
        <h1 className="text-2xl font-bold leading-normal">
          Find your next stay
        </h1>
        <p className="text-sm text-gray-300">
          Search low prices on hotels for your dream vacation 🏨
        </p>
      </div>
      <SearchBar />
    </div>
  );
}
export default Hero;
