import { Slider } from "rsuite";
import "../../../../node_modules/rsuite/Slider/styles/index.css";

export type StarFilterProps = {
  stars: number;
  onStarChange: (value: number) => void;
};

function StarFilter({ stars, onStarChange }: StarFilterProps) {
  return (
    <div className="border-b border-secondaryMain pb-5">
      <p className="font-semibold text-md">Hotel Rating (in stars)</p>
      <div className="my-3">
        <Slider
          progress
          min={1}
          max={5}
          defaultValue={stars}
          barClassName="sliderStyle"
          onChange={(value: number) => {
            onStarChange(value);
          }}
        />
      </div>
    </div>
  );
}
export default StarFilter;
