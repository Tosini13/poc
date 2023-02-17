import React from "react";

type EffectRendersPropsType = {
  count: number;
};

const EffectRenders: React.FC<EffectRendersPropsType> = (props) => {
  React.useEffect(() => {
    console.log("Render with empty dependency array !log!");
  }, []);

  React.useEffect(() => {
    console.log("Render with prop in dependency array !log!", props.count);
  }, [props.count]);

  return null;
};

export default EffectRenders;
