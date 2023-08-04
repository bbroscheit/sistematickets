import React from "react";
import { useEffect , useState } from "react";
import Link from "next/link";
import Styles from '../modules/Navbar.module.css'; 
import { BiMessageDetail } from 'react-icons/bi';
import { BiUserCircle } from 'react-icons/bi';


const Navbar = () => {

  const [user , setUser ] = useState (null)


  useEffect(() => {
      let response = JSON.parse(localStorage.getItem('user'));
      setUser({response})
      console.log(response)
  },[])

  return (
    <div className={Styles.container}>
        <ul>
          <li>
            <Link href="/">Ingresa al Sistema</Link>
          </li>
          <li>
             <Link href="/tickets"><BiMessageDetail /> Soportes</Link>
          </li>
          {
            user && user.isWorker === true ? <li><Link href="/usuarios"><BiUserCircle />Usuarios</Link></li> : null
          }
          
          <li>
            <Link href="/usuarios"><BiUserCircle />Cerrar Sesion</Link>
          </li>
        </ul>
      </div>
    
  );
};
export default Navbar;