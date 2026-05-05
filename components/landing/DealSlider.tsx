'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { title } from 'node:process'

const sliderData = [
    {
        image: "/assets/img/deal/1.webp",
        title: "Premium Medical Equipment",
        description: "Discover our wide range of high-quality medical equipment and hospital supplies trusted by healthcare professionals nationwide."
    },
    {
        image: "/assets/img/deal/5.png",
        title: "Hospital Furniture & Beds",
        description: "Explore our durable and ergonomic hospital beds, stretchers, and furniture designed for patient comfort and clinical efficiency."
    },
    {
        image: "/assets/img/deal/2.webp",
        title: "Surgical Instruments",
        description: "Top-grade surgical instruments and operation theatre equipment sourced from leading global manufacturers."
    },
    {
        image: "/assets/img/deal/3.webp",
        title: "Diagnostic Machinery",
        description: "Advanced diagnostic machines including ECG, ultrasound, and lab equipment for accurate and reliable patient diagnosis."
    },
    {
        image: "/assets/img/deal/4.webp",
        title: "ICU & Critical Care Equipment",
        description: "Complete ICU solutions including ventilators, patient monitors, infusion pumps, and life-support systems for critical care units."
    },
]

export default function DealSlider() {
    return (
        <div className="deal-area pt-50 pb-50">
            <div className="deal-text-shape">Deal</div>
            <div className="container">
                <div className="deal-wrap wow fadeInUp" data-wow-delay=".25s">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={0}
                        slidesPerView={1}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop={true}
                        style={{ paddingBottom: '40px', width: '100%', overflow: 'hidden' }}
                    >
                        {sliderData.map((item, index) => (
                            <SwiperSlide key={index} style={{ width: '100%', boxSizing: 'border-box' }}>
                                <div className="deal-item">
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            width: '100%',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        {/* Left - Content */}
                                        <div style={{ flex: '0 0 50%', maxWidth: '50%', padding: '0 15px', boxSizing: 'border-box' }}>
                                            <div className="deal-content">
                                                <div className="deal-info pb-20">
                                                    <span>Weekly Deal</span>
                                                    <h1>{item.title}</h1>
                                                    <p>{item.description}</p>
                                                </div>
                                                <a href="/products" className="theme-btn theme-btn2">
                                                    Shop Now <i className="fas fa-arrow-right" />
                                                </a>
                                            </div>
                                        </div>

                                        {/* Right - Image */}
                                        <div style={{ flex: '0 0 50%', maxWidth: '50%', padding: '0 15px', boxSizing: 'border-box' }}>
                                            <div className="deal-img" style={{ textAlign: 'center' }}>
                                                <img
                                                    src={item.image && item.image !== "" ? item.image : "/assets/img/no-image-found.jpg"}
                                                    alt={item.title}
                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>

    )
}