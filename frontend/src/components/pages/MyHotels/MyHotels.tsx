import { Link } from "react-router-dom";
import Hotel from "./Hotel";
import { useGetHotelsQuery } from "../../../slices/hotelApiSlice";
import Spinner from "../../Spinner/Spinner.tsx";
import toast from "react-hot-toast";

function MyHotels() {
  const { data, isLoading, error } = useGetHotelsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center px-5 min-h-screen">
        <Spinner width="w-[50px]" height="h-[50px]" />
      </div>
    );
  }

  if (error) {
    toast.error("Error occured while fetching hotels");
    return <p>Error occured while fetching hotels</p>;
  }

  return (
    <>
      <div className="myHotel flex flex-col justify-center items-center pb-24">
        <div className="container max-w-[1200px] px-3 space-y-5 py-5">
          <div className="flex justify-between items-center py-3">
            <h2 className="text-3xl font-bold">My Hotels</h2>
            <Link className="btn2" to={"/add-hotel"}>
              Add Hotel
            </Link>
          </div>

          {data!.length > 0 ? (
            data!.map((hotel) => {
              return <Hotel key={hotel._id} {...hotel} />;
            })
          ) : (
            <p>No hotel available in the database.</p>
          )}
        </div>
      </div>
    </>
  );
}
export default MyHotels;
