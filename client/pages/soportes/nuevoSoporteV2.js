import React from "react";
import { useState, useEffect } from "react";
import style from "../../modules/newSoporteV2.module.css";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import mainStyle from "@/styles/Home.module.css";
import FormNormalV2 from "@/components/FormNormalV2";
import FormFaqV2 from "@/components/FormFaqV2";

function nuevoSoporteV2() {

  const [select, setSelect] = useState({ select: "principal" });
  const [faqFilter, setFaqFilter] = useState(null);
  const [input, setInput] = useState({
    state: "sin asignar",
    worker: "",
    subject: "",
    detail: "",
    userresolved: false,
    user: ""
  });
  const [faq, setFaq] = useState(null);
  const [user, setUser] = useState("bbroscheit");
  const [faqList, setFaqList] = useState([
    { label: 'Otros' },
  ]);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faq`)
    // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/faq`)
      .then((res) => res.json())
      .then((data) => {
        setFaq(data);
      // Obtener todas las etiquetas
      const allLabels = data.map((e) => e.title);

      // Filtrar las etiquetas duplicadas
      const uniqueLabels = allLabels.reduce((acc, label) => {
        if (!acc.some((faqItem) => faqItem.label === label)) {
          acc.push({ label });
        }
        return acc;
      }, []);

      // Actualizar el estado con las etiquetas únicas
      setFaqList((prevFaqList) => [...prevFaqList, ...uniqueLabels]);
    });
  }, []);

  useEffect(() => {
    // Filtrar duplicados usando un conjunto (Set) y un identificador único
    const uniqueLabelsSet = new Set(faqList.map((item) => item.label));

    // Convertir el conjunto nuevamente a un array de objetos
    const uniqueLabelsArray = Array.from(uniqueLabelsSet).map((label) => ({ label }));

    // Actualizar el estado con las etiquetas únicas
    setFaqList(uniqueLabelsArray);
  }, [faq]);

  useEffect(() => {
    let userLogin = localStorage.getItem("user");
    let loginParse = JSON.parse(userLogin);
    setUser(loginParse);
  }, []);

  useEffect(() => {
    setInput({
      state: "sin asignar",
      worker: user.username,
      subject: "",
      detail: "",
      userresolved: false,
    });
  }, []);

  function handleSelect(e) {
    e.preventDefault();
    //va a consultar por las opciones elegidas, si la opcion es "Otros" despliega el formulario normal , si es "principal" no muestra nada, si es cualquier otra muestra o no el soporte para que el usuario lo arregle
    e.target.innerHTML === "Otros" ? setSelect({ select: "Otros" }) : e.target.innerHTML === "principal" ? setSelect({ select: "principal" }): setSelect({ select: "1" })
    // filtra la opcion que se elige para guardar el resultado en ele stado " faqFilter"
    let filter = faq.filter((faq) => faq.title == e.target.innerHTML);
    setFaqFilter(filter);

  }

  return (
    <div className={mainStyle.container}>
      <div className={style.pageWrap}>
        <div className={style.column}>
          <div className={style.pageHead}>
            <h1 className={mainStyle.title}>Nuevo Soporte</h1>
            <p>Contanos qué necesitás — si ya tenemos una solución para tu consulta, te la mostramos al instante.</p>
          </div>

          {faq && faq.length > 0 ? (
            //pregunta si existe algo en la tabla FAQ , si no existe simplemente carga el formulario normal , si existe nos da las opciones para elegir
            <>
              <div className={style.card}>
                <label>¿Sobre qué es tu consulta?</label>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={faqList}
                  fullWidth
                  className={style.autocomplete}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Buscá un tema (ej: impresora, contraseña, VPN)..."
                    />
                  )}
                  onChange={(e) => handleSelect(e)}
                />
                <p className={style.hint}>Elegí un tema para ver la solución al instante, o "Otros" si no encontrás el tuyo.</p>
              </div>

              {select.select === "Otros" ? <FormNormalV2 user={user} />
                : select.select !== "Otros" && select.select !== "principal" ?
                    <FormFaqV2
                      id={faqFilter[0].id}
                      title={faqFilter[0].title}
                      description={faqFilter[0].description}
                      answer={faqFilter[0].answer}
                      uresolved={faqFilter[0].uresolved}
                      user={user.name}
                    />
                : null}
            </>
          ) : ( <FormNormalV2 user={user} /> )}
        </div>
      </div>
    </div>
  );
}

export default nuevoSoporteV2;
