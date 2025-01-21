import Image from 'next/image'
import LocationSearch from "@/app/index/components/child/LocationSearch";

export default function Hero() {
    return (
        <div className="tw-relative tw-h-[700px] md:tw-h-[700px] tw-w-full tw-overflow-hidden">
            {/* Mobile layout */}
            <div className="md:tw-hidden tw-h-full">
                <div className="tw-h-full tw-flex tw-flex-col">
                    {/* Content section */}
                    <div className="tw-p-6 tw-flex tw-flex-col tw-gap-4">
                        <h1 className="tw-text-3xl tw-font-bold tw-text-gray-800">
                            Order food and more
                        </h1>
                        <p className="tw-text-lg tw-text-gray-600 tw-font-bold">
                            Restaurants and grocery stores delivering near you
                        </p>
                        <LocationSearch />
                    </div>

                    {/* Orange section with shape and image */}
                    <div className="tw-flex-1 tw-relative tw-mt-8">
                        {/* Orange background with shape */}
                        <div className="tw-absolute tw-inset-0">
                            <div className="tw-absolute tw-inset-0 tw-bg-[#ff5a00] tw-transform -tw-skew-y-[10deg] tw-origin-top-left tw-translate-y-16"></div>
                        </div>

                        {/* Image container */}
                        <div className="tw-absolute tw-left-1/2 tw-transform -tw-translate-x-1/2 tw-bottom-16">
                            <Image
                                src="/images/Group-240.png"
                                alt="Food delivery"
                                width={300}
                                height={240}
                                className="tw-w-auto tw-h-auto"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop layout - keeping your original code */}
            <div className="tw-hidden md:tw-block">
                {/* Left section with content */}
                <div className="tw-absolute tw-inset-0">
                    <div className="tw-max-w-7xl tw-mx-auto tw-ml-44 tw-h-full">
                        <div className="tw-w-5/6 tw-h-full tw-flex tw-flex-col tw-justify-center">
                            <h1 className="tw-text-5xl tw-font-bold tw-text-gray-800 tw-mb-4">
                                Order food and more
                            </h1>
                            <p className="tw-text-2xl tw-text-gray-600 tw-font-bold tw-mt-4">
                                Restaurants and grocery stores delivering near you
                            </p>
                            <LocationSearch />
                        </div>
                    </div>
                </div>

                {/* Diagonal orange background with image */}
                <div className="tw-absolute tw-top-0 tw-right-0 tw-w-[40%] tw-h-full">
                    <div className="tw-absolute tw-inset-0 tw-bg-[#ff5a00] tw-transform tw-origin-top-right tw--skew-x-[12deg] tw-translate-x-32 -tw-ml-40 -tw-mr-6"></div>
                    <div className="tw-relative tw-h-full tw-flex tw-items-center tw-justify-end tw-pr-32">
                        <Image
                            src="/images/Group-240.png"
                            alt="Food delivery"
                            width={500}
                            height={400}
                            className="tw-rounded-lg tw-w-full tw-h-auto tw-max-w-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}