<script setup lang="ts">
const props = defineProps(["project", "index", "length"]);

const { setError, setIsError } = useError();

const statusValues = [
  "Patvirtintas",
  "Gaminama",
  "Betonuojama",
  "Montuojama",
  "Laukiam Vartų",
  "Vartai Sumontuoti",
];

const colorCompletion = computed(() => {
  if (!props.project?.dates?.dateCompletion) return "bg-green-300";

  const today = new Date();
  const completionDate = new Date(props.project?.dates?.dateCompletion);

  const time = Math.ceil((completionDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return time > 30
    ? "bg-green-300"
    : time > 10
    ? "bg-orange-300"
    : time > 0
    ? "bg-red-300"
    : "bg-red-600 text-white ";
});

const color = computed(() => {
  return props.project.status === "Pridavimas"
    ? "bg-lime-400"
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
    : "bg-yellow-400";
});

const statusHandler = async (value: string) => {
  const requestData = { _id: props.project._id, value };

  const response: any = await request.patch("updateProjectStatus", requestData);
  if (response.success) {
    !useSocketStore().connected &&
      useProjectsStore().updateProjectField(response.data._id, "status", response.data.status);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const previewHandler = () => {
  navigateTo(`/sandelys/${props.project._id}`);
};
</script>

<template>
  <div class="flex flex-wrap items-center justify-center xl:justify-start gap-2 w-full">
    <div class="font-semibold text-xl w-10">
      {{ length - index }}
    </div>

    <BaseInfoField
      :name="props.project?.dates?.dateConfirmed.slice(0, 10) || '--------'"
      width="w-28"
    />
    <BaseInfoField
      :name="props.project?.dates?.dateCompletion.slice(0, 10) || '--------'"
      width="w-28"
      :class="colorCompletion"
    />

    <BaseInfoField :name="props.project?.orderNumber" width="w-24" />
    <BaseInfoField :name="props.project?.client?.address" width="flex-1" />
    <BaseInfoField :name="props.project?.client?.phone" width="w-32" :tel="true" />
    <BaseInfoField :name="props.project?.client?.email" width="w-64  " :email="true" />

    <BaseSelectField
      :values="statusValues"
      id="orderStatus"
      :defaultValue="props.project?.status"
      width="w-48"
      @onChange="(value: string) => statusHandler(value)
              "
      :class="color"
    />

    <NuxtImg
      src="/icons/eye.svg"
      width="24"
      height="24"
      decoding="auto"
      loading="lazy"
      :ismap="true"
      class="hover:cursor-pointer"
      @click="previewHandler"
    />
  </div>
</template>
<style scoped></style>
