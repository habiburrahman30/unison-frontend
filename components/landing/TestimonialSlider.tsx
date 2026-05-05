'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import TestimonialCard from "@/components/landing/TestimonialCard";

export default function TestimonialSlider({ testimonials }: { testimonials: any[] }) {
    return (
        <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: '50px' }}
        >
            {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                    <TestimonialCard id={testimonial.id} testimonial={testimonial} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}