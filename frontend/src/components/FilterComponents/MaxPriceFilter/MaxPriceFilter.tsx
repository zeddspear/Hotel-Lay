const maxPrices = [5000, 10000, 20000, 30000, 40000, 50000];

type props = {
  selectedPrice?: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function MaxPriceFilter({ selectedPrice, onChange }: props) {
  return (
    <>
      <div>
        <h4 className="text-md font-semibold mb-2">Max Price</h4>
        <select
          className="w-full p-2 rounded-md border-2 border-secondaryMain"
          value={selectedPrice}
          onChange={onChange}
        >
          <option value={""}>Select Max Price</option>
          {maxPrices.map((price, idx) => {
            return (
              <option key={idx} value={price}>
                {price}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}
export default MaxPriceFilter;
