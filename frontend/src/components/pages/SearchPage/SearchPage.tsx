import { hotelSearchParams } from "../../../slices/hotelApiSlice";
import { useState } from "react";
import { useSearchHotelsQuery } from "../../../slices/hotelApiSlice";
import { useSearchContext } from "../../../context/searchContext";
import SearchResultCard from "../../SearchResultCard";

function SearchPage() {
  const Search = useSearchContext();

  const [page] = useState<number>(1);

  const searchParams: hotelSearchParams = {
    destination: Search?.destination,
    checkIn: Search?.checkIn.toISOString(),
    checkOut: Search?.checkOut.toISOString(),
    adultCount: Search?.adultCount.toString(),
    childCount: Search?.childCount.toString(),
    page: page.toString(),
  };

  const { data, isLoading } = useSearchHotelsQuery(searchParams, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 pt-2 px-2 md:px-5 mt-3 pb-28 md:pt-5">
      <div className="rounded border border-secondaryMain min-h-fit p-5 lg:sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-secondaryMain pb-5">
            Filters by:
          </h3>
        </div>
      </div>
      <div className="flex flex-col gap-5 p-2">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold border-b border-secondaryMain pb-2">
            {data?.pagination.total} Hotels Found{" "}
            {Search?.destination ? `in ${Search.destination}` : ""}
          </span>
          {/* Sort options */}
        </div>
        {data?.hotels.map((hotel) => {
          return <SearchResultCard key={hotel._id} hotel={hotel} />;
        })}
      </div>
    </div>
  );
}
export default SearchPage;
