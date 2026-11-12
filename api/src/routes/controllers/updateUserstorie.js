const { Userstories } = require('../../bd')

// modulo viejo (V1): marca una userstory como cumplida
const updateUserstorie = async (id) => {
    let setUserstorie = await Userstories.update(
        { state: 'cumplido' },
        { where: { id:id } } 
      );

    return setUserstorie
    
}

module.exports= updateUserstorie