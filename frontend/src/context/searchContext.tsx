import { ReactNode, createContext, useContext, useState } from "react";

type searchType = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelID?: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelID?: string
  ) => void;
};

const SearchContext = createContext<searchType | undefined>(undefined);

type searchContextProps = {
  children: ReactNode;
};

export function SearchContextProvider({ children }: searchContextProps) {
  const [destination, setDestination] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(1);
  const [hotelID, setHotelID] = useState<string>("");

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelID?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);
    if (hotelID) {
      setHotelID(hotelID);
    } else {
      setHotelID("");
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelID,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  return context;
};
