// here link just work as a common <a> tag
// import { Link } from "react-router-dom";

// if we want soem feature like it should high light which component is being seen on the page than we can use <navLink>
import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

export default function MainNavigation() {
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        {/* this <NavLink> here does not take class as className it takes a function as an argument and that function should return the class name*/}
                        {/* the function automatically recieves an object which we can destructure */}
                        <NavLink 
                            to="/"
                            className={({ isActive }) => 
                                isActive ? classes.active : undefined
                            }
                            // you can also apply styling like this conditionally
                            // style={({isActive})=> ({
                            //     textAlign: isActive ? 'center' : 'left'
                            //     })
                            // }
                            // here this end indicates that this link should only be considered active if the currently active route ends with the given path after the URL 
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Products
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}