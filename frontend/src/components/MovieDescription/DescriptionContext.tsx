import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import PropTypes from "prop-types";

interface DescriptionContextType {
  showDescription: boolean;
  setShowDescription: Dispatch<SetStateAction<boolean>>;
}

interface DescriptionProviderProps {
  children: ReactNode;
}

const DescriptionContext = createContext<DescriptionContextType>({
  showDescription: false,
  setShowDescription: () => {},
});

export function DescriptionProvider({ children }: DescriptionProviderProps) {
  const [showDescription, setShowDescription] = useState(false);
  return (
    <DescriptionContext.Provider
      value={{ showDescription, setShowDescription }}
    >
      {children}
    </DescriptionContext.Provider>
  );
}

DescriptionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useDescription = () => useContext(DescriptionContext);
