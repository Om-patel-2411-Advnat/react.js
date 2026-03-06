import Link from "next/link";

import logoImage from "@/assets/logo.png";
import classes from "./main-header.module.css";

export default function MainHeader(){
    return(
        <header className={classes.header}>
            <Link className={classes.logo} href='/'>
                {/* here you can not use logo directly like this src={logo} but instead it will have an object in which into src key you have the path to the image  */}
                <img src={logoImage.src} alt="A Plate with food on it" />
                NextLevel Food
            </Link>

            <nav className={classes.nav}>
                <ul>
                    <li>
                        <Link href="/meals">Brows Meals</Link>
                    </li>
                    <li>
                        <Link href="/community">Foodies community</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}