import { NavLink } from 'react-router-dom';
import classes from './AdminNavigation.module.css';

export default function AdminNavigation() {
  return (
    <ul className={classes.mainNavigation}>
      <li>
        <NavLink
          to="products"
          className={({ isActive }) =>
            isActive ? classes.linkActive : undefined
          }
        >
          Products
        </NavLink>
      </li>
      <li>
        <NavLink
          to="orders"
          className={({ isActive }) =>
            isActive ? classes.linkActive : undefined
          }
        >
          Orders
        </NavLink>
      </li>
    </ul>
  );
}
