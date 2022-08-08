import { useContext } from "react";
import { Button } from "react-daisyui";
import { RulesContext } from "../../contexts/RulesContext";
import { PageControls } from "../PageControls";
import { RuleCard } from "./RuleCard";

export const RuleBuilder = () => {
  const { rules, addRule } = useContext(RulesContext);

  // Check if any rule contains "" as a value
  const hasEmptyRule = rules.some((rule) => {
    return Object.values(rule).some((value) => value === "");
  });

  return (
    <div className="flex flex-col gap-4">
      <Button
        className="self-end normal-case"
        size="sm"
        onClick={() => {
          addRule();
        }}
      >
        + New Rule
      </Button>

      <div className="flex flex-col border-2 rounded-md p-12 gap-4">
        {rules.length === 0 ? (
          <div className="text-center font-medium">
            Add a new rule or continue without any
          </div>
        ) : null}
        {rules.map((rule, index) => {
          return <RuleCard rule={rule} index={index} key={"rule" + index} />;
        })}
      </div>

      <PageControls nextDisabled={hasEmptyRule} />
    </div>
  );
};
