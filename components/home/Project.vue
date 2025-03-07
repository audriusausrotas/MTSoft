<script setup lang="ts">
const props = defineProps(["project", "index", "length", "location"]);
const useProjects = useProjectsStore();
const useArchives = useArchivesStore();
const useResults = useResultsStore();
const useCalculations = useCalculationsStore();
const useSettings = useSettingsStore();
const useGates = useGateStore();
const useBackup = useBackupStore();
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
    : props.project.status === "Baigtas"
    ? "bg-stone-400"
    : "bg-yellow-400";

const deleteHandler = async (): Promise<void> => {
  const confirmed = confirm("Ar tikrai norite ištrinti projektą?");
  if (!confirmed) return;

  const response: any = await $fetch(
    props.location === "projects" ? "/api/project" : "/api/archive",
    {
      method: "delete",
      body: { _id: props.project._id, location: props.location },
    }
  );
  if (response.success) {
    props.location === "projects"
      ? useProjects.deleteProject(props.project._id)
      : useArchives.deleteArchive(props.project._id, props.location);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const editHandler = async () => {
  useCalculations.clearAll();
  useResults.clearAll();
  useProjects.clearSelected();
  useBackup.clearBackup();

  const response: any = await $fetch("/api/projectSingle", {
    method: "post",
    body: { _id: props.project._id },
  });
  if (response.success) {
    useProjects.addProject(response.data);
  }

  useCalculations.setProject({
    client: response.data.client,
    fenceMeasures: response.data.fenceMeasures,
    retail: response.data.retail,
  });
  useResults.setProject(response.data);
  useBackup.addBackup(response.data.results, response.data.works);
  useProjects.setSelectedProject(response.data._id);
  navigateTo("/skaiciuokle");
};

const linkHandler = () => {
  navigator.clipboard
    .writeText("https://mtsoft.lt/pasiulymas/" + props.project._id)
    .then(() => {
      setIsError(false);
      setError("Nuoroda nukopijuota");
    })
    .catch((error) => {
      setError("Klaida: " + error);
    });
};

const previewHandler = () => {
  navigateTo("/perziura/" + props.project._id);
};

const openInNewHandler = () => {
  if (props.location === "projects") {
    window.open("https://mtsoft.lt/pasiulymas/" + props.project._id, "_blank");
  } else {
    window.open("/archyvas/" + props.project._id, "_blank");
  }
};

const copyHandler = async () => {
  const data: any = await $fetch("/api/project", {
    method: "post",
    body: { _id: props.project._id },
  });
  if (data.success) {
    useProjects.copyProject(data.data);
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};

const archiveHandler = async () => {
  const data: any = await $fetch("/api/archive", {
    method: props.location === "projects" ? "post" : "patch",
    body: { _id: props.project._id, location: props.location },
  } as any);
  if (data.success) {
    if (props.location === "projects") {
      useProjects.deleteProject(props.project._id);
    } else {
      useArchives.deleteArchive(props.project._id, props.location);
    }
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};

const extendHandler = async () => {
  const data: any = await $fetch("/api/projectExtend", {
    method: "post",
    body: { _id: props.project._id },
  } as any);
  if (data.success) {
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};

const unconfirmedHandler = async () => {
  const data: any = await $fetch("/api/unconfirmed", {
    method: "post",
    body: { _id: props.project._id },
  });

  if (data.success) {
    useProjects.deleteProject(props.project._id);

    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};

const statusHandler = async (value: string) => {
  const response: any = await $fetch("/api/project", {
    method: "patch",
    body: { _id: props.project._id, value },
  });
  if (response.success) {
    console.log(response.data.status);
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
    class="flex flex-wrap border-b items-center justify-center xl:justify-start border-red-full gap-2 pb-4"
  >
    <div class="font-semibold text-xl w-7">{{ length - index }}</div>
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
        v-if="props.project?.status === 'Nepatvirtintas'"
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
      <div
        v-if="open"
        class="absolute z-40 flex flex-col top-8 right-0 bg-white border select-none border-dark-light rounded-lg shadow-lg overflow-hidden w-48"
        :class="props.location !== 'projects' ? 'h-28' : 'h-64'"
      >
        <div
          @click="openInNewHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
        >
          <NuxtImg src="/icons/document-forward.svg" alt="edit button" width="20" height="20" />
          <p>Atidaryti pasiūlymą</p>
        </div>

        <div
          v-if="props.location === 'projects'"
          @click="previewHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
        >
          <NuxtImg src="/icons/eye.svg" alt="eye button" width="20" height="20" />
          <p>Peržiūrėti</p>
        </div>

        <div
          v-if="props.location === 'projects'"
          @click="linkHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
        >
          <NuxtImg src="/icons/link.svg" alt="link button" width="20" height="20" />
          <p>Kopijuoti nuorodą</p>
        </div>

        <div
          v-if="props.location === 'projects'"
          @click="editHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
        >
          <NuxtImg src="/icons/edit-2.svg" alt="edit button" width="20" height="20" />
          <p>Redaguoti</p>
        </div>

        <div
          v-if="props.location === 'projects'"
          @click="copyHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
        >
          <NuxtImg src="/icons/pageflip.svg" alt="edit button" width="20" height="20" />
          <p>Kopijuoti projektą</p>
        </div>

        <div
          v-if="props.location === 'projects'"
          @click="extendHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
        >
          <NuxtImg src="/icons/clock.svg" alt="edit button" width="20" height="20" />
          <p>Pratęsti galiojimą</p>
        </div>

        <div
          @click="archiveHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
        >
          <NuxtImg src="/icons/archive-tick.svg" alt="archive button" width="20" height="20" />
          <p v-if="props.location === 'projects'">Archyvuoti</p>
          <p v-else>Sugrąžinti</p>
        </div>

        <div
          v-if="props.location === 'projects'"
          @click="unconfirmedHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
        >
          <NuxtImg src="/icons/archive-book.svg" alt="archive button" width="20" height="20" />
          <p>Nepatvirtintas</p>
        </div>

        <div
          @click="deleteHandler"
          class="hover:bg-red-full h-full flex gap-2 items-center px-2 hover:cursor-pointer hover:text-white"
        >
          <NuxtImg src="/icons/delete.svg" alt="delete button" width="20" height="20" />
          <p>Ištrinti</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
