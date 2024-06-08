import BookingForm from "./BookingForm";
import { useAppSelector } from "../../../store/hooks";
import { useParams } from "react-router-dom";
import {
  useGetSingleHotelQuery,
  usePaymentIntentMutation,
} from "../../../slices/hotelApiSlice";
import { useSearchContext } from "../../../context/searchContext";
import { useEffect, useState } from "react";
import moment from "moment";
import { paymentIntentResponse } from "../../../../../backend/src/shared/types";
import { Elements } from "@stripe/react-stripe-js";
import Spinner from "../../Spinner";

const MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;

function Booking() {
  const search = useSearchContext();
  const { userInfo, stripePromise } = useAppSelector(
    (state) => state.userSlice
  );
  const [numberOfNights, setNumberOfNights] = useState<number | null>(null);
  const [paymentIntent, setPaymentIntent] =
    useState<paymentIntentResponse | null>(null);
  const { id } = useParams();
  const { data: hotelData } = useGetSingleHotelQuery(id!);
  const [makePaymentIntent, { isLoading: paymentIntentLoading }] =
    usePaymentIntentMutation();

  useEffect(() => {
    if (search?.checkIn && search.checkOut) {
      let nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        MILLISECONDS_IN_DAY;
      setNumberOfNights(nights === 0 ? 1 : Math.ceil(nights));
    }
  }, [search?.checkIn, search?.checkOut]);

  useEffect(() => {
    if (numberOfNights !== null) {
      createPaymentIntent();
    }
  }, [numberOfNights]);

  async function createPaymentIntent() {
    try {
      const response = await makePaymentIntent({
        id: id!,
        numberOfNights: numberOfNights?.toString()!,
      }).unwrap();
      setPaymentIntent(response);
    } catch (error) {
      // Handle error properly
    }
  }

  if (paymentIntentLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center px-5 min-h-screen">
        <Spinner width={"w-[50px]"} height={"h-[50px]"} />
      </div>
    );
  }

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col pb-16">
        <div className="grid md:grid-cols-[1.3fr_2fr] py-10 max-w-[1024px]">
          <div className="flex items-start flex-col py-5 px-3">
            <h3 className="text-2xl font-semibold my-2">Booking Summary</h3>
            <div className="flex flex-col gap-5 mt-2">
              <p className="font-bold w-full border-b border-gray-300 pb-1">
                <span className="block text-sm font-semibold text-gray-600">
                  Location:
                </span>
                {hotelData?.name}, {hotelData?.city}, {hotelData?.country}
              </p>
              <div className="flex gap-3 font-bold w-full border-b border-gray-300 pb-1">
                <p>
                  <span className="block text-sm text-gray-600 font-semibold">
                    Check-in:
                  </span>
                  {moment(search?.checkIn).format("dddd, DD MMMM, YYYY")}
                </p>
                <p>
                  <span className="block text-sm text-gray-600 font-semibold">
                    Check-out:
                  </span>
                  {moment(search?.checkOut).format("dddd, DD MMMM, YYYY")}
                </p>
              </div>
              <p className="font-bold w-full border-b border-gray-300 pb-1">
                <span className="block text-sm text-gray-600 font-semibold">
                  Total length of stay:
                </span>
                {numberOfNights} nights
              </p>
              <p className="font-bold w-full border-b border-gray-300 pb-1">
                <span className="block text-sm text-gray-600 font-semibold">
                  Guests:
                </span>
                {search?.adultCount} adults & {search?.childCount} children
              </p>
            </div>
          </div>
          {userInfo && paymentIntent && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret: paymentIntent.clientSecret }}
            >
              <BookingForm userInfo={userInfo} paymentIntent={paymentIntent} />
            </Elements>
          )}
        </div>
      </div>
    </>
  );
}
export default Booking;
