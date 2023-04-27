import { useState } from "react";

const useScrollFunc = () => {
  const [scroll, setScroll] = useState(false);

  const scrollFunc = (e) => {
    const windowHeight = window.innerHeight;
    const scrollPosition = e.target.documentElement.scrollTop;
    const contentHeight = document.body.scrollHeight;

    if (windowHeight + scrollPosition >= contentHeight) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  return { scroll, scrollFunc };
};

export default useScrollFunc;
