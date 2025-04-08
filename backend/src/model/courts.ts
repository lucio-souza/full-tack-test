import sequelize from "../database/sequelize";
import { DataTypes } from "sequelize";

const Courts = sequelize.define("courts", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
    }
});

async function sincronizar() {
    await Courts.sync();
    console.log("Tabela sincronizada com sucesso");
  }
sincronizar();

export default Courts;