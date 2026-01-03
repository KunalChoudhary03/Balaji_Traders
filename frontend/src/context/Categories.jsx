import React from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex gap-4 sm:gap-6 md:gap-8 p-4 ml-20 overflow-x-auto scrollbar-hide">
      
      {/* CHADH */}
      <div
        onClick={() => navigate("/chadh")}
        className="min-w-[80px] sm:min-w-[100px] cursor-pointer text-center flex flex-col items-center"
      >
        <img
          src="https://i.pinimg.com/736x/26/93/87/269387a009014d4404640fede9127284.jpg"
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
          src="https://i.pinimg.com/1200x/81/45/8a/81458a57d67421ea0059295b30789291.jpg"
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
          src="https://i.pinimg.com/1200x/2a/2c/23/2a2c23037c822c59b7e75c99eb10e116.jpg"
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
          src="https://i.pinimg.com/1200x/39/d1/9c/39d19c1181c2a3de3a875692607ec1a1.jpg"
          alt="SWR"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover border shadow hover:scale-105 transition"
        />
        <p className="mt-2 text-xs sm:text-sm font-semibold">SWR</p>
      </div>

    </div>
  );
};

export default Categories;
