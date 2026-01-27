<script setup lang="ts">
const { setError, setSuccess } = useCustomError();
const userStore = useUserStore();
const initials = userStore.user?.username.slice(0, 2);
const newPassword = ref<string>("");
const password = ref<string>("");
const lastName = ref<string>(userStore.user?.lastName || "");
const phone = ref<string>(userStore.user?.phone || "");
const isSavedPhone = ref<boolean>(true);
const isSavedName = ref<boolean>(true);

const saveHandler = async (field: string) => {
  let value = "";
  if (field === "phone") value = phone.value!;
  else if (field === "name") value = lastName.value!;
  else if (field === "password") {
    if (password.value !== newPassword.value) {
      setError("Slaptažodžiai nesutampa");
      return;
    }
    value = password.value;
  }

  const response: any = await request.patch("updateProfile", { field, value });

  if (response.success) {
    !useSocketStore().connected && userStore.setUser(response.data);

    if (field === "password") {
      password.value = "";
      newPassword.value = "";
    } else if (field === "phone") isSavedPhone.value = true;
    else if (field === "name") isSavedName.value = true;

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

// const successHandler = async (photo: string) => {
// const oldPhotoId = userStore.user?.photo;
// const response: any = await $fetch("/api/uploadPhotos", {
//   method: "post",
//   body: { photo, category: "profile", _id: userStore.user?._id },
// });
// if (response.success) {
//   userStore.setUser(response.data);
//   setSuccess(response.message);
// } else {
//   setError(response.message);
// }
// const deleteResponse = await $fetch("/api/cloudinary", {
//   method: "delete",
//   body: { id: oldPhotoId },
// });
// if (!deleteResponse.success) setError(deleteResponse.message);
// };

watch(phone, (newPhone) => {
  if (newPhone !== userStore.user?.phone) isSavedPhone.value = false;
  else isSavedPhone.value = true;
});

watch(lastName, (newName) => {
  if (newName !== userStore.user?.lastName) isSavedName.value = false;
  else isSavedName.value = true;
});
</script>

<template>
  <div class="flex flex-col">
    <div class="flex border-b py-8 gap-14">
      <div class="bg-black rounded-xl">
        <div
          class="flex flex-col items-center justify-center overflow-hidden bg-gray-light rounded-t-xl h-60 w-60"
        >
          <!-- <NuxtImg
            v-if="userStore.user?.photo && userStore.user.photo !== ''"
            :src="userStore.user?.photo || ''"
            alt="Vartotojo nuotrauka"
            class="object-cover object-center w-full h-full"
            width="48"
            height="48"
            decoding="auto"
            loading="lazy"
            :ismap="true"
          /> -->
          <h3 class="text-3xl uppercase">{{ initials }}</h3>
        </div>
        <!-- <BaseUpload @on-success="successHandler" /> -->
      </div>

      <div class="flex flex-col h-60 font-semibold justify-around capitalize">
        <div class="flex gap-4 text-4xl">
          <p>{{ userStore.user?.username }}</p>
          <div class="flex">
            <input type="text" v-model="lastName" placeholder="Pavardė" class="max-w-60" />
            <div class="flex-1 flex">
              <NuxtImg
                width="20"
                height="20"
                v-if="!isSavedName"
                src="/icons/save.svg"
                decoding="auto"
                loading="lazy"
                :ismap="true"
                @click="saveHandler('name')"
                class="hover:cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div>
          {{ userStore.user?.accountType }}
          <h5 class="font-semibold"></h5>
        </div>
        <h5 class="font-semibold normal-case">{{ userStore.user?.email }}</h5>
        <div class="flex">
          <input type="text" v-model="phone" placeholder="Telefono numeris" class="max-w-32" />
          <div class="flex-1">
            <NuxtImg
              width="20"
              height="20"
              v-if="!isSavedPhone"
              src="/icons/save.svg"
              decoding="auto"
              loading="lazy"
              :ismap="true"
              @click="saveHandler('phone')"
              class="hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex py-8 gap-4">
      <BaseInput
        :name="newPassword"
        type="password"
        @onChange="(v) => (newPassword = v)"
        placeholder="Naujas slaptažodis"
      />
      <BaseInput
        :name="password"
        type="password"
        @onChange="(v) => (password = v)"
        placeholder="Pakartoti slaptažodį"
      />
      <BaseButton name="Išsaugoti slaptažodį" @click="saveHandler('password')" />
    </div>
  </div>
</template>

<style scoped></style>
