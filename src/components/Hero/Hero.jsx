import React, { useState } from "react";
import Vector from "../../assets/website/blue-pattern.png";

const Hero = ({ setSelectedBookId, setBorrowPopup, newestBooks}) => {
  const [bookShow, setBookShow] = useState(newestBooks[0]);
  const bgImage = {
    backgroundImage: `url(${Vector})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };

  return (
    <>
      <div
        className="min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200"
        style={bgImage}
      >
        <div className="container pb-8 sm:pb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* text content section */}
            <div
              data-aos-once="true"
              className="flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1"
            >
              <h1
                data-aos="zoom-out"
                data-aos-duration="500"
                data-aos-once="true"
                className="text-5xl sm:text-6xl lg:text-7xl font-bold"
              >
                {bookShow?.title}
                <p className="bg-clip-text text-transparent bg-gradient-to-b from-primary text-right text-sm to-secondary">
                  by {bookShow?.author?.name}
                </p>{" "}
              </h1>
              <p
                data-aos="slide-up"
                data-aos-duration="500"
                data-aos-delay="100"
                className="text-sm "
              >
                {bookShow?.description}
              </p>
              <div>
                <button
                  onClick={()=>{
                    setSelectedBookId(bookShow?.id)
                    setBorrowPopup(true)
                  }}
                  className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 rounded-full"
                >
                  Borrow
                </button>
              </div>
            </div>
            {/* Image section */}
            <div className="min-h-[450px] sm:min-h-[450px] flex justify-center items-center relative order-1 sm:order-2 ">
              <div className="h-[300px] sm:h-[450px] overflow-hidden flex justify-center items-center ">
                <img
                  data-aos="zoom-in"
                  data-aos-once="true"
                  src={bookShow?.photoPath}
                  alt="biryani img"
                  className="w-[220px] h-[300px] sm:h-[450px] sm:w-[320px] sm:scale-125 object-contain mx-auto rounded-xl border-none"
                  scrolling="no"
                />
              </div>
              <div className="flex lg:flex-col lg:top-1/2 lg:-translate-y-1/2 lg:py-2 justify-center gap-4 absolute -bottom-[40px] lg:-right-1 bg-primary rounded-full">
                {newestBooks.map((item) => (
                  <img
                    key={item.id}
                    data-aos="zoom-in"
                    data-aos-once="true"
                    src={item.photoPath}
                    onClick={() => {
                      setBookShow(item);
                    }}
                    alt="biryani img"
                    className="max-w-[75px] h-[100px] object-contain inline-block hover:scale-110 duration-200 rounded-md border-none"
                    scrolling="no"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
