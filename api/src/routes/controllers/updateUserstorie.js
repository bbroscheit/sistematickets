const { Userstories } = require('../../bd')

const updateUserstorie = async (id) => {
    let setUserstorie = await Userstories.update(
        { state: 'cumplido' },
        { where: { id:id } } 
      );

    return setUserstorie
    
}

module.exports= updateUserstorie