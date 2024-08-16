const { Capacitation } = require('../../bd')

const updateCapacitation = async (id, finishdate , finishhour, state) => {

    // tratamos la fecha para llevarla al formato date + timezone
    const combinedDateTimeString = `${finishdate}T${finishhour}`;
    const combinedDateTime = new Date(combinedDateTimeString);
    const timeZoneOffset = combinedDateTime.getTimezoneOffset() * 60000; // offset en milisegundos
    const localDateTime = new Date(combinedDateTime.getTime() - timeZoneOffset);

    try {
        let setCapacitation = await Capacitation.update(
            { 
                state: state ,
                finishdate:localDateTime  
            },
            { where: { id:id } } 
        );

        return setCapacitation
    } catch (e) {
        console.log("Error en controller updateCapacitation", e.message);
        throw e;
    }

    
    
}

module.exports= updateCapacitation