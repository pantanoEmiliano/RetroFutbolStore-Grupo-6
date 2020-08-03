module.exports = function(sequelize, dataTypes) {

    let alias = "Usuario";

    const cols = {

        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoInteger: true
        },

        nombre:{
            type: dataTypes.TEXT
        },

        apellido:{
            type: dataTypes.TEXT
        },
        email:{
            type: dataTypes.STRING
        },
        password:{
            type: dataTypes.STRING
        },
        imagen:{
            type: dataTypes.TEXT
        },
        
        
    };
    const  config ={
        tableName: "users",
        timestamps: false
    }

    let Usuario = sequelize.define(alias, cols, config)
    
    return Usuario 

}