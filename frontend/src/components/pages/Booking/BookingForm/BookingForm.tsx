import { useForm } from "react-hook-form";
import { paymentIntentResponse } from "../../../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../../../context/searchContext";
import { useParams } from "react-router-dom";
import { useMakeBookingMutation } from "../../../../slices/hotelApiSlice";
import Spinner from "../../../Spinner";
import toast from "react-hot-toast";

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  totalCost: number;
  paymentIntentId: string;
};

function BookingForm({
  userInfo,
  paymentIntent,
}: {
  userInfo: userInfo;
  paymentIntent: paymentIntentResponse;
}) {
  const { fullname } = userInfo;
  const firstName = fullname.split(" ")[0];
  const lastName = fullname.split(" ")[1];

  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { id } = useParams();

  const [makeBooking, { isLoading }] = useMakeBookingMutation();

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email: userInfo.email,
      adultCount: search?.adultCount,
      childCount: search?.childCount,
      checkIn: search?.checkIn.toISOString(),
      checkOut: search?.checkOut.toISOString(),
      hotelId: id,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentID,
    },
  });

  async function onSubmit(formData: BookingFormData) {
    const result = await stripe?.confirmCardPayment(
      paymentIntent.clientSecret,
      {
        payment_method: {
          card: elements?.getElement(CardElement) as StripeCardElement,
        },
      }
    );

    if (result?.paymentIntent?.status === "succeeded") {
      try {
        const response: any = await makeBooking({
          ...formData,
          paymentIntentId: result.paymentIntent.id,
        });
        console.log(response);
        toast.success(response.data.message);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="flex items-start flex-col py-5 px-3 md:pl-10 md:pr-3">
      <h3 className="text-2xl font-semibold my-2">Confirm Your Details</h3>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-5 items-center">
          <label>
            First Name:
            <input
              className="border block rounded py-2 px-3 text-gray-700 bg-gray-200 font-normal"
              type="text"
              readOnly
              disabled
              {...register("firstName")}
            />
          </label>
          <label>
            Last Name:
            <input
              className="border block rounded py-2 px-3 text-gray-700 bg-gray-200 font-normal"
              type="text"
              readOnly
              disabled
              {...register("lastName")}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              className="border w-full block rounded py-2 px-3 text-gray-700 bg-gray-200 font-normal"
              type="email"
              readOnly
              disabled
              {...register("email")}
            />
          </label>
        </div>
        <div className="bg-secondaryMain bg-opacity-35 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: Rs {paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Payment Details</h3>
          <CardElement id="payment-element" className="border rounded-md p-2" />
        </div>
        {/* Test the functionality video time 14 hours 7 minutes */}
        {isLoading ? (
          <Spinner />
        ) : (
          <button
            type="submit"
            className="btn2 hover:!bg-secondaryMain hover:!text-white hover:opacity-75"
          >
            Confirm Booking
          </button>
        )}
      </form>
    </div>
  );
}
export default BookingForm;
