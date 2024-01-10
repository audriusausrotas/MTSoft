export default function useError() {
  const message = ref("");
  const isError = ref(false);
  let timeout = null;

  function setError(msg, isErr) {
    clearTimeout(timeout);

    message.value = msg;
    isError.value = isErr;

    timeout = setTimeout(() => {
      message.value = "";
      isError.value = false;
    }, 3000);
  }

  return { message, isError, setError };
}
