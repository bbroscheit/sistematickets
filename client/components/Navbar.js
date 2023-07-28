import React from "react";
import Link from "next/link";
import Styles from '../modules/Navbar.module.css'; 
import { BiMessageDetail } from 'react-icons/bi';
import { BiUserCircle } from 'react-icons/bi';



const Navbar = () => {
  return (
    <div className={Styles.container}>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
             <Link href="/tickets"><BiMessageDetail /> Soportes</Link>
          </li>
          <li>
            <Link href="/usuarios"><BiUserCircle />Usuarios</Link>
          </li>
        </ul>
      </div>
    
  );
};
export default Navbar;