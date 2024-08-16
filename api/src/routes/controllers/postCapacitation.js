const { Capacitation, User , Platform} = require('../../bd');

const postCapacitation = async ( state, subject, teacher, students,  startdate, starthour, platform) => {
    
    // tratamos la fecha para llevarla al formato date + timezone
    const combinedDateTimeString = `${startdate}T${starthour}`;
    const combinedDateTime = new Date(combinedDateTimeString);
    const timeZoneOffset = combinedDateTime.getTimezoneOffset() * 60000; // offset en milisegundos
    const localDateTime = new Date(combinedDateTime.getTime() - timeZoneOffset);

    // tratamos el nombre porque recibimos nombre y apellido en un solo string pero en el modelo lo tenemos por separado
    const [teacherFirstName, teacherLastName] = teacher.split(' ');
   
    try {
        // Creo el ticket vacio para tener el ID que le va a dar nombre a la carpeta
        const newCapacitation = await Capacitation.create({
            state , 
            subject , 
            startdate: localDateTime,
        })

        //Buscamos el teacher en la base de datos de user
        const teacherFind = await User.findOne({ where: { firstname: teacherFirstName, lastname: teacherLastName } });
        if (!teacherFind) {
            throw new Error(`Teacher with name ${teacher} not found`);
        }
       
        await newCapacitation.setTeacher(teacherFind);

        const platformFind = await Platform.findOne({ where: { name : platform } });
        if (!platformFind) {
            throw new Error(`Platform with name ${platform} not found`);
        }
       
        await newCapacitation.setPlatform(platformFind);

        // tratamos el listado de student porque nos pasa lo mismo que con teacher pero en un array

        const studentNames = students.map(name => {
            const [firstName, lastName] = name.split(' ');
            return { firstname: firstName, lastname: lastName };
        });

        const studentsFinder = await Promise.all(studentNames.map(async ({ firstname, lastname }) => {
            return User.findOne({ where: { firstname, lastname } });
        }));

        const validStudents = studentsFinder.filter(student => student !== null);
        if (validStudents.length !== studentNames.length) {
            throw new Error('Some students not found');
        }

        await newCapacitation.addStudent(validStudents);


        
        return newCapacitation

    } catch (e) {
        console.log("Error en controller postCapacitation", e.message);
        throw e;
    }
};

module.exports = postCapacitation;