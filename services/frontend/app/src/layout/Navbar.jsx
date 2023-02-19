import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import TrackAndTrace from "../img/TrackAndTrace.png";

export default function Navbar() {
    const [pageNavigation, setPageNavigation] = useState([
        { name: "Home", href: "/home" },
        { name: "Back to Worldgate", href: "/worldgate" },
        { name: "Learn More", href: "/learn-more" },
    ]);

    const renderDisclosureNavbarItems = pageNavigation.map((item) => (
        <Disclosure.Button
            key={item.name}
            as='a'
            href={item.href}
            className="text-gray-500 font-semibold hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
        >
            {item.name}
        </Disclosure.Button>
    ));

    return (
        <Disclosure as='nav' className='bg-white '>
            {({ open }) => (
                <>
                    <div className='flex h-16 justify-between mx-auto max-w-full px-6 sm:px-6 lg:px-8'>
                        <img className='inline w-15 h-9 my-3' src={TrackAndTrace} alt='Track&Trace logo' />
                        <RoutingItems open={open} pageNavigation={pageNavigation} />
                    </div>
                    <Disclosure.Panel className='md:hidden'>
                        <div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>{renderDisclosureNavbarItems}</div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

function RoutingItems({ open, pageNavigation }) {
    return (
        <>
            <MobileNavbarItems open={open} />
            <DesktopNavbarItems pageNavigation={pageNavigation} />
        </>
    );
}

function MobileNavbarItems({ open }) {
    return (
        <div className='flex'>
            <div className='mx-2 flex space-x-3 items-center md:hidden'>
                {
                    displaySignInButton() ? (<SignInButton />) : ""
                }
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 
                text-gray-500 hover:text-gray-700 outline outline-gray-400 focus:outline-none focus:ring-2 focus:ring-inset'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                        <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                        <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                </Disclosure.Button>
            </div>
        </div>
    );
}

function DesktopNavbarItems({ pageNavigation }) {
    const [currentPage, setCurrentPage] = useState("");

    const renderNavbarItems = pageNavigation.map((routingItem) => (
        <Link
            to={routingItem.href}
            key={routingItem.name}
            className="text-gray-500 font-semibold hover:text-gray-700 drop-shadow-2xl shadow-gray-800 px-3 py-2 text-sm font-medium"
            onClick={() => setCurrentPage(routingItem.href)}
        >
            {routingItem.name}
        </Link>
    ));

    return (
        <div className="hidden md:flex md:justify-between md:space-x-5">
            <div className='relative inline-flex items-center'>
                {renderNavbarItems}
            </div>
            {
                displaySignInButton() ?
                    (<SignInButton />)
                    : ""
            }
        </div>
    );
}

function SignInButton() {
    return (
        <button type="button" className='relative inline-flex items-center rounded-lg bg-blue-500 hover:bg-blue-700 
        px-5 md:px-6 py-3 md:py-0 my-2 md:my-2.5 text-sm font-semibold text-white'>Sign In</button>
    );
}

function displaySignInButton() {
    const currentUrl = document.location.toString().split("/");
    const page = `/${currentUrl[currentUrl.length - 1]}`;
    if (page === "/" || page === "/sign-up") {
        return true;
    }
    return false;
}
