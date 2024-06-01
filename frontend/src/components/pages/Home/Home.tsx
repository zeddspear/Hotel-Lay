import { useLastAddedHotelsQuery } from "../../../slices/hotelApiSlice";

function Home() {
  const { data } = useLastAddedHotelsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  console.log(data);

  return <div>Home</div>;
}
export default Home;
