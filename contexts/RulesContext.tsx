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
  updateRule: (ruleIndex: number, newRule: Rule) => void;
  deleteRule: (ruleIndex: number) => void;
  rules: Rule[];
  traits: any | null; // TODO: Strictly type this and remove the any
  setRules: Function;
}

export const RulesContext = createContext<RulesContextInterface>({
  updateRule: () => undefined,
  deleteRule: () => undefined,
  rules: [
    {
      categoryA: "Composition",
      valueA: "Rooftop",
      operator: "Does not occur with",
      categoryB: "Paper",
      valueB: "Smoke",
    },
  ],
  traits: {},
  setRules: () => undefined,
});

export const RulesContextProvider: FC<Props> = ({ children }) => {
  const [rules, setRules] = useState<Rule[]>([
    {
      categoryA: "Composition",
      valueA: "Rooftop",
      operator: "Does not occur with",
      categoryB: "Paper",
      valueB: "Smoke",
    },
  ]);

  const [traits, setTraits] = useState({});

  const { updateStepStatus } = useContext(StepContext);

  // I'm using local storage in place of a backend for this mock app.
  useEffect(() => {
    setTraits(JSON.parse(localStorage.getItem("traitData") || "{}"));

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

  const updateRule = (ruleIndex: number, newRule: Rule) => {
    const newRules = [...rules];
    newRules[ruleIndex] = newRule;
    setRules(newRules);
  };

  const deleteRule = (ruleIndex: number) => {
    const newRules = [...rules];
    newRules.splice(ruleIndex, 1);
    setRules(newRules);
  };

  return (
    <RulesContext.Provider
      value={{
        updateRule,
        deleteRule,
        rules,
        traits,
        setRules,
      }}
    >
      {children}
    </RulesContext.Provider>
  );
};
