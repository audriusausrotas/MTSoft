<script setup lang="ts">
import { gateStatus } from "~/data/selectFieldData";
const useGates = useGateStore();
const route = useRoute();
const router = useRouter();
const useUser = useUserStore();
const gate = computed(() => {
  return useGates.gates.find((item) => item._id === route.params.id);
});
const { setError, setIsError } = useError();

const vartonasUsers = useUser.users
  .filter((user) => user.accountType === "Vartonas")
  .map((user) => user.email);

const buttonHandler = async () => {
  const response: any = await $fetch("/api/gates", {
    method: "patch",
    body: { _id: gate.value?._id },
  });

  if (response.success) {
    await router.replace("/vartai");
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const updateHandler = async (change: string, value: any) => {
  const response: any = await $fetch("/api/gates", {
    method: "put",
    body: {
      _id: gate.value?._id,
      change,
      value,
      username: useUser.user?.username,
    },
  });
  if (response.success) {
    useGates.updateGate(response.data, gate.value!._id);

    if (change === "status") {
      const link = `https://modernitvora.vercel.app/vartai/${gate.value?._id}`;

      const data: any = await $fetch("/api/mail", {
        method: "put",
        body: {
          to: response.data.manager,
          message: `Užsakymo ${gate.value?.orderNr}, ${gate.value?.client.address} statusas pakeistas į "${value}". Peržiūrėti galite čia: ${link} "`,
          title: "Statusas pasikeitė",
        },
      });

      if (data.success) {
        setIsError(false);
        setError(data.message);
      } else {
        setError(data.message);
      }
    }
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>
<template>
  <div class="flex flex-col gap-12 pb-32">
    <div class="flex flex-wrap gap-4 justify-center">
      <BaseSelectField
        :values="gateStatus"
        id="gateStatus"
        :defaultValue="gate?.measure"
        width="w-60"
        @onChange="(value: string) => updateHandler('status', value)"
      />
      <BaseSelectField
        :values="vartonasUsers"
        id="vartonasUsers"
        :defaultValue="gate?.manager"
        width="w-60"
        @onChange="(value: string) => updateHandler('manager', value)"
      />
      <BaseButtonWithInput
        name="įvesti užsakymo Nr."
        placeholder="Užsakymo Nr."
        @onConfirm="(value) => updateHandler('orderNr', value)"
      />
      <BaseButtonWithConfirmation name="užbaigti užsakymą" @onConfirm="buttonHandler" />
    </div>
    <div class="flex justify-center lg:justify-between font-semibold gap-4 flex-wrap">
      <div class="flex flex-col gap-4">
        <h3 class="text-xl">Užsakymo duomenys</h3>
        <BaseInput :name="gate?.orderNr" width="w-72" label="Užsakymo nr:" :disable="true" />
        <BaseInput
          :name="gate?.measure"
          width="w-72"
          label="Statusas:"
          :disable="true"
          :class="
            gate?.measure === 'Eilėje'
              ? 'text-red-full'
              : gate?.measure === 'Galima matuoti'
              ? ' text-orange-500'
              : 'text-green-500'
          "
        />
        <BaseInput
          :name="gate?.dateCreated.slice(0, 10)"
          width="w-72 "
          label="užsakymo data:"
          :disable="true"
        />
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-xl">Klento duomenys</h3>
        <BaseInput :name="gate?.client.username" width="w-72" label="klientas" :disable="true" />
        <BaseInput :name="gate?.client.address" width="w-72" label="adresas" :disable="true" />
        <BaseInput :name="gate?.client.phone" width="w-72" label="telefonas" :disable="true" />
      </div>
      <div class="flex flex-col gap-4">
        <h3 class="text-xl">Vadybininko duomenys</h3>
        <BaseInput
          :name="gate?.creator.username"
          width="w-72"
          label="atsakingas asmuo"
          :disable="true"
        />
        <BaseInput
          :name="gate?.creator.phone"
          width="w-72"
          label="Telefono numeris"
          :disable="true"
        />
        <BaseInput
          :name="gate?.creator.email"
          width="w-72"
          label="Elektroninis paštas"
          :disable="true"
        />
      </div>
    </div>
    <BaseComment
      :commentsArray="gate?.comments"
      :id="gate?._id"
      @onSave="(value) => updateHandler('comment', value)"
      @onDelete="(id, comment) => updateHandler('deleteComment', comment)"
    />
    <div class="flex flex-col gap-4">
      <div v-for="(g, i) in gate?.gates" :key="g._id">
        <GatesGate :gate="g" :index="i" />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
