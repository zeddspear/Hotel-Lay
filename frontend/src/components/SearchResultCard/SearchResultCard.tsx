import { Link } from "react-router-dom";
import { hotelType } from "../../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";

type Props = {
  hotel: hotelType;
};

function SearchResultCard({ hotel }: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] border border-secondaryMain rounded min-w-[350px] p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imgsURLs[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        {/* Todo details of hotel */}
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(
                (_val, idx: number) => {
                  return <AiFillStar className="fill-yellow-400" key={idx} />;
                }
              )}
            </span>
            <span className="text-sm text-gray-500">{hotel.type}</span>
          </div>

          <Link
            to={`/hotels/${hotel._id}`}
            className="text-3xl font-bold block cursor-pointer"
          >
            {hotel.name}
          </Link>
        </div>
        <div className="py-2">
          <p className="line-clamp-4">{hotel.description}</p>
        </div>
        <div className="flex justify-between px-1 gap-2 flex-wrap whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {/* Fix this component */}
            {hotel.facilities.map((facility, idx) => {
              if (idx >= 3) {
                return;
              }
              return (
                <span
                  key={idx}
                  className="bg-secondaryMain p-2 rounded-lg font-bold text-xs whitespace-nowrap text-white"
                >
                  {facility}
                </span>
              );
            })}
            <span>
              +{hotel.facilities.length > 3 && hotel.facilities.length - 3} more
            </span>
          </div>
          <div className="flex flex-col gap-1 items-end">
            <Link
              to={`/hotels/${hotel._id}`}
              className="btnWOmargin font-bold max-w-fit"
            >
              View Details
            </Link>
            <span className="text-xs font-bold">
              Rs.{hotel.pricePerNight} per night
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SearchResultCard;
