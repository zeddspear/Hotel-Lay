import { useFormContext } from "react-hook-form";

function ImageUpload() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormType>();

  return (
    <>
      <div className="ImageUpload w-full pb-8 border-b-2 border-secondaryMain">
        <h2 className="text-2xl font-bold my-5">Select Images</h2>
        <div className="w-full">
          <input
            type="file"
            className="border-0"
            multiple
            accept="image/*"
            id="imageFiles"
            {...register("imageFiles", {
              validate: (images) => {
                if (images.length === 0) {
                  return "Atleast one image should be selected";
                }

                if (images.length > 6) {
                  return "Images should be no more than 6";
                }

                return true;
              },
            })}
          />
        </div>
        {errors.imageFiles && (
          <span className="text-sm ml-2 mt-2  mb-2 text-red-600 block">
            {errors.imageFiles.message}
          </span>
        )}
      </div>
    </>
  );
}
export default ImageUpload;
