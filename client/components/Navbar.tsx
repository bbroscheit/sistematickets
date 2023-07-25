// components/Navbar.tsx
import React from "react";
import Link from "next/link";
import Styles from '../modules/Navbar.module.css'; 


const Navbar = () => {
  return (
    <div className={Styles.container}>
        <ul className="menu menu-horizontal px-1">
          <li>d
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    
  );
};
export default Navbar;
