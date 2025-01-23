'use client';

export default function Footer() {
    return (
        <footer className="tw-bg-white tw-py-6 tw-px-4">
            <div className="tw-max-w-6xl tw-mx-auto">
                <nav>
                    <ul className="tw-flex sm:tw-flex-col md:tw-flex-row tw-flex-wrap sm:tw-justify-start md:tw-justify-center tw-gap-x-6 tw-mb-6 tw-list-none tw-gap-6">
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-sm">
                                Sign up a restaurant
                            </a>
                        </li>
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-sm">
                                Jobs
                            </a>
                        </li>
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-sm">
                                Terms of Service
                            </a>
                        </li>
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-sm">
                                Privacy statement
                            </a>
                        </li>
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-sm">
                                Cookie Statement
                            </a>
                        </li>
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-sm">
                                Bug Bounty
                            </a>
                        </li>
                        <li>
                            <a href="#" className="tw-text-gray-700 hover:tw-text-gray-900 tw-text-sm">
                                Ethics hotline
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="sm:tw-text-left md:tw-text-center tw-text-sm tw-text-gray-700 tw-mb-6 sm:tw-ml-8 md:tw-ml-0">
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