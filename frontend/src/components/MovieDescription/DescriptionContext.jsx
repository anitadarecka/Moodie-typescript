import React, { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const DescriptionContext = createContext(false);

const useDescription = () => {
  const { showDescription, setShowDescription } =
    useContext(DescriptionContext);
  const handleDescription = (value) => {
    setShowDescription(value);
  };
  return { value: showDescription, onChange: handleDescription };
};

const DescriptionProvider = ({ children }) => {
  const [showDescription, setShowDescription] = useState(false);
  const value = useMemo(
    () => ({
      showDescription,
      setShowDescription,
    }),
    [showDescription]
  );
  return (
    <DescriptionContext.Provider value={value}>
      {children}
    </DescriptionContext.Provider>
  );
};

DescriptionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DescriptionProvider, useDescription };
