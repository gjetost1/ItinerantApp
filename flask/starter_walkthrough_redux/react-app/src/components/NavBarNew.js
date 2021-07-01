import { Disclosure } from '@headlessui/react';
import { useSelector } from 'react-redux';
import React from 'react';
import logo from './itinerantlogo.png'
import CalendarTest from './Calendar';
import Calendar from 'react-calendar';
import LogoutButton from './auth/LogoutButton';
import LoginForm from './auth/LoginForm';


const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  {
    name: 'Destinations',
    current: false,
    children: [
      { name: 'Create Destination', href: '/destinations/create' },
      { name: 'All Destinations', href: '/destinations' },
      // { name: 'Restaurants', href: '/destinations/' },
      // { name: 'Parks', href: '/destinations/' },
    ],
  },
  {
    name: 'Calendar',
    current: false,
    children: [{ name: 'Full Calendar', href: '/calendar' },

    ],
  },

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBarNew() {
  const user = useSelector((state) => state.session.user);
  return (
      <div className="h-full">

        <div className=" w-1/4 h-full flex-col flex-grow border-r-100 border-gray-200 pt-5 pb-4 overflow-y-auto overflow-x-hidden bg-yellow-500 absolute z-10">
        <div className="flex  items-center flex-shrink-0 px-4">
            <img
            className="h-8 w-auto"
            src={logo}
            alt="Itinerant"
            />
            <h1>Itinerant</h1>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1 bg-white" aria-label="Sidebar">
            {navigation.map((item) =>
                !item.children ? (
                    <div key={item.name}>
                    <a
                    href={item.href}
                    className={classNames(
                        item.current
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md'
                        )}
                        >
                    {item.name}
                    </a>
                </div>
                ) : (
                    <Disclosure as="div" key={item.name} className="space-y-1">
                    {({ open }) => (
                        <>
                        <Disclosure.Button
                        className={classNames(
                            item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                            'group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            )}
                            >
                        <svg
                            className={classNames(
                                open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                                'mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                                )}
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                                >
                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                        </svg>
                        {item.name}
                        </Disclosure.Button>
                        <Disclosure.Panel className="space-y-1">
                        {item.children.map((subItem) => (
                            <a
                            key={subItem.name}
                            href={subItem.href}
                            className="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"

                            >
                            {subItem.name}
                            </a>

                        ))}

                        <div >{item.name==='Calendar' ? <Calendar />: null } </div>
                        </Disclosure.Panel>
                    </>
                    )}
                </Disclosure>
                )
                )}
            </nav>
        </div>
        {!user && (<LoginForm/>)}
        {user && (<LogoutButton/>)}

        </div>
    </div>

  )
}
