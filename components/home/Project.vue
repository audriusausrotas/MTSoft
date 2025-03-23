<script setup lang="ts">
const props = defineProps(["project", "index", "length", "location"]);
const useProjects = useProjectsStore();
const useSettings = useSettingsStore();
const useGates = useGateStore();
const open = ref<boolean>(false);

const { setError, setIsError } = useError();

const time = computed(() => {
  const today = new Date();
  const expirationDate = new Date(props.project.dateExparation);
  return Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
});

const gateOrdered = computed(() => {
  const test = useGates.gates.some((item) => item._id.toString() === props.project?._id.toString());
  return test ? "bg-green-500" : "bg-red-500";
});

const color =
  props.project.status === "Pridavimas"
    ? "bg-lime-400"
    : props.project.status === "Netinkamas"
    ? "bg-red-600"
    : props.project.status === "Tinkamas"
    ? "bg-pink-400"
    : props.project.status === "Nepatvirtintas"
    ? "bg-orange-300"
    : props.project.status === "Patvirtintas"
    ? "bg-green-400 "
    : props.project.status === "Betonuojama"
    ? "bg-emerald-400"
    : props.project.status === "Gaminama"
    ? "bg-teal-400"
    : props.project.status === "Montuojama"
    ? "bg-indigo-400"
    : props.project.status === "Laukiam Vartų"
    ? "bg-blue-400"
    : props.project.status === "Vartai Sumontuoti"
    ? "bg-violet-400"
    : props.project.status === "Apmokėjimas"
    ? "bg-fuchsia-400"
    : props.project.status === "Baigtas"
    ? "bg-stone-400"
    : "bg-yellow-400";

const statusHandler = async (value: string) => {
  const requestData = { _id: props.project._id, value };

  const response: any = await request.patch("updateProjectStatus", requestData);
  if (response.success) {
    useProjects.updateStatus(props.project._id, value);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div
    class="flex flex-wrap border-b items-center justify-center xl:justify-start border-red-full gap-2 pb-4 w-full"
  >
    <div class="font-semibold text-xl w-12">{{ length - index }}</div>
    <BaseInfoField :name="props.project?.orderNumber" width="w-24" />
    <div class="relative flex-1">
      <div
        v-if="props.project.gates?.length > 0 && props.project.status !== 'Nepatvirtintas'"
        class="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500"
        :class="gateOrdered"
      ></div>
      <BaseInfoField :name="props.project?.client?.address" width="w-full" />
    </div>

    <div class="relative">
      <div
        v-if="props.project.advance"
        class="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500"
      ></div>
      <BaseInfoField
        :name="
          props.project?.discount
            ? props.project?.priceWithDiscount + '€'
            : props.project?.priceVAT + ' €'
        "
        width="w-24"
      />
    </div>

    <BaseInfoField :name="props.project?.client?.phone" width="w-32" :tel="true" />
    <BaseInfoField :name="props.project?.client?.email" width="w-80 " :email="true" />
    <div class="relative">
      <BaseSelectField
        :values="useSettings.selectValues.status"
        id="orderStatus"
        :defaultValue="props.project?.status"
        width="w-48"
        @onChange="(value: string) => statusHandler(value)
              "
        :class="color"
      />

      <div
        v-if="props.project?.status === 'Nepatvirtintas' && time"
        class="absolute top-1.5 right-7 flex rounded-full w-7 h-7 shadow-md items-center justify-center font-medium"
        :class="time < 3 ? 'bg-red-600' : time < 10 ? 'bg-red-400' : ' bg-inherit'"
      >
        {{ time }}
      </div>
    </div>
    <div
      class="relative hover:bg-red-full p-2 rounded-lg hover:cursor-pointer"
      :class="open && 'bg-red-full'"
      @click="open = !open"
    >
      <NuxtImg
        src="/icons/menu.svg"
        width="16"
        height="16"
        decoding="auto"
        loading="lazy"
        :ismap="true"
      />
      <HomeSubmenu v-if="open" :location="props.location" :_id="props.project._id" />
    </div>
  </div>
</template>
<style scoped></style>
