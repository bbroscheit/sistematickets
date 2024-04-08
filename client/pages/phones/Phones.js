import React from 'react'
import { useEffect, useState } from 'react'
import mainStyle from '../../styles/Home.module.css'
import style from '../../modules/phone.module.css'
import PhoneCard from './PhoneCard'


function Phones() {
    const [user, setUser] = useState(null)
    const [mainNumber, setMainNumber] = useState(null)
    const [userAlt, setUserAlt] = useState(null)

    useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/user`)
          .then((res) => res.json())
          .then((data) => {
            setUser(data)
            setUserAlt(data)
          });
      }, []);
    
      useEffect(() => {
        let userLogin = localStorage.getItem("user");
        let loginParse = JSON.parse(userLogin);
        setMainNumber(loginParse.phoneNumber);
      }, []);

      
      function handleSearch(e){
        e.preventDefault()
        const searchTerm = e.target.value.toLowerCase(); // Convertimos el valor a minusculas
        setUserAlt(user.filter(user => {
        const firstNameLowerCase = user.firstname.toLowerCase(); // Convertimos firstname a minusculas
        const lastNameLowerCase = user.lastname.toLowerCase(); // Convertimos lastname a minusculas
        return firstNameLowerCase.includes(searchTerm) || lastNameLowerCase.includes(searchTerm);
    }));
    }
           
  return (
    <div className={mainStyle.container}>
        <h1 className={mainStyle.title}>Internos</h1>
        <div className={style.searchContainer}>
            <h3>Busqueda por usuario</h3>
            <input type="search" onChange={e => handleSearch(e)}/>
        </div>
        <div className={style.phoneCardContainer}>
            {   
                userAlt !== null && userAlt.map( e => <PhoneCard id={e.id} firstname={e.firstname} lastname={e.lastname} phone={e.phonenumber}/>) 
            }
        </div>
    </div>
  )
}

export default Phones