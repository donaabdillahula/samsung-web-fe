import React from "react";
import Slider from "react-slick";

const TopMembers = ({topMembers}) => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <span id="top-members"></span>
      <div data-aos="fade-up" data-aos-duration="300" className="py-10">
        <div className="container">
          <div className="text-center max-w-[600px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Who are our top members
            </p>
            <h1 className="text-3xl font-bold">Most Borrowers Members</h1>
            <p className="text-xs text-gray-400">
              Top 5 members based on books borrowed
            </p>
          </div>
          <div
            data-aos="zoom-in"
            data-aos-duration="300"
            className="grid grid-cols-1 max-w-[600px] mx-auto gap-6"
          >
            <Slider {...settings}>
              {topMembers.map((data) => {
                return (
                  <div className="my-6">
                    <div
                      key={data.id}
                      className=" flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-gray-800 bg-primary/10 relative"
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <h1 className="text-xl font-bold text-black/80 dark:text-light">
                            {data.name}
                          </h1>
                          <p className="text-gray-500 text-sm">{data.email}</p>
                        </div>
                      </div>

                      <p className="text-black/20 dark:text-gray-500 text-9xl font-serif absolute top-0 right-0">
                        ,,
                      </p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopMembers;
