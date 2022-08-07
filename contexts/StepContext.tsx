import React, { createContext, FC, useEffect } from "react";
import { useRouter } from "next/router";
import { stat } from "fs";

interface Props {
  children: React.ReactNode;
}

type StepIndex = number;
type Status = "inprogress" | "completed" | "notstarted";
export type Step = {
  status: Status;
  path: string;
  label: string;
};

type Steps = Step[];

interface StepContextInterface {
  stepIndex: StepIndex;
  setStepIndex: (step: StepIndex) => void;
  updateStepStatus: (stepIndex: number, status: Status) => void;
  steps: Steps;
  reset: () => void;
}

export const StepContext = createContext<StepContextInterface>({
  stepIndex: 0,
  setStepIndex: () => undefined,
  updateStepStatus: () => undefined,
  reset: () => undefined,
  steps: [],
});

export const StepContextProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [stepIndex, setStepIndex] = React.useState<StepIndex>(0);
  const [steps, setSteps] = React.useState<Steps>([
    {
      path: "/create/generative/collectiondetails",
      label: "Collection Details",
      status: "notstarted",
    },
    {
      path: "/create/generative/traits",
      label: "Trait Upload",
      status: "notstarted",
    },
    {
      path: "/create/generative/rules",
      label: "Generative Rules",
      status: "notstarted",
    },
    {
      path: "/create/generative/generate",
      label: "Generate Collection",
      status: "notstarted",
    },
  ]);

  // use effect on page change
  useEffect(() => {
    const currentStep = steps.find((step) => step.path === router.pathname);
    if (currentStep) {
      setStepIndex(steps.indexOf(currentStep));
    }
  }, [router.pathname]);

  useEffect(() => {
    // This logic was originally handled in StepContext but ran into a rerendering bug there. Moving the logic here fixed it, but I would still prefer to have it back in Stepcontext.
    const collectionDetailsCompleted = !Object.keys(
      JSON.parse(localStorage.getItem("collectionDetails") || "{}")
    ).some((value) => value === "");

    const traitDataCompleted =
      Object.keys(JSON.parse(localStorage.getItem("traitData") || "{}"))
        .length > 0;

    if (collectionDetailsCompleted) {
      // updateStep[0] to completed
      setSteps((prevSteps) => {
        const updatedSteps = [...prevSteps];
        updatedSteps[0].status = "completed";
        return updatedSteps;
      });
    }
    if (traitDataCompleted) {
      setSteps((prevSteps) => {
        const updatedSteps = [...prevSteps];
        updatedSteps[1].status = "completed";
        return updatedSteps;
      });
    }
  }, []);

  const reset = () => {
    localStorage.removeItem("collectionDetails");
    localStorage.removeItem("traitData");
    localStorage.removeItem("rules");
    setSteps(
      steps.map((step, index) => {
        if (index === 0) {
          return { ...step, status: "inprogress" };
        } else {
          return { ...step, status: "notstarted" };
        }
      })
    );
  };

  const updateStepStatus = (indexToBeUpdated: number, status: Status) => {
    setSteps(
      steps.map((step, index) => {
        if (index === indexToBeUpdated) {
          console.log("UPDATED STEP", step, "TO", status);
          return { ...step, status };
        }
        if (
          index === indexToBeUpdated + 1 &&
          steps[indexToBeUpdated + 1].status !== "completed" &&
          status === "completed"
        ) {
          console.log(
            "UPDATING STEP",
            steps[indexToBeUpdated + 1],
            "TO",
            status
          );
          return { ...step, status: "inprogress" };
        }
        console.log("returning step", step);
        return step;
      })
    );
  };

  return (
    <StepContext.Provider
      value={{
        steps,
        stepIndex,
        updateStepStatus,
        setStepIndex,
        reset,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};
