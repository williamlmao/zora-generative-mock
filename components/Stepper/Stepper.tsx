import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { StepContext } from "../../contexts/StepContext";
import { Step } from "./Step";

export const Stepper = () => {
  const { steps, lastCompletedStep } = useContext(StepContext);
  const router = useRouter();
  const currentPath = router.pathname;
  const activeStepIndex = steps.findIndex((step) => step.path === currentPath);
  useEffect(() => {
    // If someone enters a route in the browser but they have not completed previous steps, we need to redirect them to their last completed step
    if (activeStepIndex > lastCompletedStep + 1 && activeStepIndex !== 0) {
      router.replace(steps[0].path);
    }
  }, [activeStepIndex, lastCompletedStep, router, steps]);

  return (
    <div className="font-medium text-sm flex justify-center text-center">
      <div className="flex mt-12">
        {steps.map((step, index) => {
          return (
            <Step
              path={step.path}
              label={step.label}
              complete={index <= lastCompletedStep}
              canVisit={index <= lastCompletedStep + 1}
              active={currentPath === step.path}
              key={step.path}
            />
          );
        })}
      </div>
    </div>
  );
};
