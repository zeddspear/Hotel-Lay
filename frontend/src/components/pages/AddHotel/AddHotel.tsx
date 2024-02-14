import ManageHotelForm from "./ManageHotelForm";

function AddHotel() {
  return (
    <div className="flex justify-center items-center px-5 pt-5 pb-28">
      <ManageHotelForm
        isEditHotelId={""}
        hotel={undefined}
        updateHotelInDb={undefined}
        isLoadingUpdateButton={false}
      />
    </div>
  );
}
export default AddHotel;
