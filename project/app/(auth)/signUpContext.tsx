import React, { createContext, useContext, useState } from "react";

type SignUpData = {
  email: string;
  username: string;
  password: string;
  skills: string[];
  learningInterests: string[];
  bio: string;
};

type SignUpContextType = {
  signUpData: SignUpData;
  updateSignUpData: (data: Partial<SignUpData>) => void;
  clearSignUpData: () => void;
};

const initialState: SignUpData = {
  email: "",
  username: "",
  password: "",
  skills: [],
  learningInterests: [],
  bio: "",
};

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export function SignUpProvider({ children }: { children: React.ReactNode }) {
  const [signUpData, setSignUpData] = useState<SignUpData>(initialState);

  const updateSignUpData = (data: Partial<SignUpData>) => {
    setSignUpData((prev) => ({ ...prev, ...data }));
  };

  const clearSignUpData = () => {
    setSignUpData(initialState);
  };

  return (
    <SignUpContext.Provider
      value={{ signUpData, updateSignUpData, clearSignUpData }}
    >
      {children}
    </SignUpContext.Provider>
  );
}

export const useSignUpContext = () => {
  const context = useContext(SignUpContext);
  if (context === undefined) {
    throw new Error("useSignUpContext must be used within a SignUpProvider");
  }
  return context;
};
