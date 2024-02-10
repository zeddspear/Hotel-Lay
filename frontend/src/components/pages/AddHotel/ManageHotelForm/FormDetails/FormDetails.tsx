import { useFormContext } from "react-hook-form";

function FormDetails() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormType>();

  return (
    <div className="formDetails pb-8 flex flex-col w-full  border-b-2 border-secondaryMain ">
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        {...register("name", { required: "Name is required" })}
      />
      {errors.name && (
        <span className="text-sm -mt-2 mb-2 text-red-600 block">
          {errors.name.message}
        </span>
      )}
      <div className="flex gap-5 justify-between">
        <div className="flex-1">
          <label className="block" htmlFor="city">
            City
          </label>
          <input
            className="w-full"
            id="city"
            type="text"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && (
            <span className="text-sm -mt-2  mb-2 text-red-600 block">
              {errors.city.message}
            </span>
          )}
        </div>
        <div className="flex-1">
          <label className="block" htmlFor="country">
            Country
          </label>
          <input
            className="w-full"
            id="country"
            type="text"
            {...register("country", { required: "Country is required" })}
          />
          {errors.country && (
            <span className="text-sm -mt-2 mb-2 text-red-600 block">
              {errors.country.message}
            </span>
          )}
        </div>
      </div>
      <label htmlFor="description">Description</label>
      <textarea
        rows={5}
        id="description"
        {...register("description", { required: "Description is required" })}
      />
      {errors.description && (
        <span className="text-sm -mt-2 mb-2 text-red-600 block">
          {errors.description.message}
        </span>
      )}
      <div className="flex gap-5 justify-between">
        <div className="flex-1">
          <label className="block" htmlFor="pricePerNight">
            Price Per Night
          </label>
          <input
            className="w-full"
            id="pricePerNight"
            type="number"
            min={1}
            {...register("pricePerNight", {
              required: "Price per night is required",
            })}
          />
          {errors.pricePerNight && (
            <span className="text-sm  mb-2 text-red-600 block">
              {errors.pricePerNight.message}
            </span>
          )}
        </div>
        <div className="flex-1">
          <label className="block" htmlFor="starRating">
            Star Rating
          </label>
          <select
            className="w-full bg-white"
            id="starRating"
            {...register("starRating", {
              required: "Star rating is required",
            })}
          >
            <option value={""}>Select rating</option>
            {[1, 2, 3, 4, 5].map((val: number, idx: number) => {
              return (
                <option value={val} key={idx}>
                  {val}
                </option>
              );
            })}
          </select>
          {errors.starRating && (
            <span className="text-sm mb-2 text-red-600 block">
              {errors.starRating.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
export default FormDetails;
