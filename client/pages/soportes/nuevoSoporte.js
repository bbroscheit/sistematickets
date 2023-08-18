import React from "react";
import { useState } from "react";
import style from "../../modules/newSoporte.module.css";
import mainStyle from "@/styles/Home.module.css";

function nuevoSoporte() {
  const [title, setTitle] = useState({ id: 0 });
  const [sugerencia , setSugerencia] = useState ({ state : false })
  const [option, setOption] = useState({ state: "" });
  const [faq, setFaq] = useState(null);

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

  function handleSelect(e) {
    e.preventDefault();
    e.target.value !== "otros" ? setSugerencia({state : true }) : setSugerencia({ state : false});
      
    }


    console.log(sugerencia.state)
  

  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Nuevo Soporte</h1>
      <form className={mainStyle.form}>
        {hardcoreFaq && hardcoreFaq.length > 0 ? (
          <div className={style.minimalGrid}>
            <h3 className={mainStyle.subtitle}>Título de Soporte : </h3>
            <select
              onChange={(e) => handleSelect(e)}
              name={title.state}
              className={mainStyle.input}
            >
              <option className={mainStyle.input}> Elija una opción </option>
              {hardcoreFaq.map((e) => (
                <option key={e.id} value={e.id} className={mainStyle.input}>
                  {e.title}
                </option>
              ))}
              <option value="otros" className={mainStyle.input}> Otros </option>
            </select>
          </div>
        ) : null }
        
        { sugerencia.state === true && hardcoreFaq.uresolved === true ? 
          (<div className={mainStyle.labelWithTextarea}>
               <h3 className={mainStyle.subtitle}>Sugerencia : </h3>
               <textarea type="text" placeholder={hardcoreFaq[title.id].answer} rows="10"/>
             <div>
                 <button className={mainStyle.button}> Si </button>
                 <button className={mainStyle.button}> No </button>
            </div>
          </div>)
          : null}
            
        
       

        

        <div className={style.minimalGrid}>
          <h3 className={mainStyle.subtitle}>Título :</h3>
          <input
            type="text"
            placeholder="Ingrese el Título"
            className={mainStyle.input}
          />
        </div>
        <div className={mainStyle.labelWithTextarea}>
          <h3 className={mainStyle.subtitle}>Descripcíon :</h3>
          <textarea
            type="text"
            placeholder="Ingrese el inconveniente"
            rows="10"
          />
        </div>
        <div className={style.buttonContainer}>
          <button className={mainStyle.button}> Generar Soporte </button>
          <button className={mainStyle.button}> Borrar </button>
        </div>
      </form>
    </div>
  );
}

export default nuevoSoporte;
