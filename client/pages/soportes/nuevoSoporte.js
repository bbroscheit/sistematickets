import React from "react";
import { useState, useEffect } from "react";
import style from "../../modules/newSoporte.module.css";
import mainStyle from "@/styles/Home.module.css";
import FormNormal from "@/components/FormNormal";
import FormFaq from "@/components/FormFaq";

function nuevoSoporte() {
  
  const [select, setSelect] = useState({ select: "principal" });
  const [faqFilter, setFaqFilter] = useState(null);
  const [input, setInput] = useState({
    state: "",
    worker: "",
    subject: "",
    detail: "",
    userresolved: false,
  });
  const [faq, setFaq] = useState(null);
  //se hardcodea user porque no estoy guardando en localstorage
  const [user, setUser] = useState("bbroscheit");

  const hardcoreFaq = [
    {
      id: 1,
      title: "frecuente nº 1",
      description:
        "caso 1 - descripcion ",
      answer:
        "caso1 - respuesta",
      uresolved: true,
    },
    {
      id: 2,
      title: "frecuente nº 2",
      description:
        "caso 2 - descripcion ",
      answer:
        "caso 2 - respuesta",
      uresolved: false,
    },
    {
      id: 3,
      title: "frecuente nº 3",
      description:
        "caso 3 - descripcion. ",
      answer:
        "caso 3 - respuesta",
      uresolved: true,
    },
  ];

  useEffect(() => {
    setUser(localStorage.getItem("user")) 
  }, []);

  useEffect(() => {
    setInput({
      state: "sin asignar",
      //usuario que genera el soporte
      worker: user.username,
      subject: "",
      detail: "",
      userresolved: false,
    });
  }, []);

  function handleSelect(e) {
    e.preventDefault();
    //va a consultar por las opciones elegidas, si la opcion es "otros" despliega el formulario normal , si es "principal" no muestra nada, si es cualquier otra muestra o no el soporte para que el usuario lo arregle
    e.target.value === "otros" ? setSelect({ select: "otros" }) : e.target.value === "principal" ? setSelect({ select: "principal" }): setSelect({ select: "1" })
    // filtra la opcion que se elige para guardar el resultado en ele stado " faqFilter"
    let filter = hardcoreFaq.filter((faq) => faq.id == e.target.value);
    setFaqFilter(filter);

  }

  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Nuevo Soporte</h1>
        {hardcoreFaq && hardcoreFaq.length > 0 ? (
        //pregunta si existe algo en la tabla FAQ , si no existe simplemente carga el formulario normal , si existe nos da las opciones para elegir
        <div className={mainStyle.form}>
          <div className={style.minimalGrid}>
            <h3 className={mainStyle.subtitle}>Sugerencia : </h3>
            <select
              onChange={(e) => handleSelect(e)}
              name={input.title}
              className={mainStyle.input}
            >
              <option className={mainStyle.input} value="principal">
                
                Elija una opción
              </option>
              {hardcoreFaq.map((e) => (
                <option key={e.id} value={e.id} className={mainStyle.input}>
                  {e.title}
                </option>
              ))}
              <option value="otros" className={mainStyle.input}>
                Otros
              </option>
            </select>
          </div> 
            {select.select === "otros" ? <FormNormal user = {user}/> 
              : select.select !== "otros" && select.select !== "principal" ? 
                  <FormFaq  
                    id={faqFilter[0].id} 
                    title = {faqFilter[0].title}
                    description = {faqFilter[0].description}
                    answer={faqFilter[0].answer}
                    uresolved={faqFilter[0].uresolved}
                    user={user}
                  />
                  
              : null} 
        </div>
      ) : ( <FormNormal user={user}/> )}
    </div>
  );
}

export default nuevoSoporte;
