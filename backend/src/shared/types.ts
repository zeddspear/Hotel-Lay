export type hotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imgsURLs: string[];
  lastUpdated: Date;
  bookings: bookingType[];
};

export type bookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type searchHotelsResponse = {
  hotels: hotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type paymentIntentResponse = {
  paymentIntentID: string;
  clientSecret: string;
  totalCost: number;
};
