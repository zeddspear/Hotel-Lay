import { hotelSearchParams } from "../../../slices/hotelApiSlice";
import { useState } from "react";
import { useSearchHotelsQuery } from "../../../slices/hotelApiSlice";
import { useSearchContext } from "../../../context/searchContext";
import SearchResultCard from "../../SearchResultCard";
import Pagination from "../../Pagination";
import StarFilter from "../../FilterComponents/StarFilter";
import HotelTypesFilter from "../../FilterComponents/TypesFilter";
import FacillitiesFilter from "../../FilterComponents/FacilitiesFilter";
import MaxPriceFilter from "../../FilterComponents/MaxPriceFilter";
import Spinner from "../../Spinner";

function SearchPage() {
  const Search = useSearchContext();

  const [page, setPage] = useState<number>(1);
  const [starsFilter, setStarsFilter] = useState<number>(5);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | undefined>(
    undefined
  );
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams: hotelSearchParams = {
    destination: Search?.destination,
    checkIn: Search?.checkIn.toISOString(),
    checkOut: Search?.checkOut.toISOString(),
    adultCount: Search?.adultCount.toString(),
    childCount: Search?.childCount.toString(),
    page: page.toString(),
    stars: starsFilter.toString(),
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedMaxPrice?.toString(),
    sortOption: sortOption,
  };

  const { data, isLoading, isFetching } = useSearchHotelsQuery(searchParams, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  function handleHotelTypesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedHotelType = e.target.value.toString();

    setSelectedHotelTypes((prev) => {
      if (prev.includes(selectedHotelType)) {
        return prev.filter((hoteltype) => selectedHotelType !== hoteltype);
      } else {
        return [...prev, selectedHotelType];
      }
    });
  }

  function handleFacilitiesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFacility = e.target.value.toString();

    setSelectedFacilities((prev) => {
      if (prev.includes(selectedFacility)) {
        return prev.filter((facility) => selectedFacility !== facility);
      } else {
        return [...prev, selectedFacility];
      }
    });
  }

  function handleMaxPrice(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedPrice = parseInt(e.target.value);

    setSelectedMaxPrice(selectedPrice);
  }

  if (isLoading || isFetching) {
    return (
      <div className="w-full h-full flex justify-center items-center px-5 min-h-screen">
        <Spinner width={"w-[50px]"} height={"h-[50px]"} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 pt-2 px-2 md:px-5 mt-3 pb-28 md:pt-5 relative">
      <div className="rounded border border-secondaryMain max-h-[150vh] p-5  top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-secondaryMain pb-5">
            Filters by:
          </h3>
          <StarFilter stars={starsFilter || 5} onStarChange={setStarsFilter} />
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypesChange}
          />
          <FacillitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilitiesChange}
          />
          <MaxPriceFilter
            selectedPrice={selectedMaxPrice}
            onChange={handleMaxPrice}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 p-2">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold border-b border-secondaryMain pb-2">
            {data?.pagination.total} Hotels Found{" "}
            {Search?.destination ? `in ${Search.destination}` : ""}
          </span>
          <div>
            <select
              className="p-2 w-full rounded-md border border-secondaryMain"
              value={sortOption}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSortOption(e.target.value)
              }
            >
              <option value={""}>Sort By</option>
              <option value={"starRating"}>Star Rating</option>
              <option value={"pricePerNightAsc"}>
                Price Per Night (low to high)
              </option>
              <option value={"pricePerNightDesc"}>
                Price Per Night (high to low)
              </option>
            </select>
          </div>
        </div>
        {data?.hotels.map((hotel) => {
          return <SearchResultCard key={hotel._id} hotel={hotel} />;
        })}
        <div>
          <Pagination
            page={data?.pagination.page || 1}
            pages={data?.pagination.pages!}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
export default SearchPage;
