<script setup lang="ts">
import type { ResponseUser } from "~/data/interfaces";

const useUser = useUserStore();
const initials = computed(() => useUser.user?.username.slice(0, 2));
const url = ref<string>("");
const newPassword = ref<string>("");
const password = ref<string>("");
const lastName = ref<string>("");
const phone = ref<string>("");

const saveHandler = async () => {
  const reqData = {
    url: url.value,
    newPassword: newPassword.value,
    password: password.value,
    lastName: lastName.value,
    phone: phone.value,
  };

  const { data }: { data: ResponseUser } = await $fetch("/api/profile", {
    method: "post",
    body: reqData,
  });

  if (data.success) {
    useUser.setUser(data.data);
    password.value = "";
    newPassword.value = "";
    url.value = "";
    lastName.value = "";
    phone.value = "";
  }
};
</script>

<template>
  <div class="flex gap-4">
    <div class="flex flex-col flex-1 gap-8">
      <div class="flex items-center gap-10">
        <div
          class="flex items-center justify-center overflow-hidden bg-gray-light rounded-xl h-60 w-60"
        >
          <NuxtImg
            v-if="useUser.user?.photo"
            :src="useUser.user?.photo"
            alt="Vartotojo nuotrauka"
            class="object-cover object-center w-full h-full"
            width="48"
            height="48"
            decoding="auto"
            loading="lazy"
            :ismap="true"
          />
          <h3 v-else class="text-3xl uppercase">{{ initials }}</h3>
        </div>

        <div class="flex flex-col gap-4 capitalize">
          <h3 class="text-4xl font-semibold">
            {{ useUser.user?.username }} {{ useUser.user?.lastName }}
          </h3>
          <div>
            <p v-if="useUser.user?.admin">Vartotojo tipas:</p>

            <h5 class="font-semibold">
              {{
                useUser.user?.admin
                  ? "administratorius"
                  : "paprastas vartotojas"
              }}
            </h5>
          </div>
          <div>
            <h3>El. Paštas:</h3>
            <h5 class="font-semibold normal-case">{{ useUser.user?.email }}</h5>
          </div>
          <div>
            <h3>Telefono numeris:</h3>
            <h5 class="font-semibold normal-case">{{ useUser.user?.phone }}</h5>
          </div>
        </div>
      </div>
      <BaseInput
        :name="url"
        @onChange="(v) => (url = v)"
        placeholder="Nuotraukos nuoroda"
        width="full"
      >
        <NuxtImg
          src="/icons/link.svg"
          width="20"
          height="20"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
      </BaseInput>
    </div>
    <div class="flex flex-col items-center justify-between gap-2 flex-[2]">
      <h4 class="text-2xl font-semibold">Pakeisti Slaptažodį</h4>
      <BaseInput
        :name="newPassword"
        type="password"
        @onChange="(v) => (newPassword = v)"
        placeholder="Naujas slaptažodis"
        label="Naujas Slaptažodis"
      />
      <BaseInput
        :name="password"
        type="password"
        @onChange="(v) => (password = v)"
        placeholder="Pakartoti slaptažodį"
        label="Pakartoti slaptažodį"
      />
      <BaseInput
        :name="lastName"
        @onChange="(v) => (lastName = v)"
        placeholder="Pavardė"
        label="Pavardė"
      />
      <BaseInput
        :name="phone"
        @onChange="(v) => (phone = v)"
        placeholder="Telefono numeris"
        label="Telefono numeris"
      />
      <BaseButton name="išsaugoti pakeitimus" @click="saveHandler" />
    </div>
  </div>
</template>

<style scoped></style>
