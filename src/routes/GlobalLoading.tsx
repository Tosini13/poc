import React from "react";
import { useNavigation } from "react-router-dom";

type GlobalLoadingPropsType = {};

const GlobalLoading: React.FC<GlobalLoadingPropsType> = ({}) => {
  const navigation = useNavigation();

  if (navigation.state !== "loading") {
    return null;
  }

  return (
    <div data-test-id="global_loading">
      <LoadingDots />
      global loading
    </div>
  );
};

type LoadingDotsPropsType = {};

const LoadingDots: React.FC<LoadingDotsPropsType> = ({}) => {
  const [dots, setState] = React.useState("...");

  React.useEffect(() => {
    let n = 3;
    const intervalId = setInterval(() => {
      setState(
        Array.from({ length: (n % 3) + 1 })
          .fill(".")
          .join("")
      );
      n += 1;
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <span data-test-id="loading_dots">{dots}</span>;
};

export default GlobalLoading;
