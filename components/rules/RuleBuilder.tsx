import { useContext } from "react";
import { Select } from "react-daisyui";
import { RulesContext } from "../../contexts/RulesContext";

export const RuleBuilder = () => {
  const { rules } = useContext(RulesContext);
  console.log(rules);
  return <div className="bg-base-200 rounded-md p-12"></div>;
};
