import { useWindowSize } from "src/utils/";

const useIsSmallScreen = () => {
  const { width } = useWindowSize();
  return width < 1030;
};

export default useIsSmallScreen;
