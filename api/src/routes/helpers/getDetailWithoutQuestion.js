// ticket.detail va acumulando todo el hilo (detalle original + preguntas y
// respuestas) separado por saltos de linea. esto devuelve el detalle sin la
// ultima pregunta que agrego el developer, para mostrarlo/mandarlo limpio
const getDetailWithoutQuestion = async (ticket) => {
    
    try{
        let detail = ticket.detail.replace(/\n[^\n]*$/, '');
        
        return detail;
    }catch(e){
        console.log( "error en helper getDetailWithoutQuestion " , e.message)
    }
}

module.exports = getDetailWithoutQuestion 