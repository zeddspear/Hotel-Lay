import { FormProvider, useForm } from "react-hook-form";
import FormDetails from "./FormDetails";
import TypesHotel from "./TypesHotel";
import Facilities from "./Facilities";
import Guests from "./Guests";
import ImageUpload from "./ImageUpload";
import { useAddHotelMutation } from "../../../../slices/hotelApiSlice";
import toast from "react-hot-toast";
import Spinner from "../../../Spinner";

function ManageHotelForm() {
  const formMethods = useForm<HotelFormType>();
  const { handleSubmit } = formMethods;

  const [addHotelToDb, { isLoading }] = useAddHotelMutation();

  const submitHandler = handleSubmit(async (FormDataJSON: HotelFormType) => {
    // Convert formdata-json into formdata multi-part
    const formData = new FormData();
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

    try {
      const res = await addHotelToDb(formData).unwrap();
      console.log(res);
      toast.success("Hotel Submitted");
    } catch (err: any) {
      console.log(err);
      toast.error(err.data.message);
    }
  });

  return (
    <>
      <FormProvider {...formMethods}>
        <form
          onSubmit={submitHandler}
          className="px-2 max-w-[650px] w-full min-w-[280px] flex justify-center items-center flex-col"
        >
          <FormDetails />
          <TypesHotel />
          <Facilities />
          <Guests />
          <ImageUpload />
          {isLoading ? (
            <Spinner />
          ) : (
            <button type="submit" className=" self-end btn2">
              Submit
            </button>
          )}
        </form>
      </FormProvider>
    </>
  );
}
export default ManageHotelForm;
