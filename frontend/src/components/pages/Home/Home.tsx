import { hotelType } from "../../../../../backend/src/shared/types";
import { useLastAddedHotelsQuery } from "../../../slices/hotelApiSlice";
import Spinner from "../../Spinner";
import BigCard from "./BigCard";
import SmallCard from "./SmallCard";

function Home() {
  const { data, isLoading } = useLastAddedHotelsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center px-5 min-h-screen">
          <Spinner width={"w-[50px]"} height={"h-[50px]"} />
        </div>
      )}

      {!isLoading && (
        <div className="w-full h-full py-10 flex justify-center items-center pb-[200px]">
          <div className="w-full max-w-[1000px] flex justify-start items-center flex-col px-10">
            <div className="w-full mb-2">
              <h1 className="text-2xl font-bold">Latest Destinations</h1>
              <p>Most recent destinations added on out website.</p>
            </div>
            <div className="w-full flex justify-center items-center gap-5 py-5 border-t border-secondaryMain">
              {data?.slice(0, 2).map((hotel: hotelType) => (
                <BigCard key={hotel._id} {...hotel} />
              ))}
            </div>
            <div className="w-full flex justify-center items-center gap-5 py-5 flex-wrap border-t border-secondaryMain">
              {/* div for small cards and it would be a flex-wrapped div */}
              {data?.slice(2).map((hotel: hotelType) => (
                <SmallCard key={hotel._id} {...hotel} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Home;
