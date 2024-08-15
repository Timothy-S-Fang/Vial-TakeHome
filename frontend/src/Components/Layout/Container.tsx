import { FunctionComponent } from "react";
import { ContainerProps } from "../../types/AppTypes";

// General Component container
const Container: FunctionComponent<ContainerProps> = ({ children }) => {
  return (
    <div style={{maxWidth:"1200px", padding:"20px", margin:"0 auto", boxSizing:"border-box",}}>
      {children}
    </div>
  );
};

export default Container;
