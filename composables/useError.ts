export default function useError(): {
  error: Ref<string>;
  isError: Ref<boolean>;
  setIsError: (errorMessage: boolean) => void;
  setError: (errorMessage: string) => void;
} {
  const error = useState("error", () => "");
  const isError = useState("isError", () => true);
  let timeoutId: any = null;

  const setError = (errorMessage: string) => {
    error.value = errorMessage;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      error.value = "";
      isError.value = true;
    }, 3000);
  };
  const setIsError = (errorMessage: boolean) => {
    isError.value = errorMessage;
  };

  return {
    error,
    isError,
    setIsError,
    setError,
  };
}
