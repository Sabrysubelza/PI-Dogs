const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
       // defino el modelo
       sequelize.define('dog', {
              id: {
                     type: DataTypes.UUID,
                     primaryKey: true,
                     allowNull: false,
                     defaultValue: DataTypes.UUIDV4,
              },

              name: {
                     type: DataTypes.STRING,
                     allowNull: false,
              },
              height: { //altura. recibe las medidas en imperial=> pie & metric => metro
                     type: DataTypes.STRING, //al enviar los datos por medio del body se hace con un array
                     allowNull: false, //este campo es requerido, no puede estar vacio

              },
              weight: {//peso.recibe las medidas en imperial=> pie & metric => metro
                     type: DataTypes.STRING, //al enviar los datos por medio del body se hace con un array
                     allowNull: false
              },

              life_span: { //(años de vida) //cambiar el tipo a numero    
                     type: DataTypes.STRING,
                     allowNull: true

              },
              image: {
                     type: DataTypes.STRING,
                     allowNull: true,
              },
              createDb: {
                     type: DataTypes.BOOLEAN,
                     defaultValue: true,
                     allowNull: false,
              },
              //falta agregar el atributo imagen
              // image: DataTypes.STRINNG
              // defaultValue: (url de Endpoint)
       })
};


