import React from "react";
import { useState, useEffect } from "react";
import mainStyle from "../../styles/Home.module.css";
import style from "../../modules/principal.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import filtraUsuariosConectados from "../../functions/filtrausuariosConectados";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Principal() {
  const [activity, setActivity] = useState(null);
  const [usuarios, setUsuarios] = useState(null);
  const [openUser, setOpenUser] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [expanded2, setExpanded2] = useState(false);
  const [expanded3, setExpanded3] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };

  const handleExpandClick3 = () => {
    setExpanded3(!expanded3);
  };

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/activeConnection`)
      // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/activeConnection`)
      .then((res) => res.json())
      .then((data) => {
        setActivity(data);
        setUsuarios(filtraUsuariosConectados(data));
      });

    const interval = setInterval(() => {
      fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/activeConnection`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/activeConnection`)
        .then((res) => res.json())
        .then((data) => {
          setActivity(data);
          setUsuarios(filtraUsuariosConectados(data));
        });
    }, 3600000); // se ejecuta cada hora

    return () => {
      clearInterval(interval);
    };
  }, []);

  function handleClick(e) {
    e.preventDefault();
    openUser === 0 ? setOpenUser(1) : setOpenUser(0);
  }

  console.log(openUser);

  return (
    <div className={mainStyle.container}>
      <h1 className={mainStyle.title}>Principal</h1>
      <div>
        <h3 className={mainStyle.subtitle}>USUARIOS CONECTADOS</h3>
        {openUser && openUser === 0 ? (
          <KeyboardArrowDownIcon onClick={(e) => handleClick(e)} />
        ) : (
          <KeyboardArrowUpIcon onClick={(e) => handleClick(e)} />
        )}
      </div>
      {openUser && openUser !== 0 ? (
        <div className={style.userContainer}>
          {activity !== null && activity.length > 0
            ? activity.map((e) => (
                <div key={e.USERID} className={style.divUser}>
                  {e.USERID.trim()}
                </div>
              ))
            : null}
        </div>
      ) : null}
      {usuarios !== null && usuarios.length > 0 ? (
        <div>
          <h3 className={mainStyle.subtitle}>Deberian estar conectados</h3>
          <div className={style.userContainer}>
            {usuarios !== null && usuarios.length > 0 ? (
              usuarios.map((e) => (
                <div key={e} className={style.divUser}>
                  {e}
                </div>
              ))
            ) : (
              <p>no hay usuarios conectados</p>
            )}
          </div>
        </div>
      ) : null}
      <h1 className={mainStyle.title}>Soportes</h1>
      <div className={style.cardContainer}>
        <Card
          sx={{
            minHeight: "230px",
            width: "22%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Soportes sin asignar</h3>
          <h5>+24 hs</h5>
          <CardContent>
            <h1 className={style.cardTitle}>1</h1>
          </CardContent>
        </Card>
        <Card
          sx={{
            minHeight: "230px",
            width: "22%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Soportes asignados</h3>
          <h5>+24 hs</h5>
          <CardContent>
            <h1 className={style.cardTitle}>1</h1>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
            </CardContent>
          </Collapse>
        </Card>
        <Card
          sx={{
            minHeight: "230px",
            width: "22%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Soportes en desarrollo</h3>
          <h5>+24 hs</h5>
          <CardContent>
            <h1 className={style.cardTitle}>1</h1>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick2}
              aria-expanded={expanded}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
            </CardContent>
          </Collapse>
        </Card>
        <Card
          sx={{
            minHeight: "230px",
            width: "22%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Pedidos de Información</h3>
          <h5>+24 hs</h5>
          <CardContent>
            <h1 className={style.cardTitle}>1</h1>
          </CardContent>
          <CardActions disableSpacing sx={{ padding: "1px" }}>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick3}
              aria-expanded={expanded}
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Method:</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </div>
  );
}

export default Principal;
