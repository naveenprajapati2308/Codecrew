import { useState } from 'react'
// import './module.style.css'
import { Link } from 'react-router-dom';
// import MainPage from './admin_pages/MainPage';
import MySidebar from './components/MySidebar';
// import Create from '../Create_Problem/Create';
import { Outlet } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import FooterComponent from '../components/FooterComponent';
export default function AdminDashboard() {




    return (
        <div>
            <NavbarComponent />
            
                <MySidebar>

                <Outlet />
                </MySidebar>
            
            {/* <FooterComponent /> */}
        </div>
    )
}