/// <reference types="vite/client" />

type userInfo = {
  id: string;
  fullname: string;
  email: string;
};

type registerTypes = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type signinTypes = {
  email: string;
  password: string;
};

type HotelFormType = {
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
  imageFiles: FileList;
  imgsURLs: string[];
};
