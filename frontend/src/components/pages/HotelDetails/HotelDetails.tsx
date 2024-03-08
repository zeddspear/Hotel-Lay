import { useParams } from "react-router-dom";

function HotelDetails() {
  const { id } = useParams();
  return (
    <div className="min-w-screen bg-red">
      <p>Hotel with id: {id}</p>
    </div>
  );
}
export default HotelDetails;
