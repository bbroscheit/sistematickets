const { User , Platform } = require('../../bd');

const postPlatform = async ( name, detail, masters ) => {
    //console.log("entre a la funcion")
    try {
        // Creo el ticket vacio para tener el ID que le va a dar nombre a la carpeta
        const newPlatform = await Platform.create({
            name , 
            detail , 
        })

        const mastersNames = masters.map(name => {
            const [firstName, lastName] = name.split(' ');
            return { firstname: firstName, lastname: lastName };
        });

        const studentsFinder = await Promise.all(mastersNames.map(async ({ firstname, lastname }) => {
            return User.findOne({ where: { firstname, lastname } });
        }));

        const validStudents = studentsFinder.filter(student => student !== null);
        if (validStudents.length !== mastersNames.length) {
            throw new Error('Some masters not found');
        }

        await newPlatform.setMasterPlatforms(validStudents);


        
        return newPlatform

    } catch (e) {
        console.log("Error en controller postPlatform", e.message);
        throw e;
    }
};

module.exports = postPlatform;