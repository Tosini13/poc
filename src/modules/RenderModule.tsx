import React from "react";
import EffectRenders from "../proofs/render/effect";
import SubComponents from "../proofs/render/SubComponents";

type RenderModulePropsType = {};

const RenderModule: React.FC<RenderModulePropsType> = ({}) => {
  const [count, setCount] = React.useState(0);

  const handleOnClick = () => {
    setCount((c) => (c += 1));
    setCount((c) => (c += 1));
  };

  return (
    <div data-test-id="render_module">
      <h1>Counter: {count}</h1>
      <EffectRenders count={count} />
      <SubComponents />
      <button onClick={handleOnClick}>Count</button>
    </div>
  );
};

export default RenderModule;
