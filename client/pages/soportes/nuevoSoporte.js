import React from "react";
import { useState } from "react";
import style from "../../modules/newSoporte.module.css";
import mainStyle from "@/styles/Home.module.css";

function nuevoSoporte() {
  const [title, setTitle] = useState({ id: 0 });
  const [sugerencia , setSugerencia] = useState ({ state : false })
  const [option, setOption] = useState({ state: "" });
  const [faq, setFaq] = useState("");

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
    setTitle({
      ...title,
      id: e.target.value,
    });
    // if( e.target.value !== 0 ){
    // setFaq({
    //   id: hardcoreFaq[e.target.value].id,
    //   title: hardcoreFaq[e.target.value].title,
    //   description: hardcoreFaq[e.target.value].description,
    //   answer: hardcoreFaq[e.target.answer].answer,
    //   uresolved: hardcoreFaq[e.target.uresolved].uresolved,
    // });}
    setFaq({
      ...faq,
      id: e.target.value,
    });
    console.log("faq", faq.id);
  }

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
              <option value="otros" className={mainStyle.input}>
                Otro
              </option>
              {hardcoreFaq.map((e) => (
                <option key={e.id} value={e.id} className={mainStyle.input}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>
        ) : null
        
        //   {title.state !== "otros" && faq.uresolved === true ? (
        //     <div>
        //       <h3>Sugerencia : </h3>
        //       <textarea type="text" placeholder={hardcoreFaq[title.id].answer} />
        //     <div>
        //         <button> Si </button>
        //         <button> No </button>
        //     </div>
        //   </div>

        // ) : null}
        }

        {/* esta opcion se activa si el titulo del soporte es distinto de "otro" y si esa opcion puede resolverla el usuario */}
        {/*  */}

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
