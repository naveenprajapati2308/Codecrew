import NavbarComponent from "./components/NavbarComponent"
import {Outlet} from 'react-router-dom'
import FooterComponent from './components/FooterComponent'

export default function HomeLayout() {
    return (
        <main>
            <NavbarComponent />
            <Outlet />
            <FooterComponent />
        </main>
    )
}