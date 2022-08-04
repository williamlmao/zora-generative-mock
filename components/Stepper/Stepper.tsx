import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { StepContext } from "../../contexts/StepContext";
import { StepDisplay } from "./StepDisplay";

export const Stepper = () => {
  const { steps, updateStepStatus, reset } = useContext(StepContext);
  const router = useRouter();
  const currentPath = router.pathname;
  const activeStepIndex = steps.findIndex((step) => step.path === currentPath);
  useEffect(() => {
    if (localStorage.getItem("collectiondetails")) {
      updateStepStatus(1, "available");
      updateStepStatus(0, "completed");
    }

    if (localStorage.getItem("traitData")) {
      updateStepStatus(1, "available");
      updateStepStatus(1, "completed");
    }

    if (localStorage.getItem("rules")) {
      updateStepStatus(2, "available");
      updateStepStatus(2, "completed");
    }
  }, []);
  useEffect(() => {
    // // If someone enters a route in the browser but they have not completed previous steps, we need to redirect them to their last completed step
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
