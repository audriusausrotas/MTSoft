<script setup lang="js">

const useUser = useUserStore();
const password = ref < string > ("");
const modalOpen = ref < boolean > (false);
const selectedUser = ref("");

if (useUser.users.length === 0) {
  const data = await useFetch("/api/users");
  useUser.setAllUsers(data.data.value.data);
}

const userChangesHandler = async (id, type) => {

  const postData = { userId: id, changeType: type, password: password.value };

  const { data } = await useFetch("/api/userChanges", {
    method: "post",
    body: postData
  });

  if (data.value.success) {
    if (type !== "delete") {
      useUser.updateUser(data.value.data);
    }
    else {
      modalOpen.value = false;
      useUser.deleteUser(data.value.data);
      password.value = "";
      selectedUser.value = "";
    }
  }
};

const confirmHandler = () => {
  if (password.value.trim().length > 4 || selectedUser.value.length > 0) {
    userChangesHandler(selectedUser.value, "delete");
  }
};

const deleteHandler = (id) => {
  selectedUser.value = id;
  modalOpen.value = true;
};
</script>

<template>
  <div>
    <div class="flex pb-6 text-gray-400 capitalize">
      <div class="flex-1">nr</div>
      <p class="flex-[4]">vartotojo vardas</p>
      <p class="flex-[4]">paskyros statusas</p>
      <p class="flex-[6]">el. paštas</p>
      <p class="flex-[3]">paskyros tipas</p>
      <div class="flex-1"></div>
    </div>

    <div v-for="(user, index) in useUser.users" :key="user._id" class="flex py-2 capitalize border-b">
      <div class="flex-1">{{ index + 1 }}</div>
      <p class="flex-[4] flex items-center">{{ user.username }}</p>
      <div class="flex-[4]">
        <BaseSelectField :id="user._id" name="verified" :values="['patvirtintas', 'nepatvirtintas']"
          :defaultValue="user?.verified ? 'patvirtintas' : 'nepatvirtintas'"
          @onChange="userChangesHandler(user._id, 'verify')" />
      </div>
      <div class="flex-[6] flex items-center">{{ user.email }}</div>

      <BaseSelectField :id="user._id" name="admin" :values="['administratorius', 'paprastas vartotojas']" :defaultValue="user?.admin ? 'administratorius' : 'paprastas vartotojas'
        " @onChange="userChangesHandler(user._id, 'admin')" />

      <div class="flex justify-end flex-1 hover:cursor-pointer" @click="deleteHandler(user._id)">
        <NuxtImg src="/icons/delete.svg" alt="delete button " width="24" height="24" />
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div v-if="modalOpen"
      class="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-opacity-80 bg-gray-ultra-light">
      <div class="flex flex-col items-center gap-8 p-12 border shadow-md bg-gray-ultra-light rounded-xl">
        <div class="flex flex-col items-center gap-8">
          <p>Įveskite slaptaždodį norėdami ištrinti vartotoją</p>
          <BaseInput placeholder="Slaptažodis" :name="password" type="password" @update:name="(v) => (password = v)" />
        </div>
        <div class="flex gap-4">
          <BaseButton name="atšaukti" @click="() => (modalOpen = false)" />
          <BaseButton name="patvirtinti" @click="confirmHandler" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped></style>
