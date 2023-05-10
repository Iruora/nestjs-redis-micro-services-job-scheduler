import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

export default function MainNavigation() {
  return (
    <ul className={classes.mainNavigation}>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? classes.linkActive : undefined
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? classes.linkActive : undefined
          }
        >
          Admin
        </NavLink>
      </li>
    </ul>
  );
}
