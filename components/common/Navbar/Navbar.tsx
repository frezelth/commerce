import React, {FC, Fragment, useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo, Container } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import {HeartIcon, MenuIcon, SearchIcon, ShoppingBagIcon, XIcon} from '@heroicons/react/outline'
import Minicart from "@components/cart/Minicart";

interface Navigation {
  categories: Menu[]
}

interface Menu {
  id: string
  name: string
  href: string
  sections: Section[]
  featured: Featured[]
}
interface Section {
  id: string
  name: string
  href: string
  items: Item[]
}
interface Item {
  href: string
  name: string
}
interface Featured {
  id: string
  name: string
  href: string
  imageSrc: string
  imageAlt: string
}
interface NavbarProps {
  navigation?: Navigation
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
//
// export default function Navbar(menus: FC<NavbarProps>) {
//   const [open, setOpen] = useState(false)
//
//   return (
//     <div className="bg-white">
//       {/* Mobile menu */}
//       <Transition.Root show={open} as={Fragment}>
//         <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpen}>
//           <Transition.Child
//             as={Fragment}
//             enter="transition-opacity ease-linear duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="transition-opacity ease-linear duration-300"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>
//
//           <Transition.Child
//             as={Fragment}
//             enter="transition ease-in-out duration-300 transform"
//             enterFrom="-translate-x-full"
//             enterTo="translate-x-0"
//             leave="transition ease-in-out duration-300 transform"
//             leaveFrom="translate-x-0"
//             leaveTo="-translate-x-full"
//           >
//             <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
//               <div className="px-4 pt-5 pb-2 flex">
//                 <button
//                   type="button"
//                   className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
//                   onClick={() => setOpen(false)}
//                 >
//                   <span className="sr-only">Close menu</span>
//                   <XIcon className="h-6 w-6" aria-hidden="true" />
//                 </button>
//               </div>
//
//               {/* Links */}
//               <Tab.Group as="div" className="mt-2">
//                 <div className="border-b border-gray-200">
//                   <Tab.List className="-mb-px flex px-4 space-x-8">
//                     {navigation.categories.map((category) => (
//                       <Tab
//                         key={category.name}
//                         className={({ selected }) =>
//                           classNames(
//                             selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
//                             'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
//                           )
//                         }
//                       >
//                         {category.name}
//                       </Tab>
//                     ))}
//                   </Tab.List>
//                 </div>
//                 <Tab.Panels as={Fragment}>
//                   {navigation.categories.map((category) => (
//                     <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
//                       <div className="grid grid-cols-2 gap-x-4">
//                         {category.featured.map((item) => (
//                           <div key={item.name} className="group relative text-sm">
//                             <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
//                               <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
//                             </div>
//                             <a href={item.href} className="mt-6 block font-medium text-gray-900">
//                               <span className="absolute z-10 inset-0" aria-hidden="true" />
//                               {item.name}
//                             </a>
//                             <p aria-hidden="true" className="mt-1">
//                               Shop now
//                             </p>
//                           </div>
//                         ))}
//                       </div>
//                       {category.sections.map((section) => (
//                         <div key={section.name}>
//                           <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
//                             {section.name}
//                           </p>
//                           <ul
//                             role="list"
//                             aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
//                             className="mt-6 flex flex-col space-y-6"
//                           >
//                             {section.items.map((item) => (
//                               <li key={item.name} className="flow-root">
//                                 <a href={item.href} className="-m-2 p-2 block text-gray-500">
//                                   {item.name}
//                                 </a>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       ))}
//                     </Tab.Panel>
//                   ))}
//                 </Tab.Panels>
//               </Tab.Group>
//
//               <div className="border-t border-gray-200 py-6 px-4 space-y-6">
//                 {navigation.pages.map((page) => (
//                   <div key={page.name} className="flow-root">
//                     <Link href={page.href}>
//                       <a className="-m-2 p-2 block font-medium text-gray-900">
//                         {page.name}
//                       </a>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//
//               <div className="border-t border-gray-200 py-6 px-4 space-y-6">
//                 <div className="flow-root">
//                   <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
//                     Se connecter
//                   </a>
//                 </div>
//                 <div className="flow-root">
//                   <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
//                     Créer un compte
//                   </a>
//                 </div>
//               </div>
//
//             </div>
//           </Transition.Child>
//         </Dialog>
//       </Transition.Root>
//
//       <header className="relative bg-white">
//         <p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
//           Get free delivery on orders over $100
//         </p>
//
//         <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="border-b border-gray-200">
//             <div className="h-16 flex items-center">
//               <button
//                 type="button"
//                 className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
//                 onClick={() => setOpen(true)}
//               >
//                 <span className="sr-only">Open menu</span>
//                 <MenuIcon className="h-6 w-6" aria-hidden="true" />
//               </button>
//
//               {/* Logo */}
//               <div className="ml-4 flex lg:ml-0">
//                 <Logo/>
//               </div>
//
//               {/* Flyout menus */}
//               <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
//                 <div className="h-full flex space-x-8">
//                   {navigation.categories.map((category) => (
//                     <Popover key={category.name} className="flex">
//                       {({ open }) => (
//                         <>
//                           <div className="relative flex">
//                             <Popover.Button
//                               className={classNames(
//                                 open
//                                   ? 'border-indigo-600 text-indigo-600'
//                                   : 'border-transparent text-gray-700 hover:text-gray-800',
//                                 'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
//                               )}
//                             >
//                               {category.name}
//                             </Popover.Button>
//                           </div>
//
//                           <Transition
//                             as={Fragment}
//                             enter="transition ease-out duration-200"
//                             enterFrom="opacity-0"
//                             enterTo="opacity-100"
//                             leave="transition ease-in duration-150"
//                             leaveFrom="opacity-100"
//                             leaveTo="opacity-0"
//                           >
//                             <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
//                               {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
//                               <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />
//
//                               <div className="relative bg-white">
//                                 <div className="max-w-7xl mx-auto px-8">
//                                   <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
//                                     <div className="col-start-2 grid grid-cols-2 gap-x-8">
//                                       {category.featured.map((item) => (
//                                         <div key={item.name} className="group relative text-base sm:text-sm">
//                                           <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
//                                             <img
//                                               src={item.imageSrc}
//                                               alt={item.imageAlt}
//                                               className="object-center object-cover"
//                                             />
//                                           </div>
//                                           <a href={item.href} className="mt-6 block font-medium text-gray-900">
//                                             <span className="absolute z-10 inset-0" aria-hidden="true" />
//                                             {item.name}
//                                           </a>
//                                           <p aria-hidden="true" className="mt-1">
//                                             Shop now
//                                           </p>
//                                         </div>
//                                       ))}
//                                     </div>
//                                     <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
//                                       {category.sections.map((section) => (
//                                         <div key={section.name}>
//                                           <p id={`${section.name}-heading`} className="font-medium text-gray-900">
//                                             {section.name}
//                                           </p>
//                                           <ul
//                                             role="list"
//                                             aria-labelledby={`${section.name}-heading`}
//                                             className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
//                                           >
//                                             {section.items.map((item) => (
//                                               <li key={item.name} className="flex">
//                                                 <a href={item.href} className="hover:text-gray-800">
//                                                   {item.name}
//                                                 </a>
//                                               </li>
//                                             ))}
//                                           </ul>
//                                         </div>
//                                       ))}
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </Popover.Panel>
//                           </Transition>
//                         </>
//                       )}
//                     </Popover>
//                   ))}
//
//                   {navigation.pages.map((page) => (
//                     <a
//                       key={page.name}
//                       href={page.href}
//                       className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
//                     >
//                       {page.name}
//                     </a>
//                   ))}
//                 </div>
//               </Popover.Group>
//
//               <div className="ml-auto flex items-center">
//                 <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
//                   <Link href="/account/sign-in">
//                     <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
//                       Se connecter
//                     </a>
//                   </Link>
//                   <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
//                   <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
//                     Create account
//                   </a>
//                 </div>
//
//                 {/* Search */}
//                 <div className="flex lg:ml-6">
//                   <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
//                     <span className="sr-only">Search</span>
//                     <SearchIcon className="w-6 h-6" aria-hidden="true" />
//                   </a>
//                 </div>
//
//                 {/* Wishlist */}
//                 <div className="flex lg:ml-6">
//                   <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
//                     <span className="sr-only">Search</span>
//                     <HeartIcon className="w-6 h-6" aria-hidden="true" />
//                   </a>
//                 </div>
//
//                 {/* Cart */}
//                 <div className="ml-4 flow-root lg:ml-6">
//                   <Minicart/>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>
//     </div>
//   )
// }

const Navbar: FC<NavbarProps> = ({ navigation }) => {
  let timeout: NodeJS.Timeout // NodeJS.Timeout
  const timeoutDuration = 200

  const openedButton = useRef<HTMLButtonElement>() // useRef<HTMLButtonElement>(null)
  const [openState, setOpenState] = useState(false)

  const toggleMenu = (open: boolean) => {
    // log the current open state in React (toggle open state)
    setOpenState((openState) => !openState)
    // toggle the menu by clicking on buttonRef
    openedButton?.current?.click()
  }

  // Open the menu after a delay of timeoutDuration
  const onHover = (open: boolean, action: string) => {
    // if the modal is currently closed, we need to open it
    // OR
    // if the modal is currently open, we need to close it
    // if (
    //   (!open && !openState && action === "onMouseEnter") ||
    //   (open && openState && action === "onMouseLeave")
    // ) {
      // clear the old timeout, if any
      clearTimeout(timeout)
      // open the modal after a timeout
      timeout = setTimeout(() => toggleMenu(open), timeoutDuration)
    // }
    // else: don't click!
  }

  const handleMouseOver = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.type === "mouseenter"){
      console.log("mouseenter")
      openedButton.current = event.currentTarget
      toggleMenu(true)
    } else if (event.type == "mouseleave"){
      console.log("mouseleave")
      toggleMenu(false)
    }
    console.log(openedButton)
  };

  const handleClick = (open: any) => {
    setOpenState(!open) // toggle open state in React state
    clearTimeout(timeout) // stop the hover timer if it's running
  }

  const handleClickOutside = (event: { target: any; stopPropagation: () => void }) => {
    if (openedButton.current && !openedButton.current.contains(event.target)) {
      event.stopPropagation()
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  return (
    <div className="bg-white">
       {/*Mobile menu*/}
      <Transition.Root show={openState} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setOpenState}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpenState(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Links */}
              <Tab.Group as="div" className="mt-2">
                <div className="border-b border-gray-200">
                  <Tab.List className="-mb-px flex px-4 space-x-8">
                    {navigation?.categories.map((category) => (
                      <Tab
                        key={category.name}
                        className={({ selected }) =>
                          classNames(
                            selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                            'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                          )
                        }
                      >
                        {category.name}
                      </Tab>
                    ))}
                    <Tab
                      key="about"
                      className={({ selected }) =>
                        classNames(
                          selected ? 'text-indigo-600 border-indigo-600' : 'text-gray-900 border-transparent',
                          'flex-1 whitespace-nowrap py-4 px-1 border-b-2 text-base font-medium'
                        )
                      }
                    >
                      A propos
                    </Tab>
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  {navigation?.categories.map((category) => (
                    <Tab.Panel key={category.name} className="pt-10 pb-8 px-4 space-y-10">
                      <div className="grid grid-cols-2 gap-x-4">
                        {category.featured.map((item) => (
                          <div key={item.name} className="group relative text-sm">
                            <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                              <img src={item.imageSrc} alt={item.imageAlt} className="object-center object-cover" />
                            </div>
                            <a href={item.href} className="mt-6 block font-medium text-gray-900">
                              <span className="absolute z-10 inset-0" aria-hidden="true" />
                              {item.name}
                            </a>
                            {/*<p aria-hidden="true" className="mt-1">*/}
                            {/*  Shop now*/}
                            {/*</p>*/}
                          </div>
                        ))}
                      </div>
                      {category.sections.map((section) => (
                        <div key={section.name}>
                          <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                            {section.name}
                          </p>
                          <ul
                            role="list"
                            aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {section.items.map((item) => (
                              <li key={item.name} className="flow-root">
                                <a href={item.href} className="-m-2 p-2 block text-gray-500">
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </Tab.Panel>
                  ))}
                </Tab.Panels>
              </Tab.Group>

              {/*<div className="border-t border-gray-200 py-6 px-4 space-y-6">*/}
              {/*  {navigation?.pages.map((page) => (*/}
              {/*    <div key={page.name} className="flow-root">*/}
              {/*      <Link href={page.href}>*/}
              {/*        <a className="-m-2 p-2 block font-medium text-gray-900">*/}
              {/*          {page.name}*/}
              {/*        </a>*/}
              {/*      </Link>*/}
              {/*    </div>*/}
              {/*  ))}*/}
              {/*</div>*/}

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  <div key="about" className="flow-root">
                    <Link href="/a-propos">
                      <a className="-m-2 p-2 block font-medium text-gray-900">
                        A propos
                      </a>
                    </Link>
                  </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                <div className="flow-root">
                  <Link href="/account/sign-in">
                    <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                      Se connecter
                    </a>
                  </Link>
                </div>
                <div className="flow-root">
                  <a href="#" className="-m-2 p-2 block font-medium text-gray-900">
                    Créer un compte
                  </a>
                </div>
              </div>

            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="bg-white">
        <p className="bg-indigo-600 h-10 flex items-center justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p>

        <nav aria-label="Top" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="h-16 flex items-center">
              <button
                type="button"
                className="bg-white p-2 rounded-md text-gray-400 lg:hidden"
                onClick={() => setOpenState(true)}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <a href="#"><Logo/></a>
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="h-full flex space-x-8">
                  {navigation?.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div
                            className="flex">
                            <Popover.Button
                              onMouseEnter={handleMouseOver}
                              onMouseLeave={handleMouseOver}
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium border-b-2 -mb-px pt-px'
                              )}
                            >
                              {category.name}

                              <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Popover.Panel className="absolute top-full inset-x-0 text-sm text-gray-500">
                                  {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                  <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                                  <div className="relative bg-white">
                                    <div className="max-w-7xl mx-auto px-8">
                                      <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                        <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                          {category.featured.map((item) => (
                                            <div key={item.name} className="group relative text-base sm:text-sm">
                                              <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75">
                                                <img
                                                  src={item.imageSrc}
                                                  alt={item.imageAlt}
                                                  className="object-center object-cover"
                                                />
                                              </div>
                                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                                <span className="absolute z-10 inset-0" aria-hidden="true" />
                                                {item.name}
                                              </a>
                                              {/*<p aria-hidden="true" className="mt-1">*/}
                                              {/*  Shop now*/}
                                              {/*</p>*/}
                                            </div>
                                          ))}
                                        </div>
                                        <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                          {category.sections.map((section) => (
                                            <div key={section.name}>
                                              <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                                {section.name}
                                              </p>
                                              <ul
                                                role="list"
                                                aria-labelledby={`${section.name}-heading`}
                                                className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                              >
                                                {section.items.map((item) => (
                                                  <li key={item.name} className="flex">
                                                    <a href={item.href} className="hover:text-gray-800">
                                                      {item.name}
                                                    </a>
                                                  </li>
                                                ))}
                                              </ul>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>

                            </Popover.Button>
                          </div>
                        </>
                      )}
                    </Popover>
                  ))}

                  <Link href="/a-propos">
                    <a
                      key="about"
                      href="#"
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      A propos
                    </a>
                  </Link>
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link href="/account/sign-in">
                    <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                      Se connecter
                    </a>
                  </Link>
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Créer un compte
                  </a>
                </div>

                {/* Search */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <SearchIcon className="w-6 h-6" aria-hidden="true" />
                  </a>
                </div>

                {/* Wishlist */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <HeartIcon className="w-6 h-6" aria-hidden="true" />
                  </a>
                </div>

                 {/*Cart*/}
                <div className="ml-4 flow-root lg:ml-6">
                  <Minicart/>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar
