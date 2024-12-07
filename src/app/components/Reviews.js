"use client";
import Image from "next/image";
import StarIco from "@/assets/icons/StarIco";
import { reviews } from "@/assets/data/reviews";
import Slider from "react-slick";
import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Reviews.css";

export default function Reviews() {
  const [expandedReviews, setExpandedReviews] = useState({});

  const toggleReview = (index) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const settings = {
    // infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 5000,
    pauseOnHover: true,
    rtl: true,
    arrows: false,
    dots: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //
  return (
    <div className="reviews-slider w-full max-w-[1400px] mx-auto px-3 lg:px-6 pb-[60px]">
      <Slider {...settings}>
        {reviews.map(({ image, name, rating, content }, i) => (
          <div key={i}>
            <div className="relative w-fit mx-auto transition-transform duration-300 ease-linear hover:-translate-y-2">
              <div
                className="text-center translate-y-1/2 bg-second-pale w-[130px] h-[130px] sm:w-[175px] sm:h-[175px] lg:w-[200px] lg:h-[200px] 
                  [&+*]:!pt-[60px] sm:[&+*]:!pt-[80px] lg:[&+*]:!pt-[100px] mx-auto rounded-full border-[5px] border-[#2B0264] overflow-hidden
                  transition-all ease-linear duration-300"
              >
                {image && (
                  <Image
                    src={image}
                    alt={name}
                    width={200}
                    height={200}
                    className="object-cover"
                  />
                )}
              </div>
              <div
                className={`bg-second-pale p-4 text-white w-[260px] h-[260px] sm:w-[350px] sm:h-[350px] lg:w-[400px] lg:h-[400px] 
                  flex flex-col text-center transition-all ease-linear duration-300 
                  ${expandedReviews[i] ? "rounded-t-full" : "rounded-full"}`}
              >
                <h3 className="text-xl sm:text-2xl lg:text-[28px] mb-3 sm:mb-4 lg:mb-5 mt-2 sm:mt-3 lg:mt-4">
                  {name}
                </h3>
                <div className="flex justify-center gap-1 sm:gap-1.5 lg:gap-2 mb-2 sm:mb-3 lg:mb-4">
                  {[...Array(rating)].map((_, i) => (
                    <StarIco
                      key={i}
                      className="w-[25px] h-[20px] sm:w-[30px] sm:h-[25px] lg:w-[35px] lg:h-[30px] text-[#F29F05]"
                    />
                  ))}
                </div>
                <div className="review-content overflow-y-auto">
                  <p
                    className={`text-xs sm:text-sm leading-relaxed 
                      ${!expandedReviews[i] ? "line-clamp" : ""}
                    `}
                  >
                    {content}
                  </p>
                  {content.length > 150 && (
                    <button
                      onClick={() => toggleReview(i)}
                      className="text-[#F29F05] text-xs sm:text-sm mt-2 hover:underline focus:outline-none"
                    >
                      {expandedReviews[i] ? "عرض أقل" : "عرض المزيد"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
