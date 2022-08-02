import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { StepContext } from "../../contexts/StepContext";
import { StepDisplay } from "./StepDisplay";

export const Stepper = () => {
  const { steps } = useContext(StepContext);
  const router = useRouter();
  const currentPath = router.pathname;
  const activeStepIndex = steps.findIndex((step) => step.path === currentPath);
  useEffect(() => {
    // If someone enters a route in the browser but they have not completed previous steps, we need to redirect them to their last completed step
    if (!steps[activeStepIndex].available) {
      router.replace(steps[0].path);
    }
  }, [activeStepIndex, router, steps]);

  return (
    <div className="font-medium text-sm flex justify-center text-center">
      <div className="flex mt-12">
        {steps.map((step, index) => {
          return (
            <StepDisplay
              step={step}
              active={currentPath === step.path}
              key={step.path}
            />
          );
        })}
      </div>
    </div>
  );
};
