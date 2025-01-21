'use client';

import { useState, useRef, useEffect } from 'react';
import { Award, Star, Diamond, Check } from 'lucide-react';

export default function FeatureBox() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const scrollContainerRef = useRef(null);

    const cards = [
        {
            icon: Award,
            title: "Loyalty programs",
            items: [
                {
                    text: <><span className="tw-text-blue-600">Receive stamps</span>, promotions, discounts, news, and more via our newsletters and social channels</>
                }
            ]
        },
        {
            icon: Star,
            title: "Our promise",
            items: [
                { text: "Excellent service" },
                { text: "Authentic user reviews" }
            ]
        },
        {
            icon: Diamond,
            title: "Your benefits",
            items: [
                { text: "80,000+ places to choose from" },
                { text: "Pay online or with cash" },
                { text: "Order any time, anywhere, and on any device" }
            ]
        }
    ];

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const slideWidth = container.clientWidth;
            const scrollPosition = container.scrollLeft;
            const newSlide = Math.round(scrollPosition / slideWidth);
            setCurrentSlide(newSlide);
        };

        // Handle wheel scroll events
        const handleWheel = (e) => {
            e.preventDefault();
            const container = scrollContainerRef.current;
            if (!container) return;

            const slideWidth = container.clientWidth;
            let newSlide = currentSlide;

            if (e.deltaY > 0 && currentSlide < cards.length - 1) {
                newSlide = currentSlide + 1;
            } else if (e.deltaY < 0 && currentSlide > 0) {
                newSlide = currentSlide - 1;
            }

            container.scrollTo({
                left: newSlide * slideWidth,
                behavior: 'smooth'
            });
        };

        container.addEventListener('scroll', handleScroll);
        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('scroll', handleScroll);
            container.removeEventListener('wheel', handleWheel);
        };
    }, [currentSlide, cards.length]);

    return (
        <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-bg-gray-50 tw-p-12 md:tw-p-12">
            <p className="tw-text-gray-800 tw-text-xl tw-mb-6">Just Eat</p>
            <h2 className="tw-text-[#f55204] tw-text-5xl tw-font-bold tw-mb-12">Your time.</h2>

            {/* Mobile Layout */}
            <div className="md:tw-hidden tw-w-full">
                <div
                    ref={scrollContainerRef}
                    className="tw-flex tw-overflow-x-auto tw-snap-x tw-snap-mandatory tw-scrollbar-none"
                    style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                >
                    {cards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={index}
                                className="tw-min-w-full tw-snap-center tw-px-4"
                            >
                                <div className="tw-bg-white tw-rounded-2xl tw-p-8 tw-shadow-sm tw-flex tw-flex-col tw-items-center">
                                    <Icon className="tw-w-12 tw-h-12 tw-text-[#f55204] tw-mb-6" />
                                    <h3 className="tw-text-xl tw-font-bold tw-text-gray-800 tw-mb-6">{card.title}</h3>
                                    <ul className="tw-space-y-4 tw-w-full">
                                        {card.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="tw-flex tw-items-start tw-gap-3">
                                                <Check className="tw-w-5 tw-h-5 tw-mt-1 tw-text-gray-600 tw-flex-shrink-0" strokeWidth={3} />
                                                <span className="tw-text-gray-600 tw-text-left">{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="tw-flex tw-justify-center tw-gap-2 tw-mt-6">
                    {cards.map((_, index) => (
                        <div
                            key={index}
                            className={`tw-w-2 tw-h-2 tw-rounded-full ${
                                currentSlide === index ? 'tw-bg-[#f55204]' : 'tw-bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="tw-hidden md:tw-grid tw-grid-cols-3 tw-gap-8 tw-w-full tw-max-w-6xl">
                {cards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div key={index} className="tw-bg-white tw-rounded-lg tw-p-8 tw-shadow-sm tw-flex tw-flex-col tw-items-center">
                            <Icon className="tw-w-12 tw-h-12 tw-text-[#f55204] tw-mb-6" />
                            <h3 className="tw-text-xl tw-font-bold tw-text-gray-800 tw-mb-6">{card.title}</h3>
                            <ul className="tw-space-y-4 tw-w-full">
                                {card.items.map((item, itemIndex) => (
                                    <li key={itemIndex} className="tw-flex tw-items-start tw-gap-3">
                                        <Check className="tw-w-5 tw-h-5 tw-mt-1 tw-text-gray-600 tw-flex-shrink-0" strokeWidth={3} />
                                        <span className="tw-text-gray-600 tw-text-left">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}