import { useWeb3Context } from "../contexts/Web3Context";

const useAuthedCallback = (callback: () => any) => {
  const { login, isAuthed } = useWeb3Context();

  const authedCallback = () => {
    if (isAuthed) {
      return callback();
    } else {
      return login();
    }
  };

  return authedCallback;
};

export default useAuthedCallback;
