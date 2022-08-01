import { type } from "os";
import React, { createContext, FC } from "react";

interface Props {
  children: React.ReactNode;
}

type StepIndex = number;

type Step = {
  path: string;
  label: string;
};

type Steps = Step[];
type LastCompletedStep = number;
interface StepContextInterface {
  stepIndex: StepIndex;
  setStepIndex: (step: StepIndex) => void;
  steps: Steps;
  lastCompletedStep: LastCompletedStep;
  setLastCompletedStep: (step: StepIndex) => void;
}

const steps = [
  { path: "/create/generative/collectiondetails", label: "Collection Details" },
  { path: "/create/generative/traits", label: "Trait Upload" },
  { path: "/create/generative/rules", label: "Generative Rules" },
  { path: "/create/generative/generate", label: "Generate Collection" },
];

export const StepContext = createContext<StepContextInterface>({
  stepIndex: 0,
  setStepIndex: () => undefined,
  steps: steps,
  lastCompletedStep: -2,
  setLastCompletedStep: () => undefined,
});

export const StepContextProvider: FC<Props> = ({ children }) => {
  const [stepIndex, setStepIndex] = React.useState<StepIndex>(0);
  const [lastCompletedStep, setLastCompletedStep] =
    React.useState<LastCompletedStep>(-2);

  return (
    <StepContext.Provider
      value={{
        steps,
        stepIndex,
        setStepIndex,
        lastCompletedStep,
        setLastCompletedStep,
      }}
    >
      {children}
    </StepContext.Provider>
  );
};
