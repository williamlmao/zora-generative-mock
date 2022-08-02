import React, { createContext, FC } from "react";

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
}

export const StepContext = createContext<StepContextInterface>({
  stepIndex: 0,
  setStepIndex: () => undefined,
  updateStepStatus: () => undefined,
  steps: [],
});

export const StepContextProvider: FC<Props> = ({ children }) => {
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
      }}
    >
      {children}
    </StepContext.Provider>
  );
};
