import { Link } from "react-router-dom";

function BigCard({
  imgsURLs,
  name,
  city,
  country,
  _id,
}: {
  imgsURLs: string[];
  name: string;
  city: string;
  country: string;
  _id: string;
}) {
  return (
    <Link to={`/hotels/${_id}`}>
      <div className="relative w-full min-w-[100px] max-w-[500px] h-[300px] shadow-lg">
        <img className="h-full w-full" src={imgsURLs[0]} alt={name} />
        <div className="absolute bottom-0 bg-[#00000042] text-white w-full py-5 px-2">
          <h1 className="font-bold text-xl">{name}</h1>
          <p>
            {city}, {country}
          </p>
        </div>
      </div>
    </Link>
  );
}
export default BigCard;
