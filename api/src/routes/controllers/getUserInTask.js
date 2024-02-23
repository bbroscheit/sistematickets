const {User} = require('../../bd');
const {Newtask} = require('../../bd');

const getUserInTask = async (id) => {
    try{
        const task = await Newtask.findByPk ( id, {
            include:[
                {
                    model: User,
                    attribute: ["firstname"],
                }
                
            ]
        });

        return task.users
    }catch(e){
        console.log("error en controllers/getUserInTask",e.message)
    }
}

module.exports = getUserInTask;