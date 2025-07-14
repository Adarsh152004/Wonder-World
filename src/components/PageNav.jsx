import { NavLink } from 'react-router-dom';
import styles from './PageNav.module.css';
import Logo from './Logo';

function PageNav() {
    return (
        <nav className={styles.nav}>
             <div className={styles.brand}>
        <Logo />
        <h3>WonderWorld</h3>
      </div>
      
            <ul>
                <li>
                    <NavLink to='/pricing'>Pricing</NavLink>
                </li>
                <li>
                    <NavLink to='/dashboard'>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to='/product'>Product</NavLink>
                </li>
                <li>
                    <NavLink to='/login' className={styles.ctaLink}>Login</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default PageNav
