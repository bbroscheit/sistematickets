import React from 'react'
import { useEffect, useState} from 'react';
import mainStyle from '@/styles/Home.module.css';
import style from '@/modules/dashboard.module.css';
import Link from 'next/link'
import ProjectCard from '@/components/projectCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';



function dashboard() {
    const [project, setProject] = useState(null)
    
    useEffect(() => {
    try {
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project`)
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/project`)
        .then((res) => res.json())
        .then((data) => {
            setProject(data);
                       
        });
    } catch (e) {
        console.log(e.message)
    }
        
    }, []);

    return (
        <div className={mainStyle.container}>
            <h1 className={mainStyle.title}>Proyectos</h1>
            <div className={style.subtitleContainer}>
                <h5>Nuevo Proyecto</h5><Link href="proyectos/nuevoProyecto"><AddCircleOutlineIcon sx={{cursor:"pointer", color:"#EA6558"}}/></Link>
            </div>
            <hr className={style.divider}/>
            <div className={style.cardContainer}>
            {
                project !== null && project.length > 0 ? project.map( e => <ProjectCard id={e.id} state={e.state} projectName={e.projectname} projectDetail={e.projectdetail} requirer={e.users[0].firstname} worker={ e.users[1] ? e.users[1].firstname : "sin usuario"} finishdate={e.finishdate} key={e.id}/>) : <h3 className={style.noproject}>Aun no has creado ningun proyecto</h3>
            }
            </div>
        </div>
    )
}

export default dashboard