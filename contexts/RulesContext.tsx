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

export interface Rule {
  categoryA: string;
  valueA: string;
  operator: string;
  categoryB: string;
  valueB: string;
}

interface RulesContextInterface {
  handleNewRuleValue: (category: string, rule: Rule) => void;
  deleteRuleValue: (category: string, rule: Rule) => void;
  rules: Rule[];
  traits: any | null; // TODO: Strictly type this and remove the any
  setRules: Function;
}

export const RulesContext = createContext<RulesContextInterface>({
  handleNewRuleValue: () => undefined,
  deleteRuleValue: () => undefined,
  rules: [],
  traits: {},
  setRules: () => undefined,
});

export const RulesContextProvider: FC<Props> = ({ children }) => {
  const [rules, setRules] = useState<Rule[]>([
    {
      categoryA: "Background",
      valueA: "Red",
      operator: "Does not occur with",
      categoryB: "Hat",
      valueB: "Blue hat",
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const traits = localStorage.getItem("traitData");
  const { updateStepStatus } = useContext(StepContext);

  // I'm using local storage in place of a backend for this mock app.
  useEffect(() => {
    // const localStorageData = localStorage.getItem("rules");
    // if (localStorageData) {
    //   setRules(JSON.parse(localStorageData));
    // }
  }, []);

  useEffect(() => {
    if (Object.keys(rules).length > 0) {
      localStorage.setItem("rules", JSON.stringify(rules));
      updateStepStatus(1, "completed");
      updateStepStatus(2, "available");
    }
  }, [rules]);

  const handleNewRuleValue = (category: string, rule: Rule) => {};

  const deleteRuleValue = (category: string, rule: Rule) => {};
  console.log("rules", rules);
  return (
    <RulesContext.Provider
      value={{
        handleNewRuleValue,
        deleteRuleValue,
        rules,
        traits,
        setRules,
      }}
    >
      {children}
    </RulesContext.Provider>
  );
};
