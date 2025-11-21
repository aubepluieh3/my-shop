import { Box, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../index.css";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import { Link } from "react-router-dom";

const BannerSlider = () => {
    const banners = [{src: banner1, productId: "7"}, {src: banner2, productId: "6"}, {src: banner3, productId: "1"}];
    return (
    <Box w="100%" maxW="1200px" mx="auto" borderRadius="lg" overflow="hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        style={{ width: "100%", height: "330px" }}
      >
        {banners.map((banner, index) => (
            <SwiperSlide key={index}>
            <Link to = {`/product/${banner.productId}`}>
              <Image
                src={banner.src}
                alt={`banner-${index}`}
                w="100%"
                h="330px"
                objectFit="cover"
              />
            </Link>
            </SwiperSlide>
        ))}
      </Swiper>
      </Box>
    );
};

export default BannerSlider;
