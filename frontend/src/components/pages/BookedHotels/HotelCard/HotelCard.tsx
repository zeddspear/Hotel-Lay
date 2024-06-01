import moment from "moment";
import { hotelType } from "../../../../../../backend/src/shared/types";

function HotelCard({ hotel }: { hotel: hotelType }) {
  return (
    <div className="w-full flex gap-5 justify-start min-h-[300px] p-2 shadow-xl border-2 border-secondaryMain rounded-md ">
      <div className="h-full max-w-[200px] w-full">
        <img
          src={hotel.imgsURLs[0]}
          alt="hotel"
          className="w-60 h-full object-cover"
        />
      </div>
      <div className="w-full px-5">
        <div>
          <h2 className="text-xl font-bold">{hotel.name}</h2>
          <p className="text-xs text-gray-500">
            {hotel.city}, {hotel.country}
          </p>
        </div>

        <div className="my-5 w-full overflow-y-auto max-h-[200px] space-y-3">
          {hotel.bookings.map((booking) => (
            <div>
              <div>
                <p className="text-sm">
                  <span className="font-bold">Dates: </span>
                  {moment(booking.checkIn).format("dddd, DD MMMM, YYYY")} -{" "}
                  {moment(booking.checkOut).format("dddd, DD MMMM, YYYY")}
                </p>
              </div>
              <div>
                <p className="text-sm">
                  <span className="font-bold">Guests: </span>
                  {booking.adultCount} Adults , {booking.childCount} Children
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default HotelCard;
