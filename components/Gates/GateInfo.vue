<script setup lang="ts">
const props = defineProps(["gate", "index"]);
const useUser = useUserStore();
const useGates = useGateStore();
const router = useRouter();
const { setError, setIsError } = useError();

const dateNow = new Date().getTime();
const dateCreated = new Date(props.gate.dateCreated).getTime();

const dateDifferenceMs = dateNow - dateCreated;
const dateDifference = Math.floor(dateDifferenceMs / (1000 * 60 * 60 * 24));
console.log(dateDifference);
const clickHandler = () => {
  router.push(`/vartai/${props.gate._id}`);
};

const deleteHandler = async () => {
  const confirmed = confirm("Ar tikrai norite ištrinti projektą?");
  if (!confirmed) return;

  const response: any = await $fetch("/api/gates", {
    method: "delete",
    body: { _id: props.gate._id },
  });
  if (response.success) {
    useGates.removeGates(props.gate._id);
    setIsError(false);
    setError("Vartų užsakymas ištrintas");
  } else {
    setError(response.message);
  }
};
</script>
<template>
  <div class="flex gap-4 m-auto border-b border-red-600">
    <div
      @click="clickHandler"
      class="flex gap-1 sm:gap-4 justify-evenly gap-y-4 pb-4 flex-wrap hover:scale-105 transition-transform hover:cursor-pointer select-none"
    >
      <BaseInput :name="index + 1" width="w-14 order-1" :disable="true" />
      <BaseInput
        :name="props.gate.orderNr"
        width="w-48 order-2"
        :disable="true"
      />

      <BaseInput
        :name="props.gate.client.address"
        width="w-full md:w-80 order-6 md:order-3"
        :disable="true"
      />

      <div
        id="gateStatus"
        class="text-white py-2 rounded-lg h-10 w-40 text-center order-3 md:order-4"
        :class="
          props.gate.measure === 'Eilėje'
            ? 'bg-red-full'
            : props.gate.measure === 'Galima matuoti'
            ? ' bg-orange-500'
            : props.gate.measure === 'Baigtas'
            ? 'bg-black'
            : 'bg-green-500'
        "
      >
        {{ props.gate.measure }}
      </div>

      <BaseInfoField
        v-if="
          useUser.user?.accountType === 'Administratorius' && props.gate.manager
        "
        :name="props.gate.manager.split('@')[0]"
        width="w-32 order-4 "
        class="capitalize"
      />
      <BaseInfoField
        :name="props.gate.dateCreated.slice(0, 10)"
        width="w-32"
        class="order-5"
        :class="
          dateDifference < 25
            ? 'bg-green-500'
            : dateDifference < 45
            ? 'bg-orange-500'
            : dateDifference < 60
            ? 'bg-red-600'
            : 'bg-red-800 text-white animate-bounce'
        "
      />
    </div>
    <div
      @click="deleteHandler"
      class="hover:cursor-pointer hover:bg-red-200 flex items-center justify-center w-8 h-8 rounded-md"
    >
      <NuxtImg
        src="/icons/delete.svg"
        width="24"
        height="24"
        decoding="auto"
        :ismap="true"
        loading="lazy"
      />
    </div>
  </div>
</template>
<style scoped></style>
