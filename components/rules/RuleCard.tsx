import { useContext } from "react";
import { Rule, RulesContext } from "../../contexts/RulesContext";
import { TraitsContext } from "../../contexts/TraitsContext";
import { Menu } from "@headlessui/react";
import { RuleTraitSelector } from "./RuleTraitSelector";
import { Trait } from "../traits/traits.types";
export const RuleCard = ({ rule, index }: { rule: Rule; index: number }) => {
  const { traits } = useContext(RulesContext);
  const categories = Object.keys(traits);
  if (!traits || Object.keys(traits).length == 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex border-2 rounded-md justify-between p-2">
      <div className="p-4 w-[300px] flex flex-col items-center justify-center">
        <RuleTraitSelector
          rule={rule}
          selectedValue={rule?.categoryA}
          property="categoryA"
          options={categories}
          ruleIndex={index}
          className="text-gray-500 font-medium"
        />
        <RuleTraitSelector
          rule={rule}
          selectedValue={rule?.valueA}
          property="valueA"
          options={traits[rule?.categoryA]?.map((trait: Trait) => trait.value)}
          ruleIndex={index}
          className="text-2xl font-medium"
        />
      </div>
      <div className="bg-base-200 rounded-md flex items-center justify-center ">
        <RuleTraitSelector
          rule={rule}
          selectedValue={rule?.operator}
          property="operator"
          options={["Does not occur with", "Only occurs with"]}
          ruleIndex={index}
          className="text-xl font-bold"
        />
      </div>
      <div className="p-4 w-[300px] flex flex-col items-center justify-center">
        <RuleTraitSelector
          rule={rule}
          selectedValue={rule?.categoryB}
          property="categoryB"
          options={categories}
          ruleIndex={index}
          className="text-gray-500 font-medium"
        />
        <RuleTraitSelector
          rule={rule}
          selectedValue={rule?.valueB}
          property="valueB"
          options={traits[rule?.categoryB]?.map((trait: Trait) => trait.value)}
          ruleIndex={index}
          className="text-2xl font-medium"
        />
      </div>
    </div>
  );
};
