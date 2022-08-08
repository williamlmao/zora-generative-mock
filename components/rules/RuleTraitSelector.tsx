import { Listbox, Transition, Menu } from "@headlessui/react";
import { useContext, useState } from "react";
import { Rule, RulesContext } from "../../contexts/RulesContext";
import { BsChevronDown } from "react-icons/bs";
export const RuleTraitSelector = ({
  rule,
  property,
  selectedValue,
  options,
  ruleIndex,
  className,
}: {
  rule: Rule;
  property: keyof Rule;
  selectedValue: string;
  options: string[];
  ruleIndex: number;
  className?: string;
}) => {
  const { updateRule } = useContext(RulesContext);
  if (!options || options.length === 0) {
    return <div>No category selected</div>;
  }

  return (
    <Listbox
      value={selectedValue}
      onChange={(value) => {
        let updatedRule = { ...rule };
        updatedRule[property] = value;
        updateRule(ruleIndex, updatedRule);
      }}
    >
      <div
        className={`relative ${
          !selectedValue ? "p-1 border-2 border-red-400 rounded-md" : ""
        }`}
      >
        <Listbox.Button
          className={`${className} flex items-center gap-1 group z-0`}
        >
          {selectedValue || "Select"}
          <BsChevronDown className="text-gray-400 text-sm group-hover:text-primary group-hover:font-bold" />
        </Listbox.Button>

        <Listbox.Options className="absolute top-4 mt-2 w-56  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-40">
          {options.map((option) => {
            return (
              <Listbox.Option
                key={option}
                value={option}
                className="p-2 hover:bg-base-200 hover:cursor-pointer"
              >
                {option}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </div>
    </Listbox>
  );
};
