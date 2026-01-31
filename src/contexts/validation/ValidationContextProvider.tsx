import React, { createContext, useContext, useState } from "react";

interface ValidationProps {
  showSuccessModal: (message: string) => void;
  showErrorModal: (message: string) => void;
  isSuccessModalVisible: boolean;
  isErrorModalVisisble: boolean;
  successMessage: string;
  errorMessage: string;
  closeValidationModal: () => void;
}

interface ValidationProviderProps {
  children: React.ReactNode;
}

export const ValidationContext = createContext<ValidationProps | undefined>(
  undefined
);

export const useValidation = (): ValidationProps => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error("useValidation must be used within a ValidationProvider");
  }
  return context;
};

export const ValidationContextProvider = ({
  children,
}: ValidationProviderProps) => {
  const [isSuccessModalVisible, setIsSuccessModalVisible] =
    useState<boolean>(false);
  const [isErrorModalVisible, setIsErrorModalVisible] =
    useState<boolean>(false);

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const showSuccessModal = (message: string) => {
    setIsSuccessModalVisible(true);
    setSuccessMessage(message);
  };

  const showErrorModal = (message: string) => {
    setIsErrorModalVisible(true);
    setErrorMessage(message);
  };

  const closeValidationModal = () => {
    setIsErrorModalVisible(false);
    setIsSuccessModalVisible(false);
  };

  const contextValue: ValidationProps = {
    showErrorModal: showErrorModal,
    showSuccessModal: showSuccessModal,
    isErrorModalVisisble: isErrorModalVisible,
    isSuccessModalVisible: isSuccessModalVisible,
    errorMessage: errorMessage,
    successMessage: successMessage,
    closeValidationModal: closeValidationModal,
  };

  return (
    <ValidationContext.Provider value={contextValue}>
      {children}
    </ValidationContext.Provider>
  );
};
