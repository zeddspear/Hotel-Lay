import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../hotel-config-types";

function TypesHotel() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormType>();

  const selectedType: string = watch("type");

  return (
    <div className="hotelTypes w-full border-b-2 border-secondaryMain pb-8">
      <h2 className="text-2xl my-5 font-bold">Hotel Type</h2>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-5">
        {hotelTypes.map((type: string, idx: number) => {
          return (
            <label
              className={`py-1 px-2 ${
                selectedType === type
                  ? "bg-secondaryMain text-white"
                  : "bg-gray-400"
              } rounded-sm cursor-pointer transition-colors hover:bg-secondaryMain hover:text-white`}
              key={idx}
            >
              <input
                type="radio"
                id="hotelType"
                className="hotelType hidden"
                value={type}
                {...register("type", { required: "Hotel type is required" })}
              />
              <span>{type}</span>
            </label>
          );
        })}
        {errors.type && (
          <span className="text-sm -mt-2 mb-2 text-red-600 block">
            {errors.type.message}
          </span>
        )}
      </div>
    </div>
  );
}
export default TypesHotel;
