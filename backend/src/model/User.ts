import sequelize from "../database/sequelize";
import { DataType, DataTypes, UUIDV4} from "sequelize";

const User = sequelize.define("users",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    senha:{
        type:DataTypes.STRING,
        allowNull:false,

    }
})

async function sincronizar() {
    await User.sync();
    console.log("Tabela sincronizada com sucesso");
  }
sincronizar();

export default User;