import React from "react";
import "./checkbox.css";
import classnames from "classnames";
import { CheckIcon } from "../icons";

const Checkbox = ({ active, className }) => {
  return (
    <div
      className={classnames("checkbox", className, "checkbox__dark", {
        checkbox__active: active,
      })}
    >
      {active && <CheckIcon />}
    </div>
  );
};

Checkbox.defaultProps = {
  className: "",
};

export default Checkbox;
