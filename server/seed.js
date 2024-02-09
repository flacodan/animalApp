import { Species, Category, db } from "../models/model.js";
import sampleData from "./sampleData.json" assert { type: "json" };

console.log("Syncing database...");
await db.sync({ force: true });

console.log("Seeding database...");

const categoriesToCreate = [
  { name: "mammal", color: "#FF0000" },
  { name: "reptile", color: "#800080" },
  { name: "bird", color: "#ADD8E6" },
  { name: "amphibian", color: "	#C04000" },
  { name: "fish", color: "#00FF00" },
  { name: "bug", color: "#FFFF33" },
  { name: "other", color: "b7cdd8" },
];

const categoriesInDB = await Promise.all(
  categoriesToCreate.map((category) => {
    const { name, color } = category;
    const newCategory = Category.create({
      name,
      color,
    });
    return newCategory;
  })
);

const speciesInDB = await Promise.all(
  sampleData.map((species) => {
    const { name, length, color, url, category_id } = species;
    const newSpecies = Species.create({
      name,
      length,
      color,
      url,
      category_id,
    });
    return newSpecies;
  })
);

await db.close();
console.log("Finished seeding database!");
