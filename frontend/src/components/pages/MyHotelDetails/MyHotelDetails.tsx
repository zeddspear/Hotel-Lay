import ManageHotelForm from "../AddHotel/ManageHotelForm";
import { useParams } from "react-router-dom";
import {
  useGetSingleHotelQuery,
  useUpdateHotelMutation,
} from "../../../slices/hotelApiSlice";

function MyHotelDetails() {
  const { id } = useParams();

  const { data } = useGetSingleHotelQuery(id!);

  const [updateHotelInDb, { isLoading }] = useUpdateHotelMutation();

  return (
    <>
      <div className="flex justify-center items-center flex-col px-5 pt-5 pb-28 ">
        <ManageHotelForm
          isEditHotelId={id!}
          hotel={data}
          updateHotelInDb={updateHotelInDb}
          isLoadingUpdateButton={isLoading}
        />
      </div>
    </>
  );
}
export default MyHotelDetails;
