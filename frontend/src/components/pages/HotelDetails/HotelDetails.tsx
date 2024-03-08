import { useParams } from "react-router-dom";

function HotelDetails() {
  const { id } = useParams();
  return (
    <div>
      <p>Hotel with id: {id}</p>
    </div>
  );
}
export default HotelDetails;
