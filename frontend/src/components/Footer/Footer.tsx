import { Link } from "react-router-dom";

function Footer() {
  const date = new Date().getFullYear();
  return (
    <div className="absolute bottom-0 w-full bg-secondaryMain py-5 gap-5 flex sm:justify-around align-middle items-center text-white px-3 justify-between sm:px-0">
      <h1 className=" text-xl sm:text-3xl  tracking-tight font-bold ">
        <Link to={"/"}>Hotel&Lay</Link>
      </h1>
      <div className=" border-main border-l-2 pl-5">
        <p className="sm:text-lg text-xs">
          All Rights Reserved © {date}{" "}
          <Link
            className="hover:font-semibold"
            to={"https://github.com/zeddspear"}
            target="_blank"
          >
            zeddspear
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Footer;
