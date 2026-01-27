const message = ref("");
const isError = ref(false);
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const showMessage = (text: string, type: boolean) => {
  message.value = text;
  isError.value = type;

  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    message.value = "";
    isError.value = false;
  }, 950);
};

const setSuccess = (text: string) => showMessage(text, false);
const setError = (text: string) => showMessage(text, true);

export default function useCustomError() {
  return {
    message,
    isError,
    setSuccess,
    setError,
  };
}
