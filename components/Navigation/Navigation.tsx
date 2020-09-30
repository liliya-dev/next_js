import Link from 'next/link';
import classes from './Navigation.module.scss';
import logo from './images/logo.jpg';

export const Navigation = () => {
    return (
        <nav className={classes.nav}>
            <Link href='/'>
                <a>
                    <img className={classes.nav__logo} src={logo} alt="logo with hand and beer"/>
                </a>
            </Link>
            <ul className={classes.nav__list}>
                <li className={classes.nav__item}>
                    <Link href='/about'>
                        <a className={classes.nav__link}>About us</a>
                    </Link>
                </li>
                <li className={classes.nav__item}>
                    <Link href='/beers'>
                        <a className={classes.nav__link}>Beers</a>
                    </Link>
                </li>
                <li className={classes.nav__item}>
                    <Link href='/contacts'>
                        <a className={classes.nav__link}>Contacts</a>
                    </Link>
                </li>
            </ul>
            <ul className={classes.nav__list_small}>
                <li className={classes.nav__item}>
                    <Link  href='/favourite'>
                        <a className={classes.nav__link}>Favourite</a>
                    </Link>
                </li>
            </ul>
            
        </nav>
    )
}