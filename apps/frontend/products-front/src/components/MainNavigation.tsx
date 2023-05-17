import { NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import classes from './MainNavigation.module.css';
import { Badge } from '@mui/material';
import { useSelector } from 'react-redux';

export default function MainNavigation() {
  const cartState = useSelector((state: any) => state.cart);

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
          to="/admin/products"
          className={({ isActive }) =>
            isActive ? classes.linkActive : undefined
          }
        >
          Admin
        </NavLink>
      </li>
      <li className={classes.cart}>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? classes.linkActive : undefined
          }
        >
          <Badge badgeContent={cartState.products.length} color="info">
            <ShoppingCartIcon />
          </Badge>
        </NavLink>
      </li>
    </ul>
  );
}
