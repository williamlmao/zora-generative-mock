import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Button } from "react-daisyui";
import { StepContext } from "../contexts/StepContext";

export const PageControls = ({ nextDisabled }: { nextDisabled: boolean }) => {
  const { steps, stepIndex, updateStepStatus } = useContext(StepContext);
  const router = useRouter();
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

  // We can't use the same button component as below because the form will not receive data if Next changes the route. So on collection details page we handle route change in the onSubmit function.
  return (
    <div className="w-full flex gap-4 mt-4">
      {stepIndex === 0 ? (
        <Button type="submit" className="flex-1 normal-case" color="primary">
          Next
        </Button>
      ) : (
        <>
          <Link href={steps[stepIndex - 1].path}>
            <Button type="button" className="flex-1" color="secondary">
              Back
            </Button>
          </Link>
          <Link href={steps[stepIndex + 1].path}>
            <Button
              type="submit"
              className="flex-1 normal-case"
              color="primary"
              disabled={nextDisabled}
              onClick={() => {
                updateStepStatus(stepIndex, "completed");
                router.push(steps[stepIndex + 1].path);
              }}
            >
              Next
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};
