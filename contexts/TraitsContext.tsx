import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { StepContext } from "./StepContext";

interface Props {
  children: React.ReactNode;
}

export interface Trait {
  value: string;
  weight: number;
}

export interface Category {
  name: string;
}

export interface TraitDataInterface {
  [key: string]: Trait[];
}

interface TraitsContextInterface {
  handleNewCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
  renameCategory: (category: string, newName: string) => void;
  handleNewTraitValue: (category: string, trait: Trait) => void;
  deleteTraitValue: (category: string, trait: Trait) => void;
  traitData: TraitDataInterface;
  setTraitData: (traitData: TraitDataInterface) => void;
}

export const TraitsContext = createContext<TraitsContextInterface>({
  handleNewCategory: () => undefined,
  deleteCategory: () => undefined,
  renameCategory: () => undefined,
  handleNewTraitValue: () => undefined,
  deleteTraitValue: () => undefined,
  traitData: {},
  setTraitData: () => undefined,
});

export const TraitsContextProvider: FC<Props> = ({ children }) => {
  const [traitData, setTraitData] = useState<TraitDataInterface>({});
  const [modalVisible, setModalVisible] = useState(false);
  const { updateStepStatus } = useContext(StepContext);

  // I'm using local storage in place of a backend for this mock app.
  useEffect(() => {
    const localStorageData = localStorage.getItem("traitData");
    if (localStorageData) {
      setTraitData(JSON.parse(localStorageData));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(traitData).length > 0) {
      localStorage.setItem("traitData", JSON.stringify(traitData));
      updateStepStatus(1, "completed");
      updateStepStatus(2, "available");
    }
  }, [traitData]);

  const deleteCategory = (category: string) => {
    const newTraitData = { ...traitData };
    delete newTraitData[category];
    setTraitData(newTraitData);
  };

  const renameCategory = (category: string, newName: string) => {
    const newTraitData = { ...traitData };
    newTraitData[newName] = traitData[category];
    delete newTraitData[category];
    setTraitData(newTraitData);
  };

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
        deleteCategory,
        renameCategory,
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
