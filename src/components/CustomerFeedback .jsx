import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; 
import "swiper/css";

const CustomerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("/data/feedbacks.json")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-11/12 mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Customer Feedback</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            0: { slidesPerView: 1 },      
            640: { slidesPerView: 2 },  
            1024: { slidesPerView: 3 },   
            1280: { slidesPerView: 4 },   
          }}
        >
          {feedbacks.map((fb, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-gray-100 p-6 rounded-lg text-center flex flex-col items-center shadow hover:shadow-lg transition">
                <img
                  src={fb.image}
                  alt={fb.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <p className="text-gray-700 mb-2">"{fb.text}"</p>
                <h4 className="font-bold text-lg">{fb.name}</h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerFeedback;
