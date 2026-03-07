'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

import logoImage from "@/assets/logo.png";
import classes from "./main-header.module.css";
import HeaderBackground from '@/components/Main-header/Main-header-background'; 
import NavLink from "./Nav-Link";

export default function MainHeader(){

    // this hook gives us currently active path in the url (the part after the domain)
    const path = usePathname();

    return(
        <>
            <HeaderBackground />
            <header className={classes.header}>
                <Link className={classes.logo} href='/'>
                    {/* here you can not use logo directly like this src={logo} but instead it will have an object in which into src key you have the path to the image  */}
                    <img src={logoImage.src} alt="A Plate with food on it" />
                    NextLevel Food
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href="/meals">
                                Brows Meals
                            </NavLink>
                        </li>
                        <li>
                            <NavLink href='/community'>
                                Foodies community
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}