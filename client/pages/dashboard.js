import React from 'react'
import { useEffect, useState} from 'react';
import mainStyle from '@/styles/Home.module.css';
import Swal from 'sweetalert2'
import style from '@/modules/dashboard.module.css';
import Link from 'next/link'
import ProjectCard from '@/components/projectCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



function Dashboard() {
    const [project, setProject] = useState(null)
    const [user, setUser] = useState(null);
    
    useEffect(() => {
    try {
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject`)
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/newproject`)
        .then((res) => res.json())
        .then((data) => {
            setProject(data);
        });
    } catch (e) {
        console.log(e.message)
    }
        
    }, []);

    useEffect(() => {
        let userLogin = JSON.parse(localStorage.getItem("user"));
        userLogin ? setUser(userLogin) : null;
      }, []);

     console.log("user ", user)
    return (
        <div className={mainStyle.container}>
            <h1 className={mainStyle.title}>PROYECTOS</h1>
            { user !== null && user.isprojectmanager === true ?
                <div className={style.subtitleContainer}>
                    <h5>Nuevo Proyecto</h5>
                    <hr />
                    <Link href="proyectos/nuevoProyecto">
                        <AddCircleOutlineIcon sx={{cursor:"pointer", color:"#FFFFFF", paddingTop:"2px"}}/>
                    </Link>
                </div> : null
            }
            
            <hr className={style.divider}/>
            <div className={style.cardContainer}>
            {
                project !== null && project.length > 0 ? project.map( e => <ProjectCard key={e.id} id={e.id} state={e.state} projectName={e.projectname} projectDetail={e.projectdetail} requirer={ e.users[0] ? e.users[0].firstname : "sin usuario"} worker={ e.users[1] ? e.users[1].firstname : "sin usuario"} finishdate={e.finishdate} />) : <h3 className={style.noproject}>Aun no has creado ningun proyecto</h3>
            }
            </div>
        </div>
    )
}

export default Dashboard