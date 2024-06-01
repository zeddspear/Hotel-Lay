import { Link } from "react-router-dom";
import { FaMap } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { MdFamilyRestroom } from "react-icons/md";
import { FaStar } from "react-icons/fa6";
import { hotelType } from "../../../../../../backend/src/shared/types.ts";

function Hotel({ ...hotel }: hotelType) {
  return (
    <div className="hotel border-2 flex flex-col gap-3 border-secondaryMain p-3 rounded-md shadow-xl">
      <div className="hotel-top my-2">
        <h3 className="text-xl font-bold">{hotel.name}</h3>
        <p className="text-gray-600 whitespace-pre-line">{hotel.description}</p>
      </div>
      <div className="hotel-showcase grid grid-cols-5 space-x-3 mt-5 font-semibold">
        <div className="smallBox">
          <FaMap className="text-secondaryMain" />{" "}
          <p className="text-gray-600 text-sm">{`${hotel.city}, ${hotel.country}`}</p>
        </div>
        <div className="smallBox">
          <FaHotel className="text-secondaryMain" />{" "}
          <p className="text-gray-600 text-sm">{hotel.type}</p>
        </div>
        <div className="smallBox">
          <FaMoneyBillWave className="text-secondaryMain" />
          <p className="text-gray-600 text-sm">
            Rs.{hotel.pricePerNight} per night
          </p>
        </div>
        <div className="smallBox">
          <MdFamilyRestroom className="text-secondaryMain" />{" "}
          <p className="text-gray-600 text-sm">{`${hotel.adultCount} adults, ${hotel.childCount} children`}</p>
        </div>
        <div className="smallBox text-secondaryMain">
          {Array(hotel.starRating)
            .fill(15)
            .map((star: number, idx: number) => {
              return <FaStar key={idx} size={star} />;
            })}
        </div>
      </div>
      <Link className="btn2 self-end " to={`/my-hotels/${hotel._id}`}>
        View Details
      </Link>
    </div>
  );
}
export default Hotel;
