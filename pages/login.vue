<script setup lang="ts">
definePageMeta({
  layout: false,
});

const { setError, setSuccess } = useError();
const login = ref<boolean>(true);
const username = ref<string>("");
const email = ref<string>("");
const password = ref<string>("");
const retypePassword = ref<string>("");
const isLoading = ref<boolean>(false);
const userStore = useUserStore();

const loginHandler = async () => {
  isLoading.value = true;

  const loginData = { email: email.value, password: password.value };

  const response = await request.post("login", loginData);

  if (response.success) {
    userStore.setUser(response.data);
    clearFields();
    setSuccess(response.message);

    await fetchUserRights();
    const rights = useSettingsStore().userRights.find(
      (item) => item.accountType === response.data.accountType
    );

    if (rights) await fetchInitialUserData(rights);
    await navigateTo("/");
  } else {
    setError(response.message);
  }
  isLoading.value = false;
};

const registerHandler = async () => {
  isLoading.value = true;
  const loginData = {
    email: email.value,
    password: password.value,
    retypePassword: retypePassword.value,
    username: username.value,
  };

  const response: any = await request.post("register", loginData);

  if (response.success) {
    setSuccess(response.message);
    clearFields();
    changeLogin();
  } else {
    setError(response.message);
  }
  isLoading.value = false;
};

const changeLogin = () => {
  clearFields();
  login.value = !login.value;
};

const clearFields = () => {
  email.value = "";
  password.value = "";
  retypePassword.value = "";
  username.value = "";
};
</script>

<template>
  <div class="flex items-center justify-center pt-20 m-auto">
    <div class="flex flex-col items-center gap-4">
      <h3 v-if="login" class="text-2xl">Prisijungti</h3>
      <h3 v-else class="text-2xl">Registruotis</h3>

      <BaseInput
        v-if="!login"
        :name="username"
        @onChange="(v) => (username = v)"
        placeholder="Vardas"
        label="Vartotojo vardas"
        @keyup.enter="registerHandler"
      />

      <BaseInput
        :name="email"
        @onChange="(v) => (email = v)"
        placeholder="pavyzdys@gmail.com"
        label="Elektroninis paštas"
        @keyup.enter="login ? loginHandler : registerHandler"
      />

      <BaseInput
        :name="password"
        @onChange="(v) => (password = v)"
        placeholder="Slaptažodis"
        label="Slaptažodis"
        type="password"
        @keyup.enter="login ? loginHandler : registerHandler"
      />
      <BaseInput
        :name="retypePassword"
        @onChange="(v) => (retypePassword = v)"
        v-if="!login"
        placeholder="Slaptažodis"
        label="Slaptažodio patvirtinimas"
        type="password"
        @keyup.enter="registerHandler"
      />

      <BaseButton v-if="login" name="login" @click="loginHandler" :isLoading="isLoading" />
      <BaseButton v-else name="register" @click="registerHandler" :isLoading="isLoading" />

      <p v-if="login" class="self-center mt-4">
        Dar neturi paskyros?
        <span class="text-blue-500 hover:cursor-pointer" @click="changeLogin">Registruokis</span>
      </p>

      <p v-else class="self-center mt-4">
        Turi paskyrą?
        <span class="text-blue-500 hover:cursor-pointer" @click="changeLogin">Prisijunk</span>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
