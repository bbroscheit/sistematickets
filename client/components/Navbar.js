import React from "react";
import Link from "next/link";
import Styles from '../modules/Navbar.module.css'; 


const Navbar = () => {
  return (
    <div className={Styles.container}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/tickets">Tickets</Link>
          </li>
          <li>
            <Link href="/usuarios">Usuarios</Link>
          </li>
        </ul>
      </div>
    
  );
};
export default Navbar;