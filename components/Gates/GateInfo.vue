<script setup lang="ts">
const props = defineProps(["gate", "index"]);
const useUser = useUserStore();
const router = useRouter();

const clickHandler = () => {
  router.push(`/vartai/${props.gate._id}`);
};
</script>
<template>
  <div
    @click="clickHandler"
    class="flex gap-1 sm:gap-4 justify-evenly gap-y-4 pb-4 flex-wrap hover:scale-105 transition-transform hover:cursor-pointer select-none"
  >
    <BaseInput :name="index + 1" width="w-14 order-1" :disable="true" />
    <BaseInput :name="props.gate.orderNr" width="w-36 order-2" :disable="true" />
    <BaseInput
      :name="props.gate.client.address"
      width="w-full md:w-80 order-4 md:order-3"
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
          : 'bg-green-500'
      "
    >
      {{ props.gate.measure }}
    </div>

    <BaseInfoField
      v-if="useUser.user?.accountType === 'Administratorius' && props.gate.manager"
      :name="props.gate.manager.split('@')[0]"
      width="w-32 order-5"
      class="capitalize"
    />
  </div>
</template>
<style scoped></style>
