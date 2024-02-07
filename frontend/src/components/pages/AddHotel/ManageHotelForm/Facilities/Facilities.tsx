import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../hotel-config-types";
function Facilities() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormType>();

  return (
    <>
      <div className="Facilities border-b-2 border-secondaryMain pb-8 w-full">
        <h2 className="text-2xl font-bold my-5">Facilities</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {hotelFacilities.map((facility: string, idx: number) => {
            return (
              <label key={idx}>
                <input
                  type="checkbox"
                  id="facility"
                  value={facility}
                  {...register("facilities", {
                    validate: (value) => {
                      if (value && value.length > 0) {
                        return true;
                      } else {
                        return "Atleast 1 facility is required.";
                      }
                    },
                  })}
                />
                <span className="ml-1">{facility}</span>
              </label>
            );
          })}
        </div>
        {errors.facilities && (
          <span className="text-sm mb-2 mt-2 text-red-600 block">
            {errors.facilities.message}
          </span>
        )}
      </div>
    </>
  );
}
export default Facilities;
