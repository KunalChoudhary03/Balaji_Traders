import React from "react";
import { useNavigate } from "react-router-dom";
import ChadhImg from "../assets/Chadh/Chadhimg.jpg";
import CpvcImg from "../assets/Cpvc/Cpvcimg.jpg";
import PowerImg from "../assets/Power/Powerimg.jpg";
import SwrImg from "../assets/Swr/Swrimg.jpg";
const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 py-4 overflow-x-auto scrollbar-hide">
      
      {/* CHADH */}
      <div
        onClick={() => navigate("/chadh")}
        className="min-w-[80px] sm:min-w-[100px] cursor-pointer text-center flex flex-col items-center"
      >
        <img
          src={ChadhImg}
          alt="Chadh"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover border shadow hover:scale-105 transition"
        />
        <p className="mt-2 text-xs sm:text-sm font-semibold">Chadh</p>
      </div>

      {/* POWER */}
      <div
        onClick={() => navigate("/power")}
        className="min-w-[80px] sm:min-w-[100px] cursor-pointer text-center flex flex-col items-center"
      >
        <img
          src={PowerImg}
          alt="Power"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover border shadow hover:scale-105 transition"
        />
        <p className="mt-2 text-xs sm:text-sm font-semibold">Power</p>
      </div>

      {/* CPVC */}
      <div
        onClick={() => navigate("/cpvc")}
        className="min-w-[80px] sm:min-w-[100px] cursor-pointer text-center flex flex-col items-center"
      >
        <img
          src={CpvcImg}
          alt="CPVC"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover border shadow hover:scale-105 transition"
        />
        <p className="mt-2 text-xs sm:text-sm font-semibold">CPVC</p>
      </div>

      {/* SWR */}
      <div
        onClick={() => navigate("/swr")}
        className="min-w-[80px] sm:min-w-[100px] cursor-pointer text-center flex flex-col items-center"
      >
        <img
          src={SwrImg}
          alt="SWR"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover border shadow hover:scale-105 transition"
        />
        <p className="mt-2 text-xs sm:text-sm font-semibold">SWR</p>
      </div>

    </div>
  );
};

export default Categories;
