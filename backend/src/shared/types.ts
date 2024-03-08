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
};

export type searchHotelsResponse = {
  hotels: hotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};
