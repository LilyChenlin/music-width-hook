import React, {useEffect, useState} from 'react';
import {SliderContainer} from './style';

import SwiperCore, { Pagination, Autoplay } from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/swiper-bundle.css'

SwiperCore.use([Pagination, Autoplay])

// Slider.propTypes = {
//     bannerList: PropTypes.array
// }

// Slider.defaultProps = {
//     bannerList: []
// }
function Slider({bannerList}) { 
    console.log(bannerList)
    return(
        <SliderContainer>
            <div className="before"></div>
            <div className="slider-container">
                {/* <div className="swiper-wrapper"> */}
                <Swiper
                    pagination={{ clickable: true }}
                    spaceBetween={0}
                    slidesPerView={1}
                    autoplay={{delay: 2500, disableOnInteraction: false}}
                    onSliderChange={() => console.log('slider change')}

                >
                    {
                        bannerList.map((item, index) => {
                            return(
                                <SwiperSlide key={index}>
                                    <div className="slider-nav">
                                        <img src={item.imageUrl} width="100%" height="100%" alt="推荐" />
                                    </div>
                                </SwiperSlide>
                            )
                    })}
                </Swiper>
                {/* </div> */}
                {/* <div className="swiper-pagination"></div> */}
            </div>
        </SliderContainer>
    )
}

export default Slider;