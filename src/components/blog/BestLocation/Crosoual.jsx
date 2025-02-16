"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import BlogCard from "../Card";

const Crosoual = ({ data }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

    console.log(data)
  return (
    <>
      <div className="absolute top-0 left-0 z-[100] flex flex-row items-center justify-center gap-4">
        <button className={`custom-prev flex items-center justify-center`}>
          <HiArrowLongLeft className="text-[24px]" />
        </button>
        <button
          className={`custom-next flex items-center justify-center `}
          disabled={isEnd}
        >
          <HiArrowLongRight className="text-[24px]" />
        </button>
      </div>
      <div className="w-full">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={30}
          //   pagination={{ clickable: true }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Pagination, Navigation]}
          className="z-0 w-full relative"
        >
          {data.map((item, index) => {
            return (
                <SwiperSlide
                    key={index}
                style={{
                  width: "303px",
                }}
              >
                <BlogCard data={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default Crosoual;
