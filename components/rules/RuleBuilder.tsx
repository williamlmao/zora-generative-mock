import { useContext } from "react";
import { Select } from "react-daisyui";
import { RulesContext } from "../../contexts/RulesContext";
import { RuleCard } from "./RuleCard";

export const RuleBuilder = () => {
  const { rules } = useContext(RulesContext);

  return (
    <div className="bg-base-200 rounded-md p-12">
      {rules.map((rule, index) => {
        return <RuleCard rule={rule} index={index} />;
      })}
    </div>
  );
};
