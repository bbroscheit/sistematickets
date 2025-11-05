import React, { useEffect, useRef } from "react";
import style from "../../modules/detail.module.css"; // o pasá la clase por props si querés que sea más genérico

const AutoResizeTextarea = ({ value, placeholder, readOnly = true }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto"; // resetear altura
      el.style.height = `${el.scrollHeight}px`; // ajustar
    }
  }, [value, placeholder]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      cols="80"
      style={{ minHeight: "120px", resize: "none", overflowY: "hidden" }}
      className={style.textarea}
    />
  );
};

export default AutoResizeTextarea;
