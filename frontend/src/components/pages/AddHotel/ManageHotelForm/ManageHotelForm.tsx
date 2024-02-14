import { FormProvider, useForm } from "react-hook-form";
import FormDetails from "./FormDetails";
import TypesHotel from "./TypesHotel";
import Facilities from "./Facilities";
import Guests from "./Guests";
import ImageUpload from "./ImageUpload";
import { useAddHotelMutation } from "../../../../slices/hotelApiSlice";
import toast from "react-hot-toast";
import Spinner from "../../../Spinner";
import { hotelType } from "../../../../../../backend/src/shared/types";
import { useEffect } from "react";

function ManageHotelForm({
  isEditHotelId,
  hotel,
  updateHotelInDb,
  isLoadingUpdateButton,
}: {
  isEditHotelId: string;
  hotel: hotelType | undefined;
  updateHotelInDb: any;
  isLoadingUpdateButton: boolean;
}) {
  const formMethods = useForm<HotelFormType>();
  const { handleSubmit, reset, watch } = formMethods;

  const [addHotelToDb, { isLoading }] = useAddHotelMutation();

  const existingImageUrls = watch("imgsURLs");

  useEffect(() => {
    if (hotel && isEditHotelId) {
      reset(hotel);
    }
  }, [hotel, reset]);

  const submitHandler = handleSubmit(async (FormDataJSON: HotelFormType) => {
    // Convert formdata-json into formdata multi-part
    const formData = new FormData();

    if (isEditHotelId && hotel) {
      formData.append("id", hotel._id);
    }

    formData.append("name", FormDataJSON.name);
    formData.append("city", FormDataJSON.city);
    formData.append("country", FormDataJSON.country);
    formData.append("description", FormDataJSON.description);
    formData.append("type", FormDataJSON.type);
    formData.append("adultCount", FormDataJSON.adultCount.toString());
    formData.append("childCount", FormDataJSON.childCount.toString());
    formData.append("pricePerNight", FormDataJSON.pricePerNight.toString());
    formData.append("starRating", FormDataJSON.starRating.toString());

    FormDataJSON.facilities.forEach((facility: string) => {
      formData.append(`facilities`, facility);
    });

    Array.from(FormDataJSON.imageFiles).forEach((file) => {
      formData.append("imageFiles", file);
    });

    existingImageUrls.forEach((imgURL) => {
      formData.append("imgsURLs", imgURL);
    });

    if (hotel && isEditHotelId !== "" && updateHotelInDb) {
      // If manage form is used for updating hotel then submit will make this PUT request
      try {
        console.log("update request made");
        await updateHotelInDb(formData).unwrap();
        toast.success("Hotel Updated");
      } catch (err: any) {
        console.log(err);
        toast.error(err.data.message);
      }
    } else {
      // If manage form is used for adding a new hotel then submit will make this POST request
      try {
        const res = await addHotelToDb(formData).unwrap();
        console.log(res);
        toast.success("Hotel Submitted");
      } catch (err: any) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  });

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          onSubmit={submitHandler}
          className="max-w-[650px] w-full min-w-[280px] flex justify-center items-center flex-col"
        >
          <h2 className="my-5 text-3xl font-bold self-start">
            {isEditHotelId ? hotel?.name : "Add Hotel"}
          </h2>

          <FormDetails />
          <TypesHotel />
          <Facilities />
          <Guests />
          <ImageUpload />

          {isLoadingUpdateButton || isLoading ? (
            <div className="self-end py-1 px-2 my-3">
              <Spinner />
            </div>
          ) : (
            <button type="submit" className="self-end btn2">
              Submit
            </button>
          )}
        </form>
      </FormProvider>
    </>
  );
}
export default ManageHotelForm;
