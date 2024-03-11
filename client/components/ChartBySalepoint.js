import React from 'react'
import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    BarElement
}   from 'chart.js'
import {contarSoportesPorMesYPuntoDeVentas}  from '@/functions/contarSoportesPorMesYPuntoDeVenta'


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default function ChartBySalepoint(){
    const [soportes, setSoportes] = useState(null)
    const [porPuntoDeVenta, setPorPuntoDeVenta] = useState(null)
    
     useEffect(() => {
        fetch(`http://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticket`)
        // fetch(`https://${process.env.NEXT_PUBLIC_LOCALHOST}:3001/ticket`)
          .then((res) => res.json())
          .then((data) => {
            setSoportes(data);
            setPorPuntoDeVenta(contarSoportesPorMesYPuntoDeVentas(data))
          });


    }, [])
    
    
    let meses = ["Enero", "Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
    let data = {
        labels : meses,
        datasets: porPuntoDeVenta !== null ? porPuntoDeVenta : null
    }

    let options = {
        responsive : true,
        animation: true,
        plugins : {
            legend : {
                
                display : true
            },
            title: {
                display: true,
                text: 'Soportes por Unidad de Negocio'
            }
        },
        scales:{
            y:{
                min : 0,
                max:100
            },
            x: {
                ticks : {
                    
                    color : 'rgba(0 , 0 , 0)'
                }
            }
        }
    }
    

   

    console.log("soportes", soportes)
    console.log("por punto de venta", porPuntoDeVenta)

    return <Bar data={data} options={options} />
}