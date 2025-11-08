import React, { createContext, useContext, useState } from "react";
import ViewShot from "react-native-view-shot";

interface ViewShotProps {
  setViewShot: (viewShot: ViewShot) => void;
  viewShot: ViewShot | undefined;
}

interface ViewShotProviderProps {
  children: React.ReactNode;
}

export const ViewShotContext = createContext<ViewShotProps | undefined>(
  undefined
);

export const useViewShot = (): ViewShotProps => {
  const context = useContext(ViewShotContext);
  if (!context) {
    throw new Error("useViewShot must be used within a ViewShotProvider");
  }
  return context;
};

export const ViewShotContextProvider = ({
  children,
}: ViewShotProviderProps) => {
  const [viewShot, setViewShot] = useState<ViewShot>();

  const contextValue: ViewShotProps = {
    setViewShot: setViewShot,
    viewShot: viewShot,
  };

  return (
    <ViewShotContext.Provider value={contextValue}>
      {children}
    </ViewShotContext.Provider>
  );
};
