import React from 'react'
import { useState, useEffect } from 'react'
import style from '../../modules/phoneCard.module.css'

function PhoneCard({id, firstname , lastname, phone}) {

  const [mainNumber, setMainNumber] = useState(null)

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setMainNumber(loginParse.phoneNumber);
  }, []);
 

  return (
    <div key={id} className={style.phoneCard} >
        <p>{` ${firstname} ${lastname}` }</p>
        <h5><a href={`https://172.19.31.19/ws/dial.php?interno=${mainNumber}&numero=${phone}`} target="_blank">{phone}</a></h5>
    </div>
  )
}

export default PhoneCard