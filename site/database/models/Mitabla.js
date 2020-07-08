module.exports = function(sequelize, dataTipes) {

    let alias = "Mitabla";

    let cols ={

        id:{
            type: dataTipes.INTEGER,
            primaryKey: true,
            autoIncremen: true
        },
        equipo: {
            type: dataTipes.STRING
        },
        precio:{
            type: dataTipes.DECIMAL
        },
        seleccion:{
            type: dataTipes.TEXT
        },
        imagen:{
            type: dataTipes.TEXT
        },
        año:{
            type: dataTipes.INTEGER
        }
    }

    const  config ={
        tableName: "mytable",
        timestamps: false
    }

    let Mitabla = sequelize.define(alias, cols, config);

    
    return Mitabla;
}