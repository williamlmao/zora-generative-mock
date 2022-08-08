import { random } from "lodash";
import { Item } from "../contexts/GeneratorContext";
import { TraitDataInterface } from "../contexts/TraitsContext";

export const generateMetadata = (traits: TraitDataInterface, count: number) => {
  // Generate count number of metadata objects
  const items: Item[] = [];
  const traitTypes = Object.keys(traits);
  for (let i = 0; i < count; i++) {
    const item: Item = {
      id: i,
      traits: {},
    };
    // Select a random trait value for each trait type. Can be null.
    traitTypes.forEach((traitType) => {
      const traitValues = traits[traitType];

      // random 0 or 1, with 10% chance of 0 being selected
      const randomTrait = Math.random() < 0.1 ? 0 : 1;
      if (randomTrait) {
        const randomIndex = Math.floor(Math.random() * traitValues.length);
        item.traits[traitType] = traitValues[randomIndex].value;
      }
    });
    items.push(item);
  }
  return items;
};
