<script setup lang="ts">
import type { Project } from "~/data/interfaces";

const { setError, setIsError } = useError();

const projectsStore = useProjectsStore();

const filterUser = ref<string>(useUserStore().user!.username);
const filterStatus = ref<string>("Visi");
const searchQuery = ref<string>("");

const filteredProjects = () => {
  let filtered = [...projectsStore.projects];

  if (searchQuery.value.length > 2) {
    return filtered.filter(
      (project) =>
        project.client.address.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.client.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.client.phone.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.client.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.orderNumber.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (filterUser.value !== "Visi") {
    filtered = filtered.filter((item) =>
      item?.creator?.username.toLowerCase().startsWith(filterUser.value.toLowerCase())
    );
  }

  if (filterStatus.value !== "Visi") {
    filtered = filtered.filter((item) => item.status === filterStatus.value);
  }

  return filtered;
};

const projects = computed(() => {
  const categories = {
    unconfirmed: [] as Project[],
    confirmed: [] as Project[],
    notAccepted: [] as Project[],
    accepted: [] as Project[],
    concreted: [] as Project[],
    inMaking: [] as Project[],
    inWorks: [] as Project[],
    waiting: [] as Project[],
    mounted: [] as Project[],
    done: [] as Project[],
    finished: [] as Project[],
    payment: [] as Project[],
    other: [] as Project[],
  };

  const statusToCategory: Record<string, keyof typeof categories> = {
    Nepatvirtintas: "unconfirmed",
    Patvirtintas: "confirmed",
    Netinkamas: "notAccepted",
    Tinkamas: "accepted",
    Betonuojama: "concreted",
    Gaminama: "inMaking",
    Montuojama: "inWorks",
    "Laukiam Vartų": "waiting",
    "Vartai Sumontuoti": "mounted",
    Pridavimas: "done",
    Apmokėjimas: "payment",
    Baigtas: "finished",
  };

  const allProjects = filteredProjects();

  allProjects.forEach((item: Project) => {
    const category = statusToCategory[item.status] || "other";
    categories[category].push(item);
  });

  return categories;
});

const users = [
  "Visi",
  ...new Set(projectsStore.projects?.map((item) => item.creator.username).filter(Boolean)),
];

const statusFilters = [
  "Visi",
  "Nepatvirtintas",
  "Patvirtintas",
  "Netinkamas",
  "Tinkamas",
  "Betonuojama",
  "Gaminama",
  "Montuojama",
  "Laukiam Vartų",
  "Vartai Sumontuoti",
  "Pridavimas",
  "Apmokėjimas",
  "Baigtas",
];

const changeUserFilter = (userFilter: string) => {
  filterUser.value = userFilter;
};

const changeStatusFilter = (statusFilter: string) => {
  filterStatus.value = statusFilter;
};

const newProjectHandler = () => {
  const resultsStore = useResultsStore();
  const calculationsStore = useCalculationsStore();
  const backupStore = useBackupStore();

  calculationsStore.clearAll();
  resultsStore.clearAll();
  projectsStore.clearSelected();
  backupStore.clearBackup();

  navigateTo("/skaiciuokle");
};

const removeUnconfirmed = async () => {
  const response: any = await request.delete("removeUnconfirmed");
  if (response.success) {
    if (!useSocketStore().connected) {
      useArchiveStore().addArchive("unconfirmed", response.data);
      useProjectsStore().deleteProject(response.data._id);
    }

    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div class="flex flex-col w-full items-center gap-8">
    <div class="flex flex-col gap-4 w-full">
      <div class="flex gap-4 items-end">
        <BaseButton @click="newProjectHandler"> Naujas projektas </BaseButton>
        <BaseButtonWithConfirmation name="laisvas test mygtukas" @onConfirm="removeUnconfirmed" />
        <BaseSelectField
          label="Vartotojas"
          :values="users"
          id="userFilter"
          :defaultValue="filterUser"
          width="w-60"
          @onChange="changeUserFilter"
        />
        <BaseSelectField
          label="Statusas"
          :values="statusFilters"
          id="statusFilter"
          :defaultValue="filterStatus"
          width="w-60"
          @onChange="changeStatusFilter"
        />
      </div>

      <BaseInput
        placeholder="Paieška"
        label="Paieška"
        width="flex-1"
        variant="light"
        @onChange="(value: string) => searchQuery = value"
      >
        <NuxtImg
          src="/icons/search.svg"
          width="14"
          height="14"
          alt="search icon"
          decoding="auto"
          loading="lazy"
          :ismap="true"
        />
      </BaseInput>
    </div>

    <div class="flex flex-col gap-4 w-full">
      <div
        v-if="projects.finished.length"
        class="text-xl font-semibold p-2 bg-gray-400 rounded-lg text-center"
      >
        Baigti
      </div>
      <HomeProject
        v-for="(project, index) in projects.finished"
        :key="project._id"
        :index="index"
        :length="projects.finished.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.notAccepted.length"
        class="text-xl bg-red-600 font-semibold p-2 rounded-lg text-center"
      >
        Netinkami
      </div>
      <HomeProject
        v-for="(project, index) in projects.notAccepted"
        :key="project._id"
        :index="index"
        :length="projects.notAccepted.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.mounted.length"
        class="text-xl font-semibold p-2 bg-violet-400 rounded-lg text-center"
      >
        Vartai sumontuoti
      </div>
      <HomeProject
        v-for="(project, index) in projects.mounted"
        :key="project._id"
        :index="index"
        :length="projects.mounted.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.done.length"
        class="text-xl font-semibold p-2 bg-lime-400 rounded-lg text-center"
      >
        Pridavimas
      </div>
      <HomeProject
        v-for="(project, index) in projects.done"
        :key="project._id"
        :index="index"
        :length="projects.done.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.accepted.length"
        class="text-xl font-semibold p-2 bg-pink-400 rounded-lg text-center"
      >
        Tinkami
      </div>
      <HomeProject
        v-for="(project, index) in projects.accepted"
        :key="project._id"
        :index="index"
        :length="projects.accepted.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.confirmed.length"
        class="text-xl font-semibold p-2 bg-green-400 rounded-lg text-center"
      >
        Patvirtinti
      </div>
      <HomeProject
        v-for="(project, index) in projects.confirmed"
        :key="project._id"
        :index="index"
        :length="projects.confirmed.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.concreted.length"
        class="text-xl font-semibold p-2 bg-emerald-400 rounded-lg text-center"
      >
        Betonuojama
      </div>
      <HomeProject
        v-for="(project, index) in projects.concreted"
        :key="project._id"
        :index="index"
        :length="projects.concreted.length"
        :project="project"
        location="projects"
      />
      <div
        v-if="projects.inMaking.length"
        class="text-xl font-semibold p-2 bg-teal-400 rounded-lg text-center"
      >
        Gaminama
      </div>
      <HomeProject
        v-for="(project, index) in projects.inMaking"
        :key="project._id"
        :index="index"
        :length="projects.inMaking.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.inWorks.length"
        class="text-xl font-semibold p-2 bg-indigo-400 rounded-lg text-center"
      >
        Montuojama
      </div>
      <HomeProject
        v-for="(project, index) in projects.inWorks"
        :key="project._id"
        :index="index"
        :length="projects.inWorks.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.waiting.length"
        class="text-xl font-semibold p-2 bg-blue-400 rounded-lg text-center"
      >
        Laukiam vartų
      </div>
      <HomeProject
        v-for="(project, index) in projects.waiting"
        :key="project._id"
        :index="index"
        :length="projects.waiting.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.unconfirmed.length"
        class="text-xl font-semibold p-2 bg-orange-300 rounded-lg text-center"
      >
        Nepatvirtinti
      </div>
      <HomeProject
        v-for="(project, index) in projects.unconfirmed"
        :key="project._id"
        :index="index"
        :length="projects.unconfirmed.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.payment.length"
        class="text-xl font-semibold p-2 bg-fuchsia-400 rounded-lg text-center"
      >
        Laukiama apmokėjimo
      </div>
      <HomeProject
        v-for="(project, index) in projects.payment"
        :key="project._id"
        :index="index"
        :length="projects.payment.length"
        :project="project"
        location="projects"
      />

      <div
        v-if="projects.other.length"
        class="text-xl font-semibold p-2 bg-yellow-400 rounded-lg text-center"
      >
        Kiti
      </div>
      <HomeProject
        v-for="(project, index) in projects.other"
        :key="project._id"
        :index="index"
        :length="projects.other.length"
        :project="project"
        location="projects"
      />
    </div>
  </div>
</template>
