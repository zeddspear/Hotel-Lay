import { useParams } from "react-router-dom";
import { useGetHotelQuery } from "../../../slices/hotelApiSlice";
import { AiFillStar } from "react-icons/ai";
import { ChangeEvent } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function HotelDetails() {
  const { id } = useParams();

  const { data: hotel, isLoading } = useGetHotelQuery(id!);

  const [adultCount, setAdultCount] = useState<number | undefined>(1);
  const [childCount, setChildCount] = useState<number | undefined>(1);

  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
  const [checkOut, setCheckOut] = useState<Date | undefined>(new Date());

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(hotel);

  function handleSubmit() {
    console.log("Hello");
  }

  const minDate = new Date();
  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <>
      <div className="min-w-screen flex justify-center items-center">
        <div className="max-w-[900px] pt-10 pb-28 px-5 md:px-2">
          <div className="flex gap-2 items-center">
            <span className="flex">
              {Array.from({ length: hotel?.starRating! }).map(
                (_val, idx: number) => {
                  return <AiFillStar className="fill-yellow-400" key={idx} />;
                }
              )}
            </span>
            <span className="text-sm text-gray-500">{hotel?.type}</span>
          </div>
          <h2 className="text-3xl font-bold">{hotel?.name}</h2>
          <div className="grid grid-cols-12 gap-2 my-2">
            {hotel?.imgsURLs.map((img, idx) => {
              return (
                <div className="col-span-12  md:col-span-4 w-58 h-46 shadow-md overflow-hidden">
                  <img
                    className="w-full h-full"
                    key={idx}
                    src={img}
                    alt={`hotel-image-${idx}`}
                  />
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-12 gap-3 mt-5 mb-2">
            {hotel?.facilities.map((facility, idx) => {
              return (
                <div
                  className="border border-secondaryMain col-span-6 md:col-span-3 p-2"
                  key={idx}
                >
                  <p>{facility}</p>
                </div>
              );
            })}
          </div>
          <div className="grid grid-cols-12 mt-5 mb-2">
            <div className="col-span-8 p-2">
              <p>{hotel?.description}</p>
            </div>
            <div className="col-span-4 bg-secondaryMain bg-opacity-75 pt-1 pb-3 ">
              <p className="font-semibold text-xl text-white my-2 text-center">
                Rs.{hotel?.pricePerNight} per night{" "}
              </p>
              <form
                onSubmit={handleSubmit}
                className="justify-center flex flex-col items-center gap-2 text-black"
              >
                <div className="flex items-center  justify-center gap-1 bg-white w-fit px-1">
                  <label className="flex  p-1 items-center  w-fit bg-white m-0">
                    Adult:
                    <input
                      min={1}
                      max={20}
                      className=" searchInputs w-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      name="adultCount"
                      value={adultCount}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setAdultCount(Number(e.target.value))
                      }
                    />
                  </label>
                  <label className="flex  p-1 items-center w-fit bg-white m-0 ">
                    Children:
                    <input
                      min={0}
                      max={20}
                      className="searchInputs  w-9 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      name="childCount"
                      value={childCount}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        setChildCount(Number(e.target.value))
                      }
                    />
                  </label>
                </div>
                <label className="flex p-1 items-center w-fit bg-white m-0 ">
                  <DatePicker
                    className="searchInputs px-1 w-[202px]"
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date as Date)}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-In Date"
                  />
                </label>
                <label className="flex p-1 items-center w-fit bg-white m-0 ">
                  <DatePicker
                    className="searchInputs px-1 w-[202px]"
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date as Date)}
                    selectsEnd
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minDate}
                    maxDate={maxDate}
                    placeholderText="Check-Out Date"
                  />
                </label>
                <button
                  className="bookNow bg-blue-500 hover:!bg-#0000ffd4 my-2"
                  type="submit"
                >
                  Book Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HotelDetails;
