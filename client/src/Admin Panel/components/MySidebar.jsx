import React, { useEffect, useState } from 'react';
// import {
//     FaTh,
//     FaBars,
//     FaUserAlt,
//     FaRegChartBar,
//     FaCommentAlt,
//     FaShoppingBag,
//     FaThList
// }from "react-icons/fa";
import { NavLink , useLocation  } from 'react-router-dom';
import { ArrowRight, List , JournalText,JournalPlus , People , House , PieChartFill , CaretRightSquare} from 'react-bootstrap-icons';


const Sidebar = ({ children }) => {

    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/admin/dashboard",
            name: "Dashboard",
            icon: <ArrowRight />
        },
        {
            path: "/admin/create",
            name: "Create Problem",
            icon: <ArrowRight />
        },
        {
            path: "/admin/problems",
            name: "Problems",
            icon: <ArrowRight />
        },
        {
            path: "/admin/users",
            name: "Users",
            icon: <ArrowRight />
        },
        // {
        //     path:"/admin",
        //     name:"Product",
        //     icon:<ArrowRight/>
        // },
        // {
        //     path:"/admin",
        //     name:"Product List",
        //     icon:<ArrowRight/>
        // }
    ]

    const [rerender , setRerender] = useState(false)

    const { hash, pathname, search } = location;
    // console.log(pathname);
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Dashboard", src: "Chart_fill" , path: "/admin/dashboard", icon :<House  size={25}/>},
        { title: "Create Problem", src: "Chat" , path: "/admin/create", icon :<JournalPlus  size={25}/>},
        { title: "Problems", src: "User", gap: true , path: "/admin/problems", icon :<JournalText  size={25}/> },
        { title: "Users ", src: "Calendar" , path: "/admin/users", icon :<People  size={25}/>},
        // { title: "Search", src: "Search" , icon :<People  size={25}/> },
        // { title: "Analytics", src: "Chart" , icon :<PieChartFill  size={25}/> , },
        // { title: "Files ", src: "Folder", gap: true },
        // { title: "Setting", src: "Setting" },
    ];


    return (
        <div className="tw-flex tw-flex-nowrap">
            <div
                className={` ${open ? "tw-w-60" : "tw-w-20"} tw-bg-slate-800 tw-h-screen tw-p-5  tw-pt-8 tw-sticky tw-top-0 tw-duration-300`}
            >
                <img
                    src="https://res.cloudinary.com/dqasiuje0/image/upload/v1713351249/samples/hdcktek0v4n3qbqxg5md.png"
                    className={`tw-absolute tw-cursor-pointer -tw-right-3 tw-top-9 tw-w-7 tw-border-blue-900
            tw-border-2 tw-rounded-full  ${!open && "tw-rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                {/* <CaretRightSquare  color='white' size={20}  className={`tw-absolute tw-cursor-pointer -tw-right-3 tw-top-9 tw-w-7 tw-border-blue-900
            tw-border-2 tw-rounded-full  ${!open && "tw-rotate-180"}`} onClick={() => setOpen(!open)}/> */}
                <div className="tw-flex tw-gap-x-4 tw-items-center">
                    <img
                        src="https://res.cloudinary.com/dqasiuje0/image/upload/v1713351040/samples/dgpggz0zk8psfin2vybh.png"
                        className={`tw-cursor-pointer tw-duration-500 ${open && "tw-rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`tw-text-white tw-origin-left tw-font-medium tw-text-xl tw-duration-200 ${!open && "tw-scale-0"
                            }`}
                    >
                        Navigation
                    </h1>
                </div>
                <ul className="tw-pt-6 tw-flex tw-flex-col tw-justify-items-end">
                    {Menus.map((Menu, index) => (
                    <NavLink  key={Menu.title} to={`${Menu.path}`} className={'remove-underline'}>
                        <li
                            onClick={()=>setRerender(!rerender)}
                            key={index}
                            className={`tw-flex  tw-rounded-md tw-p-2 tw-cursor-pointer  tw-text-gray-300 tw-text-sm tw-items-center tw-gap-x-4 
                            ${Menu.gap ? "tw-mt-9" : "tw-mt-2"} ${index === 0 && "tw-bg-light-white"
                                } ${Menu.path == pathname ? "tw-bg-purple-800 hover:tw-bg-purple-800" : 'hover:tw-bg-white/10'}`}
                        >
                            
                            {/* <img src={`../../src/assets/${Menu.src}.png`} /> */}
                            {/* <ArrowRight /> */}
                            {Menu.icon}
                            <span className={`${!open && "tw-hidden"} tw-origin-left tw-duration-200 tw-font-semibold tw-text-base `}>
                                {Menu.title}
                            </span>
                        </li>
                        </NavLink>
                    ))}
                </ul>
            </div>
            <div className="tw-h-full tw-w-full tw-min-w-0">
                {children}
            </div>
        </div>
    );
};

export default Sidebar;