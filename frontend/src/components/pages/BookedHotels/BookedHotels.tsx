import { is } from "date-fns/locale";
import { hotelType } from "../../../../../backend/src/shared/types";
import { useGetBookingsOfUserQuery } from "../../../slices/userApiSlice";
import HotelCard from "./HotelCard";
function BookedHotels() {
  const { data, isLoading } = useGetBookingsOfUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  console.log(data);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <div className="w-full h-full py-10 px-5 flex justify-center">
          <div className="min-w-[300px] max-w-[800px] w-full flex flex-col items-center px-10 gap-5 pb-20">
            <h1 className="text-3xl font-bold w-full text-start">
              Booked Hotels
            </h1>
            {data?.map((hotel: hotelType) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
export default BookedHotels;
