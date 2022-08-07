import Link from "next/link";
import { useContext } from "react";
import { Button } from "react-daisyui";
import { StepContext } from "../contexts/StepContext";

export const PageControls = ({ nextDisabled }: { nextDisabled: boolean }) => {
  const { steps, stepIndex, updateStepStatus } = useContext(StepContext);

  if (stepIndex === steps.length - 1) {
    return (
      <Button
        type="submit"
        className="w-full normal-case"
        disabled={nextDisabled}
        onClick={() => {
          updateStepStatus(stepIndex, "completed");
        }}
      >
        Configure Mint
      </Button>
    );
  }
  return (
    <div className="w-full flex gap-4 mt-4">
      {stepIndex > 0 && (
        <Link href={steps[stepIndex - 1].path}>
          <Button type="button" className="flex-1" color="secondary">
            Back
          </Button>
        </Link>
      )}
      <Link href={steps[stepIndex + 1].path}>
        <Button
          type="submit"
          className="flex-1 normal-case"
          color="primary"
          disabled={nextDisabled}
          onClick={() => {
            updateStepStatus(stepIndex, "completed");
          }}
        >
          Next
        </Button>
      </Link>
    </div>
  );
};
