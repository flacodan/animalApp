import { Species, Category, db } from "../models/model.js";
import sampleData from "./sampleData.json" assert { type: "json" };

console.log("Syncing database...");
await db.sync({ force: true });

console.log("Seeding database...");

const categoriesToCreate = [
  { name: "mammal", color: "red" },
  { name: "reptile", color: "purple" },
  { name: "bird", color: "blue" },
  { name: "amphibian", color: "brown" },
  { name: "fish", color: "green" },
  { name: "bug", color: "yellow" },
  { name: "other", color: "gray" },
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
