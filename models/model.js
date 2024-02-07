import { DataTypes, Model } from "sequelize";
import connectToDB from "../server/db.js";
import util from "util";

const dbURI = "postgresql:///animalapp";
console.log("db is: " + dbURI);

export const db = await connectToDB(dbURI);

export class Species extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Species.init(
  {
    // category_id as foreign key from Category

    species_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(80),
      unique: true,
      allowNull: false,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(260),
      allowNull: true,
    },
  },
  {
    modelName: "species",
    sequelize: db,
    timestamps: false,
  }
);

export class Category extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Category.init(
  {
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(30),
    },
  },
  {
    modelName: "category",
    sequelize: db,
    updatedAt: false,
  }
);

//TABLE RELATIONSHIPS
Category.hasMany(Species, { foreignKey: "category_id" });
Species.belongsTo(Category, { foreignKey: "category_id" });
