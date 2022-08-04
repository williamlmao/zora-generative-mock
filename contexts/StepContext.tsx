import React, { createContext, FC } from "react";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

type StepIndex = number;

export type Step = {
  path: string;
  label: string;
  available?: boolean;
  completed?: boolean;
};

type Steps = Step[];
type LastCompletedStep = number;
interface StepContextInterface {
  stepIndex: StepIndex;
  setStepIndex: (step: StepIndex) => void;
  updateStepStatus: (stepIndex: number, property: string) => void;
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
      available: false,
      completed: false,
    },
    {
      path: "/create/generative/traits",
      label: "Trait Upload",
      available: false,
      completed: false,
    },
    {
      path: "/create/generative/rules",
      label: "Generative Rules",
      available: false,
      completed: false,
    },
    {
      path: "/create/generative/generate",
      label: "Generate Collection",
      available: false,
      completed: false,
    },
  ]);

  const reset = () => {
    localStorage.removeItem("collectiondetails");
    localStorage.removeItem("traitData");
    localStorage.removeItem("rules");
    setSteps(
      steps.map((step) => {
        if (step.label === "Collection Details") {
          return { ...step, available: true, completed: false };
        } else {
          return { ...step, available: false, completed: false };
        }
      })
    );
  };

  const updateStepStatus = (stepIndex: number, property: string) => {
    setSteps((prevState) => {
      return prevState.map((step, index) => {
        if (index === stepIndex) {
          return {
            ...step,
            [property]: true,
          };
        }
        return step;
      });
    });
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
