import React from "react";

type Props = {
  text: String;
  handler?: any;
};

const Button = ({ handler, text }: Props) => {
  return <button onClick={handler}>{text}</button>;
};
export default Button;
