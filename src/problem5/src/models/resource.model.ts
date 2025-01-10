import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";

class Resource extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public status!: string;
}

Resource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active", // Default status
    },
  },
  {
    sequelize,
    tableName: "resources",
  }
);

export default Resource;
