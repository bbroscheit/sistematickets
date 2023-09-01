import React from "react";
import { useState, useEffect } from "react";
import  Router from "next/router";
import style from "../../modules/newSoporte.module.css";
import mainStyle from "@/styles/Home.module.css";
import {postTicketUserResolved} from '@/pages/api/postTicketUserResolved.js'
import {postTicket} from '@/pages/api/postTicket.js'

function nuevoSoporte() {
  const [title, setTitle] = useState({ id: 0 });
  const [sugerencia , setSugerencia] = useState ({ state : false })
  const [select , setSelect] = useState ( { select : ""})
  const [faqFilter, setFaqFilter] = useState(null)
  const [input , setInput] = useState({
    state: "", 
    worker: "", 
    subject: "", 
    detail: "", 
    userresolved: false, 
  })
  const [option, setOption] = useState({ state: false });
  const [faq, setFaq] = useState(null);
  const [user, setUser] = useState(null)

  const hardcoreFaq = [
    {
      id: 1,
      title: "frecuente nº 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta felis eu tellus tincidunt iaculis. Cras posuere aliquam ipsum, sit amet dapibus nisl aliquam sed. Aenean tempus tincidunt dolor, eu vulputate odio laoreet et. Proin pellentesque enim orci, eget consequat ipsum facilisis vitae. Quisque laoreet lacinia neque dapibus pulvinar. Phasellus. ",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta felis eu tellus tincidunt iaculis. Cras posuere aliquam ipsum, sit amet dapibus nisl aliquam sed. Aenean tempus tincidunt dolor, eu vulputate odio laoreet et. Proin pellentesque enim orci, eget consequat ipsum facilisis vitae. Quisque laoreet lacinia neque dapibus pulvinar. Phasellus.",
      uresolved: true,
    },
    {
      id: 2,
      title: "frecuente nº 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta felis eu tellus tincidunt iaculis. Cras posuere aliquam ipsum, sit amet dapibus nisl aliquam sed. Aenean tempus tincidunt dolor, eu vulputate odio laoreet et. Proin pellentesque enim orci, eget consequat ipsum facilisis vitae. Quisque laoreet lacinia neque dapibus pulvinar. Phasellus. ",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta felis eu tellus tincidunt iaculis. Cras posuere aliquam ipsum, sit amet dapibus nisl aliquam sed. Aenean tempus tincidunt dolor, eu vulputate odio laoreet et. Proin pellentesque enim orci, eget consequat ipsum facilisis vitae. Quisque laoreet lacinia neque dapibus pulvinar. Phasellus.",
      uresolved: false,
    },
    {
      id: 3,
      title: "frecuente nº 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta felis eu tellus tincidunt iaculis. Cras posuere aliquam ipsum, sit amet dapibus nisl aliquam sed. Aenean tempus tincidunt dolor, eu vulputate odio laoreet et. Proin pellentesque enim orci, eget consequat ipsum facilisis vitae. Quisque laoreet lacinia neque dapibus pulvinar. Phasellus. ",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam porta felis eu tellus tincidunt iaculis. Cras posuere aliquam ipsum, sit amet dapibus nisl aliquam sed. Aenean tempus tincidunt dolor, eu vulputate odio laoreet et. Proin pellentesque enim orci, eget consequat ipsum facilisis vitae. Quisque laoreet lacinia neque dapibus pulvinar. Phasellus.",
      uresolved: true,
    },
  ];

  useEffect(() => {
    //trae el usuario que generara el soporte
    const user = localStorage.getItem('user');
  },[])

  useEffect(() => {
    setInput({
      state: "sin asignar", 
      //usuario que genera el soporte
      worker: "bbroscheit", 
      subject: "", 
      detail: "", 
      userresolved: false, 
    })
  },[])


  function handleSelect(e) {
      e.preventDefault()
      console.log("value" , e.target.value)
      if(e.target.value === "otros"){
        console.log("entre caso 1")
        setSugerencia({ state : false})
        setSelect({ select : "otros" })
      }else if( e.target.value === "principal"){
        console.log("entre caso 2")
        setSugerencia({ state : false})
        setSelect({ select : "1" })
      }else{
        console.log("entre caso 3")
        setSugerencia({state : true })
        setSelect({ select : "1" })
      }
      // e.target.value !== "otros" && e.target.value !== "principal" ? setSugerencia({state : true }) : setSugerencia({ state : false});
      // e.target.value == "otros" ? setSelect({ select : "otros" }) : setSelect({ select : "1" });
     
      let filter = hardcoreFaq.filter( faq => faq.id == e.target.value)
      setFaqFilter(filter)
      filter.length > 0 ? 
            setInput({
              state: "terminado", 
              //usuario que genera el soporte
              worker: "bbroscheit", 
              subject: filter[0].title, 
              detail: filter[0].description, 
              userresolved: false, 
            }) : setInput({
              state: "", 
              worker: "", 
              subject: "", 
              detail: "", 
              userresolved: false, 
            })
            console.log( "sugerencia" , sugerencia.state)
            console.log( "select" , select.name)
  }

  function handleResolved(e){
    e.preventDefault();
    postTicketUserResolved(input);
    alert("ticket generado y resuelto con exito")
    
    setTimeout(() => {
      Router.push("/tickets")
    }, 500)
  }

  function handleChange(e){
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name] : e.target.value
    })
  }

  function handleOption(e){
    e.preventDefault();
    setOption({
      state: true
    })
  }

  function handleReset(e){
    e.preventDefault();
    setInput({
      state: "", 
      //usuario que genera el soporte
      worker: "", 
      subject: "", 
      detail: "", 
      userresolved: false, 
    })

    setOption({
      state: false
    })

    setSugerencia({
      state : false 
    })
  }

  function handleSubmitNoFaq(e){
    e.preventDefault();
    postTicket(input);
    alert("ticket generado con exito")
    
    setTimeout(() => {
      Router.push("/tickets")
    }, 500)
  }

  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Nuevo Soporte</h1>

      {hardcoreFaq && hardcoreFaq.length > 0 ?
        //pregunta si existe algo en la tabla FAQ , si no existe simplemente carga el formulario normal , si existe nos da las opciones para elegir 
        ( <form className={mainStyle.form}>
          <div className={style.minimalGrid}>
          <h3 className={mainStyle.subtitle}>Título de Soporte : </h3>
          <select
            onChange={(e) => handleSelect(e)}
            name={input.title}
            className={mainStyle.input}
          >
            <option className={mainStyle.input} value="principal" > Elija una opción </option>
            {hardcoreFaq.map((e) => (
              <option key={e.id} value={e.id} className={mainStyle.input}>
                {e.title}
              </option>
            ))}
            <option value="otros" className={mainStyle.input}> Otros </option>
          </select>
        </div> 
              {

              }
        </form> ) : ( 
          <>
            { select.select === "otros" ? (
              <form className={mainStyle.form} onSubmit={e => handleSubmitNoFaq(e)}>
                <div className={style.minimalGrid}>
                  <h3 className={mainStyle.subtitle}>Título :</h3>
                  <input
                    type="text"
                    placeholder="Ingrese el Título"
                    className={mainStyle.input}
                    name="subject"
                    value={input.subject}
                    onChange={e => handleChange(e)}
                  />
                </div>
                <div className={mainStyle.labelWithTextarea}>
                  <h3 className={mainStyle.subtitle}>Descripcíon :</h3>
                  <textarea
                    type="text"
                    placeholder="Ingrese el inconveniente"
                    rows="10"
                    name="detail"
                    value={input.detail}
                    onChange={e => handleChange(e)}
                  />
                </div>
                <div className={style.buttonContainer}>
                  <button className={mainStyle.button} type="submit"> Generar Soporte </button>
                  <button className={mainStyle.button} onClick={e => handleReset(e)}> Borrar </button>
                </div>
              </form> ) : null}
            {/* <form className={mainStyle.form} onSubmit={e => handleSubmitNoFaq(e)}>
            
              <div className={style.minimalGrid}>
            <h3 className={mainStyle.subtitle}>Título :</h3>
            <input
             type="text"
            placeholder="Ingrese el Título"
            className={mainStyle.input}
            name="subject"
            value={input.subject}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className={mainStyle.labelWithTextarea}>
          <h3 className={mainStyle.subtitle}>Descripcíon :</h3>
          <textarea
            type="text"
            placeholder="Ingrese el inconveniente"
            rows="10"
            name="detail"
            value={input.detail}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className={style.buttonContainer}>
          <button className={mainStyle.button} type="submit"> Generar Soporte </button>
          <button className={mainStyle.button} onClick={e => handleReset(e)}> Borrar </button>
        </div>
          </form> */}
          </>) }
      </div>
  );
}

export default nuevoSoporte;
