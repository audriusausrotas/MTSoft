<script setup lang="ts">
import type { ResponseUser } from "~/data/interfaces";

const { setError, setIsError } = useError();
const useUser = useUserStore();
const initials = useUser.user?.username.slice(0, 2);
const newPassword = ref<string>("");
const password = ref<string>("");
const lastName = ref<string>(useUser.user?.lastName || "");
const phone = ref<string>(useUser.user?.phone || "");
const isSavedPhone = ref<boolean>(true);
const isSavedName = ref<boolean>(true);


const cloudConfig = useRuntimeConfig();
const config = {
  cloud: {
    apiKey: cloudConfig.public.cloudApiKey,
    cloudName: cloudConfig.public.cloudName
  },
}

const saveHandler = async (field: string) => {
  let value = ""
  if (field === "phone") value = phone.value!
  else if (field === "name") value = lastName.value!
  else if (field === "password") {
    if (password.value !== newPassword.value) {
      setError("Slaptažodžiai nesutampa");
      return
    }
    value = password.value
  }

  const response: any = await $fetch("/api/profile", {
    method: "post",
    body: { field, value },
  });

  if (response.success) {
    useUser.setUser(response.data);

    if (field === "password") {
      password.value = "";
      newPassword.value = "";
    }
    else if (field === "phone")
      isSavedPhone.value = true
    else if (field === "name")
      isSavedName.value = true


    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const successHandler = async (result: any) => {
  const url = result.info.secure_url
  const id = result.info.public_id

  const oldPhotoId = useUser.user?.photo.id

  const response: any = await $fetch("/api/profile", {
    method: "put",
    body: { url, public_id: id },
  });
  if (response.success) {
    useUser.setUser(response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }

  const deleteResponse = await $fetch("/api/cloudinary", {
    method: "delete",
    body: { id: oldPhotoId },
  });
  if (!deleteResponse.success) setError(deleteResponse.message);

}




watch(phone, (newPhone) => {
  if (newPhone !== useUser.user?.phone)
    isSavedPhone.value = false
  else
    isSavedPhone.value = true
});

watch(lastName, (newName) => {
  if (newName !== useUser.user?.lastName)
    isSavedName.value = false
  else
    isSavedName.value = true
});

</script>

<template>
  <div class="flex flex-col">
    <div class="flex border-b py-8 gap-14">
      <div>
        <div class="flex flex-col items-center justify-center overflow-hidden bg-gray-light rounded-t-xl h-60 w-60">
          <NuxtImg v-if="useUser.user?.photo?.url && useUser.user.photo.url !== ''"
            :src="useUser.user?.photo?.url || ''" alt="Vartotojo nuotrauka"
            class="object-cover object-center w-full h-full" width="48" height="48" decoding="auto" loading="lazy"
            :ismap="true" />
          <h3 v-else class="text-3xl uppercase">{{ initials }}</h3>
        </div>
        <CldUploadWidget v-slot="{ open }" signatureEndpoint="/api/cloudinarySignature" :config="config"
          uploadPreset="defaultSigned" @success="successHandler">
          <button type="button" @click="open"
            class="h-12 bg-black rounded-b-xl hover:bg-red-full text-white w-full">Įkelti
            nuotrauką</button>
        </CldUploadWidget>
      </div>

      <div class="flex flex-col h-60 font-semibold justify-around capitalize">
        <div class="flex gap-4 text-4xl  ">
          <p>{{ useUser.user?.username }} </p>
          <div class="flex">
            <input type="text" v-model="lastName" placeholder="Pavardė" class="max-w-60" />
            <div class="flex-1 flex">
              <NuxtImg width="20" height="20" v-if="!isSavedName" src="/icons/save.svg" decoding="auto" loading="lazy"
                :ismap="true" @click="saveHandler('name')" class="hover:cursor-pointer" />
            </div>
          </div>
        </div>

        <div>
          {{ useUser.user?.accountType }}
          <h5 class="font-semibold"></h5>
        </div>
        <h5 class="font-semibold normal-case">{{ useUser.user?.email }}</h5>
        <div class="flex">
          <input type="text" v-model="phone" placeholder="Telefono numeris" class="max-w-32" />
          <div class="flex-1">
            <NuxtImg width="20" height="20" v-if="!isSavedPhone" src="/icons/save.svg" decoding="auto" loading="lazy"
              :ismap="true" @click="saveHandler('phone')" class="hover:cursor-pointer" />
          </div>
        </div>

      </div>
    </div>
    <div class="flex flex-col py-8 ">
      <BaseInput :name="newPassword" type="password" @onChange="(v) => (newPassword = v)"
        placeholder="Naujas slaptažodis" />
      <BaseInput :name="password" type="password" @onChange="(v) => (password = v)"
        placeholder="Pakartoti slaptažodį" />
      <BaseButton name="Pakeisti slaptažodį" @click="saveHandler" />
    </div>
  </div>
</template>

<style scoped></style>
