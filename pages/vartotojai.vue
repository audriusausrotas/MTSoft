<script setup lang="ts">
import { accountStatus } from "~/data/selectFieldData";

const { setError, setIsError } = useError();
const useSettings = useSettingsStore();
const useUser = useUserStore();
const password = ref<string>("");
const modalOpen = ref<boolean>(false);
const selectedUser = ref("");
const isLoading = ref<boolean>(false);

const userChangesHandler = async (id: string, type: string, value: string) => {
  const postData = {
    selectedUserId: id,
    changeType: type,
    password: password.value,
    value: value,
  };

  const data: any = await $fetch("/api/userChanges", {
    method: "post",
    body: postData,
  });
  if (data.success) {
    useUser.updateUser(data.data);
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};

const confirmHandler = async () => {
  isLoading.value = true;
  const postData = {
    selectedUserId: selectedUser.value,
    password: password.value,
  };

  if (password.value.trim().length > 4 || selectedUser.value.length > 0) {
    const data: { data: null; message: string; success: boolean } = await $fetch(
      "/api/userChanges",
      {
        method: "delete",
        body: postData,
      }
    );

    if (data.success) {
      useUser.deleteUser(selectedUser.value);
      password.value = "";
      selectedUser.value = "";
      modalOpen.value = false;
      setIsError(false);
      setError(data.message);
    } else {
      setError(data.message);
    }
  }
  isLoading.value = false;
};

const deleteHandler = (id: string) => {
  selectedUser.value = id;
  modalOpen.value = true;
};
</script>

<template>
  <div class="max-w-[1200px] w-full">
    <div class="flex p-3 bg-gray-ultra-light capitalize items-center justify-center rounded-t-2xl">
      <div class="flex-1">nr</div>
      <p class="flex-[3]">vartotojo vardas</p>
      <p class="flex-[6]">el. paštas</p>
      <p class="flex-[3]">paskyros statusas</p>
      <p class="flex-[3]">paskyros tipas</p>
      <div class="flex-1"></div>
    </div>

    <div
      v-for="(user, index) in useUser.users"
      :key="user._id"
      class="flex py-2 capitalize border-b"
    >
      <div class="flex-1 pl-3">{{ index + 1 }}</div>
      <p class="flex-[3] flex items-center">{{ user.username }} {{ user.lastName }}</p>

      <div class="flex-[6] flex lowercase items-center">{{ user.email }}</div>

      <BaseSelectField
        :id="user._id"
        name="verified"
        class="flex-[3]"
        :values="accountStatus"
        :defaultValue="user?.verified ? 'patvirtintas' : 'nepatvirtintas'"
        @onChange="(value: string) => userChangesHandler(user._id, 'verify', value)"
      />

      <BaseSelectField
        :id="user._id"
        :values="useSettings.selectValues.accountTypes"
        width="w-52"
        class="flex-[3]"
        :defaultValue="user?.accountType"
        @onChange="(value: string) => userChangesHandler(user._id, 'admin', value)"
      />

      <div class="flex justify-end flex-1 hover:cursor-pointer" @click="deleteHandler(user._id)">
        <NuxtImg
          src="/icons/delete.svg"
          alt="delete button "
          width="24"
          height="24"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div
      v-if="modalOpen"
      class="absolute top-0 left-0 flex z-50 items-center justify-center w-screen h-screen bg-opacity-80 bg-gray-ultra-light"
    >
      <div
        class="flex flex-col items-center gap-8 p-12 border shadow-md bg-gray-ultra-light rounded-xl"
      >
        <div class="flex flex-col items-center gap-8">
          <p>Įveskite slaptaždodį norėdami ištrinti vartotoją</p>
          <BaseInput
            placeholder="Slaptažodis"
            type="password"
            :name="password"
            @onChange="(v) => (password = v)"
          />
        </div>
        <div class="flex gap-4">
          <BaseButton name="atšaukti" @click="() => (modalOpen = false)" />
          <BaseButton name="patvirtinti" @click="confirmHandler" :isLoading="isLoading" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped></style>
