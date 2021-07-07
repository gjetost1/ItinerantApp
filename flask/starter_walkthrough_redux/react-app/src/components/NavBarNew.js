import { Disclosure } from '@headlessui/react';
import { useSelector } from 'react-redux';
import React from 'react';
import logo from './itinerantlogo.png'

import Calendar from 'react-calendar';
import LogoutButton from './auth/LogoutButton';
import LoginForm from './auth/LoginForm';


const navigation = [
  { name: 'My Map', href: '/', current: true },
  {
    name: 'Destinations',
    current: false,
    children: [
      { name: 'Create Destination', href: '/destinations/create' },
      { name: 'All Destinations', href: '/destinations' },
    ],
  },
  {
    name: 'Calendar',
    current: false,
    children: [
      { name: 'Create Event', href: '/calendar/create' },
      { name: 'Full Calendar', href: '/calendar' },
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

        <div className="w-1/4 h-full flex-col flex-grow border-r-100 pt-5 pb-4 overflow-y-auto overflow-x-hidden absolute z-10" style={{backgroundColor:"#f59e0b"}}>
        <div className="flex items-center flex-shrink-0 px-4">
            <div className="w-auto h-auto font-medium rounded-full shadow-sm" style={{ fontSize:"5vh", color:"white", marginLeft:"1vw"}}></div>
            <img
            className="w-auto"
            src={logo}
            alt="Itinerant"
            style={{height:"15vh", width:"25vw", zIndex:"100"}}
            />
        </div>
        <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1"  aria-label="Sidebar">
            {navigation.map((item) =>
                !item.children ? (
                    <div key={item.name}>
                    <a style={{backgroundColor:"#333333", color:"white", zIndex:100}}
                    href={item.href}
                    className={classNames(
                        item.current
                        ? 'bg-gray-100 text-opacity-100 text-white z-100'
                        : 'bg-white text-white text-opacity-100 hover:bg-gray-50 hover:text-black z-100',
                        'group w-full flex items-center pl-7 pr-2 py-2 text-sm font-medium rounded-md z-100'
                        )}
                        >
                    {item.name}
                    </a>
                </div>
                ) : (
                    <Disclosure as="div" key={item.name} className="space-y-1" style={{backgroundColor:"#333333"}}>
                    {({ open }) => (
                        <>
                        <Disclosure.Button
                        className={classNames(
                            item.current
                            ? 'bg-gray-100 text-opacity-100 text-white'
                            : 'bg-white text-opacity-100 text-black hover:bg-gray-50 hover:text-gray-900',
                            'group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                            )}
                            >
                        <svg
                            className={classNames(
                                open ? 'text-white rotate-90' : 'text-white',
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
                            className="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium text-white rounded-md hover:text-gray-900 hover:bg-gray-50"

                            >
                            {subItem.name}
                            </a>

                        ))}

                        <div style={{backgroundColor:"white"}} >{item.name==='Calendar' ? <Calendar />: null } </div>
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
