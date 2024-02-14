import { useFormContext } from "react-hook-form";
import { MouseEvent } from "react";
function ImageUpload() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormType>();

  const existingImageUrls = watch("imgsURLs");

  const handleDelete = function (
    e: MouseEvent<HTMLButtonElement>,
    imgUrl: string
  ) {
    e.preventDefault();
    setValue(
      "imgsURLs",
      existingImageUrls.filter((img) => img !== imgUrl)
    );
  };

  return (
    <>
      <div className="ImageUpload w-full pb-8 border-b-2 border-secondaryMain">
        <h2 className="text-2xl font-bold my-5">Select Images</h2>
        <div className="w-full border border-gray-400 p-1">
          <div className="imgsContainer grid grid-cols-6 grid-flow-row gap-4 mb-5">
            {existingImageUrls?.map((img, idx) => {
              return (
                <div
                  className="relative group col-span-2  md:col-span-1"
                  key={idx}
                >
                  <img
                    className="min-h-[150px]  object-cover"
                    src={img}
                    alt={img.split("/")[-1]}
                  />
                  <button
                    onClick={(e: MouseEvent<HTMLButtonElement>) =>
                      handleDelete(e, img)
                    }
                    className="absolute inset-0 flex justify-center items-center bg-black w-full bg-opacity-50 opacity-0 group-hover:opacity-100 text-red-500 drop-shadow-md font-semibold"
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </div>
          <input
            type="file"
            className="border-0"
            multiple
            accept="image/*"
            id="imageFiles"
            {...register("imageFiles", {
              validate: (images) => {
                const totalLength =
                  images.length + (existingImageUrls?.length || 0);
                if (totalLength === 0) {
                  return "Atleast one image should be selected";
                }

                if (totalLength > 6) {
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
