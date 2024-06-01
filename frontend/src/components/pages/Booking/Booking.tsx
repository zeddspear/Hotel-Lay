import BookingForm from "./BookingForm";
import { useAppSelector } from "../../../store/hooks";
import { useParams } from "react-router-dom";
import { useGetSingleHotelQuery } from "../../../slices/hotelApiSlice";
import { usePaymentIntentMutation } from "../../../slices/hotelApiSlice";
import { useSearchContext } from "../../../context/searchContext";
import { useEffect, useState } from "react";
import moment from "moment";
import { paymentIntentResponse } from "../../../../../backend/src/shared/types";
import { Elements } from "@stripe/react-stripe-js";

function Booking() {
  const search = useSearchContext();

  const { userInfo, stripePromise } = useAppSelector(
    (state) => state.userSlice
  );

  const [numberOfNights, setNumberOfNights] = useState<number | null>(null);

  const [paymentIntent, setPaymentIntent] =
    useState<paymentIntentResponse | null>(null);

  const { id } = useParams();

  const { data } = useGetSingleHotelQuery(id!);

  const [makePaymentIntent, { isLoading: paymentIntentLoading }] =
    usePaymentIntentMutation();

  useEffect(() => {
    if (search?.checkIn && search.checkOut) {
      let nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      nights = Math.ceil(nights);
      if (nights === 0) {
        setNumberOfNights(1);
      } else {
        setNumberOfNights(nights);
      }
    }
  }, [search?.checkIn, search?.checkOut]);

  useEffect(() => {
    if (numberOfNights !== null) {
      createPaymentIntent();
    }
  }, [numberOfNights]);

  console.log("Hotel Search: ", search);

  async function createPaymentIntent() {
    try {
      const response = await makePaymentIntent({
        id: id!,
        numberOfNights: numberOfNights?.toString()!,
      }).unwrap();
      console.log("response of payment intent: ", response);
      setPaymentIntent(response);
    } catch (error) {
      console.log(error);
    }
  }

  if (paymentIntentLoading) {
    return <p>Loading...</p>;
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
                {data?.name}, {data?.city}, {data?.country}
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
