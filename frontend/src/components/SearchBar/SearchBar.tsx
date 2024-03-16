import { ChangeEvent, FormEvent, useState } from "react";
import { useSearchContext } from "../../context/searchContext";
import { TbMapPinSearch } from "react-icons/tb";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

function SearchBar() {
  const Search = useSearchContext();

  const navigate = useNavigate();

  const [destination, setDestination] = useState<string | undefined>(
    Search?.destination
  );
  const [checkIn, setCheckIn] = useState<Date | undefined>(Search?.checkIn);
  const [checkOut, setCheckOut] = useState<Date | undefined>(Search?.checkOut);
  const [adultCount, setAdultCount] = useState<number | undefined>(
    Search?.adultCount
  );
  const [childCount, setChildCount] = useState<number | undefined>(
    Search?.childCount
  );

  const handleSubmit = function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    Search?.saveSearchValues(
      destination!,
      checkIn!,
      checkOut!,
      adultCount!,
      childCount!
    );
    navigate("/search");
  };

  function clearForm() {
    resetSearchValues();
  }

  function resetSearchValues() {
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(1);
  }

  const minDate = new Date();
  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <div className="w-full flex justify-center px-5">
      <form
        onSubmit={handleSubmit}
        className="justify-center w-fit grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5  p-2 items-center gap-2 -mb-3 bg-secondaryMain text-black border-2 border-white"
      >
        <label className="flex gap-1 p-1 items-center w-fit bg-white m-0">
          <TbMapPinSearch size={20} className="text-secondaryMain" />
          <input
            className="searchInputs text-sm"
            type="text"
            placeholder="Where do you want to go?"
            value={destination}
            name="destination"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDestination(e.target.value)
            }
          />
        </label>
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
        <div className="flex gap-2 sm:col-span-2 2xl:col-span-1">
          <button className="searchInputsBtns w-2/3 bg-blue-500" type="submit">
            Search
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="searchInputsBtns w-1/3 bg-red-500"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
export default SearchBar;
