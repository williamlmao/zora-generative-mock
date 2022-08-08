import React, { createContext, FC, useEffect, useState } from "react";
import { generateMetadata } from "../utils/helpers";
import { TraitDataInterface } from "./TraitsContext";

interface Props {
  children: React.ReactNode;
}

export interface Item {
  id: number;
  traits: {
    [key: string]: string;
  };
}

interface GeneratorContextInterface {
  items: Item[];
  deleteItem: (index: number) => void;
  collectionSize: number;
  setCollectionSize: (size: number) => void;
  generate: Function;
}

export const GeneratorContext = createContext<GeneratorContextInterface>({
  items: [],
  deleteItem: () => undefined,
  collectionSize: 0,
  setCollectionSize: () => undefined,
  generate: () => undefined,
});

export const GeneratorContextProvider: FC<Props> = ({ children }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [collectionSize, setCollectionSize] = useState(100);
  const [traits, setTraits] = useState<TraitDataInterface>({});
  useEffect(() => {
    setTraits(JSON.parse(localStorage.getItem("traitData") || "{}"));
  }, []);

  const deleteItem = (index: number) => {
    console.log("deleting item", index);
    setItems(items.filter((_, i) => i !== index));
  };

  const generate = () => {
    setItems([]);
    // 5 second delay
    setTimeout(() => {
      setItems(generateMetadata(traits, collectionSize));
    }, 100);
  };

  return (
    <GeneratorContext.Provider
      value={{ items, deleteItem, collectionSize, setCollectionSize, generate }}
    >
      {children}
    </GeneratorContext.Provider>
  );
};
