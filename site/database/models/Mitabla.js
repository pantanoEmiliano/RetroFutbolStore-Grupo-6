module.exports = function(sequelize, dataTypes) {

    let alias = "Mitabla";

    let cols ={

        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncremen: true
        },
        equipo: {
            type: dataTypes.STRING
        },
        precio:{
            type: dataTypes.DECIMAL
        },
        seleccion:{
            type: dataTypes.TEXT
        },
        imagen:{
            type: dataTypes.TEXT
        },
        año:{
            type: dataTypes.INTEGER
        }
    }

    const  config ={
        tableName: "mytable",
        timestamps: false
    }

    let Mitabla = sequelize.define(alias, cols, config);

    
    return Mitabla;
}