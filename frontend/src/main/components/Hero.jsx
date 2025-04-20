import React from 'react'
import MainImg from "../../assets/img/header.jpg";
import { GoArrowRight } from "react-icons/go";

const Hero = () => {
  return (
    <>
      <div className="pt-20 relative font-[Montserrat]">
        <img
          src={MainImg}
          alt="Image Error"
          className="w-full h-[350px] md:h-[500px] object-cover rounded-[20px]"
        />
        <div className="absolute inset-0 flex items-center justify-center md:justify-start px-6 md:px-16">
          <div className="text-white max-w-xl">
            <h1 className="text-[1.8rem] sm:text-[2.5rem] md:text-[3.25rem] font-semibold leading-tight">
              Choose from thousands of recipes
            </h1>
            <p className="text-[14px] md:text-[16px] font-normal mt-3">
              Appropriately integrate technically sound value with scalable
              infomediaries negotiate sustainable strategic theme areas
            </p>
            <a
              href="/signup"
              className="inline-flex items-center gap-2 mt-6 group text-[16px] font-medium text-white"
            >
              <span className="relative after:absolute after:bg-white after:h-[2px] after:w-full after:left-0 after:bottom-0 after:origin-left after:scale-x-0 after:transition-transform after:duration-800 group-hover:after:scale-x-100">
                Sign up today
              </span>
              <GoArrowRight />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero
