import React, { ReactNode, FunctionComponent } from "react";

interface ContainerProps {
    children: ReactNode;
    maxWidth?: string;
    padding?: string;
    className?: string;
  }

const Container: FunctionComponent<ContainerProps> = ({
  children,
  maxWidth = "1200px",
  padding = "20px",
  className = "",
}) => {
  const containerStyle: React.CSSProperties = {
    maxWidth: maxWidth,
    margin: "0 auto", // Centers the container
    padding: padding, // Adds padding around the content
    boxSizing: "border-box",
  };

  return (
    <div style={containerStyle} className={className}>
      {children}
    </div>
  );
};

export default Container;
