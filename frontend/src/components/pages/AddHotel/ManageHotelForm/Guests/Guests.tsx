import { useFormContext } from "react-hook-form";

function Guests() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormType>();

  return (
    <>
      <div className="w-full pb-8 Guests border-b-2 border-secondaryMain">
        <h2 className="text-2xl font-bold my-5">Guests</h2>
        <div className="flex flex-col sm:flex-row justify-around items-center gap-2 pt-3 pb-7 px-3 rounded-sm  bg-gray-400">
          <div>
            <label className="block" htmlFor="adultCount">
              Adults
            </label>
            <input
              type="number"
              id="adultCount"
              className="adultCount text-black"
              min={1}
              {...register("adultCount", {
                required: "Adult count is required",
              })}
            />
            {errors.adultCount && (
              <span className="text-sm  mb-2 text-red-600 block">
                {errors.adultCount.message}
              </span>
            )}
          </div>
          <div>
            <label className="block" htmlFor="childCount">
              Children
            </label>
            <input
              type="number"
              id="childCount"
              min={1}
              className="childCount text-black"
              {...register("childCount", {
                required: "Child count is required",
              })}
            />
            {errors.childCount && (
              <span className="text-sm  mb-2 text-red-600 block">
                {errors.childCount.message}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Guests;
