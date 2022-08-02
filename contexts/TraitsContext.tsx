import React, { createContext, FC, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export interface Trait {
  value: string;
  weight: number;
}

interface TraitDataInterface {
  [key: string]: Trait[];
}

interface TraitsContextInterface {
  handleNewCategory: (category: string) => void;
  handleNewTraitValue: (category: string, trait: Trait) => void;
  deleteTraitValue: (category: string, trait: Trait) => void;
  traitData: TraitDataInterface;
  setTraitData: (traitData: TraitDataInterface) => void;
}

export const TraitsContext = createContext<TraitsContextInterface>({
  handleNewCategory: () => undefined,
  handleNewTraitValue: () => undefined,
  deleteTraitValue: () => undefined,
  traitData: {},
  setTraitData: () => undefined,
});

export const TraitsContextProvider: FC<Props> = ({ children }) => {
  const [traitData, setTraitData] = useState<TraitDataInterface>({});
  const [modalVisible, setModalVisible] = useState(false);
  const handleNewCategory = (category: string) => {
    setTraitData((prevState) => {
      return {
        ...prevState,
        [category]: [],
      };
    });
  };

  const handleNewTraitValue = (category: string, trait: Trait) => {
    setTraitData((prevState) => {
      return {
        ...prevState,
        [category]: [...prevState[category], trait],
      };
    });
  };

  const deleteTraitValue = (category: string, trait: Trait) => {
    setTraitData((prevState) => {
      return {
        ...prevState,
        [category]: prevState[category].filter(
          (traitInState) => traitInState.value !== trait.value
        ),
      };
    });
  };

  return (
    <TraitsContext.Provider
      value={{
        handleNewCategory,
        handleNewTraitValue,
        deleteTraitValue,
        traitData,
        setTraitData,
      }}
    >
      {children}
    </TraitsContext.Provider>
  );
};
