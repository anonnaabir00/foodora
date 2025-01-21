'use client';

export default function Footer() {
    return (
        <footer className="tw-bg-white tw-py-6 tw-px-4">
            <div className="tw-max-w-6xl tw-mx-auto">
                <nav>
                    <ul className="tw-flex tw-flex-wrap tw-justify-center tw-gap-x-6 tw-mb-4 tw-list-none">
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-xs">
                                Sign up a restaurant
                            </a>
                        </li>
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-xs">
                                Jobs
                            </a>
                        </li>
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-xs">
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-xs">
                                Privacy statement
                            </a>
                        </li>
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-xs">
                                Cookie Statement
                            </a>
                        </li>
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-xs">
                                Bug Bounty
                            </a>
                        </li>
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-xs">
                                Ethics hotline
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="tw-text-center tw-text-xs tw-text-gray-700 tw-mb-3">
                    © 2025 Foodora
                </div>

                <div className="tw-text-center">
                    <a className="tw-text-xs tw-text-gray-700 hover:tw-text-gray-900 tw-underline">
                        Check my cookie preferences
                    </a>
                </div>
            </div>
        </footer>
    );
}