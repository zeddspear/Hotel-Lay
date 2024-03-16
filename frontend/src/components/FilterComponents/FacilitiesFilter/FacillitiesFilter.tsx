import { hotelFacilities } from "../../pages/AddHotel/hotel-config-types";

type props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function FacillitiesFilter({ selectedFacilities, onChange }: props) {
  return (
    <>
      <div className="border-b border-secondaryMain pb-5">
        <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
        {hotelFacilities.map((facility) => (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              value={facility}
              checked={selectedFacilities.includes(facility)}
              onChange={onChange}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
    </>
  );
}
export default FacillitiesFilter;
