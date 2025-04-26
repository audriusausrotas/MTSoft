<script setup lang="ts">
import type { Version, Comment } from "~/data/interfaces";
const { setError, setIsError } = useError();
const installationStore = useInstallationStore();
const projectsStore = useProjectsStore();
const settingsStore = useSettingsStore();
const productionStore = useProductionStore();
const gateStore = useGateStore();
const userStore = useUserStore();
const route = useRoute();

const offer = computed(() => projectsStore.projects.find((item) => item._id === route.params.id));
const allUsers = userStore.users.map((item) => item.username);

const isOpenInstallation = ref<boolean>(false);
const isOpenAdvance = ref<boolean>(false);
const isOpenGates2 = ref<boolean>(false);
const isOpenGates = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const provider = ref<string>("");
const gateOrdered = ref(false);
const advance = ref<number>(0);

const uploadFiles = async (data: any) => {
  const url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001/api/uploadFiles"
      : "https://mtsoft.lt/api/uploadFiles";

  const response: any = await $fetch(url, {
    method: "POST",
    body: data,
    credentials: "include",
  });

  if (response.success) {
    !useSocketStore().connected &&
      projectsStore.updateFiles(response.data._id, response.data.files);
    setIsError(false);
    setError(response.message);
  } else setError(response.message);
};

const vartonasUsers = userStore.users
  .filter((user) => user.accountType === "Vartonas")
  .map((user) => {
    return user.email;
  });

const workers = userStore.users
  .filter((user) => user.accountType === "Montavimas")
  .map((user) => {
    return user.lastName;
  });

const versions: Version[] | undefined = offer.value?.versions;

const statusHandler = async (value: string) => {
  const requestData = { _id: offer!.value!._id, value };

  const response: any = await request.patch("updateProjectStatus", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      projectsStore.updateProjectField(response.data._id, "status", response.data.status);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const setProvider = (value: string) => {
  provider.value = value;
  isOpenGates.value = false;
  isOpenGates2.value = true;
};

const sendEmailHandler = async () => {
  isLoading.value = true;

  const requestData = {
    to: offer?.value?.client.email,
    link: offer?.value?._id,
  };

  const response: any = await request.post("sendOffer", requestData);

  if (response.success) {
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  isLoading.value = false;
};

const gateOrderHadnler = async (name: string): Promise<void> => {
  isLoading.value = true;

  const requestData = {
    _id: offer?.value?._id,
    value: provider.value,
    manager: name,
  };

  const response: any = await request.post("newOrder", requestData);

  if (response.success) {
    !useSocketStore().connected && gateStore.addGate(response.data);

    const link = `https://mtsoft.lt/vartai/${offer?.value?._id}`;

    const emailRequestData = {
      to: name,
      message: `Turi naują užsakymą "${response.data.client.address}.  Peržiūrėti galite čia: ${link}"`,
      title: "Naujas užsakymas",
    };

    const emailResponse: any = await request.post("sendGateInfo", emailRequestData);

    if (emailResponse.success) {
      setIsError(false);
      setError(emailResponse.message);
    } else {
      setError(emailResponse.message);
    }
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  isLoading.value = false;
  isOpenGates2.value = false;
  provider.value = "";
};

const gateCancelHandler = async (): Promise<void> => {
  isLoading.value = true;

  const response: any = await request.delete(`cancelOrder/${offer?.value?._id}`);

  if (response.success) {
    !useSocketStore().connected && gateStore.removeGates(response.data._id);
    gateOrdered.value = false;
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  isLoading.value = false;
};

const cancelHandler = () => {
  advance.value = 0;
  isOpenAdvance.value = false;
};

const changeCreatorHandler = async (value: string) => {
  const requestData = { _id: offer!.value!._id, value };

  const response: any = await request.patch("changeManager", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      projectsStore.updateProjectField(response.data._id, "creator", response.data.user);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const advanceHandler = async () => {
  isLoading.value = true;

  const requestData = { _id: offer!.value?._id, advance: advance.value };

  const response: any = await request.patch("changeAdvance", requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      projectsStore.updateProjectField(response.data._id, "advance", response.data.value);
      projectsStore.updateProjectField(response.data._id, "status", "Patvirtintas");
    }

    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  cancelHandler();
  isLoading.value = false;
};

const orderFinishHandler = async () => {
  const response: any = await request.patch(`projectFinished/${offer?.value?._id}`);

  if (response.success) {
    if (!useSocketStore().connected) {
      useArchiveStore().addArchive("archive", response.data);
      useProductionStore().deleteProductionOrder(response.data._id);
      useInstallationStore().deleteInstallationOrder(response.data._id);
      projectsStore.deleteProject(response.data._id);
      navigateTo("/");
    }
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const productionHandler = async () => {
  const response: any = await request.post(`newProduction/${offer!.value!._id}`);

  if (response.success) {
    if (!useSocketStore().connected) {
      productionStore.addProduction(response.data);
      projectsStore.updateProjectField(response.data._id, "status", "Gaminama");
    }
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const installationHandler = async (value: string) => {
  const requestData = { _id: offer!.value!._id, worker: value };

  const response: any = await request.post("addInstallation", requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      installationStore.addInstallation(response.data);
      useProjectsStore().updateProjectField(response.data._id, "status", "Montuojama");
    }
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  isOpenInstallation.value = false;
};

const addComment = async (comment: Comment) => {
  const requestData = {
    _id: offer?.value!._id,
    comment,
    username: userStore.user?.username,
  };

  const response: any = await request.post("addProjectComment", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      projectsStore.addComment(response.data._id, response.data.comment);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const deleteComment = async (comment: Comment) => {
  const requestData = {
    _id: offer?.value!._id,
    comment,
  };

  const response: any = await request.delete("deleteProjectComment", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      projectsStore.deleteComment(response.data._id, response.data.comment);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const versionsHandler = (id: string) => {
  window.open("/archyvas/" + id, "_blank");
};

const checkGates = () => {
  gateOrdered.value = gateStore.gates.some(
    (item) => item._id.toString() === offer.value!._id!.toString()
  );
};

checkGates();

const gateExist =
  offer?.value?.gates.length &&
  offer?.value?.gates.length > 0 &&
  offer?.value?.gates.some(
    (item) => item.type !== "Segmentiniai" && item.option !== "Segmentiniai"
  );

watch(
  () => gateStore.gates,
  () => {
    checkGates();
  },
  { deep: true }
);
</script>

<template>
  <div class="flex flex-col gap-12">
    <div v-if="versions && versions.length > 0" class="flex gap-4 w-full flex-wrap">
      <p class="font-medium text-xl">Projekto versijos:</p>
      <div
        v-for="(version, index) in versions"
        :key="version.id"
        class="flex gap-4 border rounded-md py-1 px-4 border-dark-full hover:cursor-pointer hover:bg-red-600 hover:text-white hover:border-transparent"
        @click="versionsHandler(version.id)"
      >
        <p>V.{{ index }}</p>
        <p>{{ version.date.slice(0, 10) }}</p>
      </div>
    </div>
    <div class="flex gap-8">
      <div class="flex flex-col gap-4 flex-1">
        <div class="flex gap-4">
          <BaseInput :disable="true" :name="offer?.orderNumber" label="Užsakymo nr" />
          <BaseInput label="Avansas" :name="offer?.advance + ' €'" :disable="true" />
          <BaseInput :disable="true" :name="offer?.client?.username" label="klientas" />
        </div>

        <div class="flex gap-4">
          <BaseInput :disable="true" :name="offer?.client?.address" label="adresas" />
          <a :href="'tel:' + offer?.client?.phone">
            <BaseInput
              :disable="true"
              :name="offer?.client?.phone"
              label="telefono numeris"
              class="pointer-events-none"
            />
          </a>
          <a :href="'mailto:' + offer?.client?.email">
            <BaseInput
              :disable="true"
              :name="offer?.client?.email"
              label="elektroninis pastas"
              class="pointer-events-none print:hidden"
            />
          </a>
        </div>

        <div class="flex gap-4">
          <BaseButtonWithConfirmation
            name="išsiūsti pasiūlymą"
            @onConfirm="sendEmailHandler"
            :isLoading="isLoading"
          />
          <div>
            <BaseButton
              v-if="!isOpenAdvance"
              name="Paliktas avansas"
              @click="isOpenAdvance = !isOpenAdvance"
            />
            <div v-else-if="isOpenAdvance" class="flex overflow-hidden border rounded-lg">
              <input
                placeholder="Avansas"
                type="number"
                class="px-2 py-1 outline-none w-36 bg-gray-ultra-light"
                v-model="advance"
                :autofocus="isOpenAdvance"
                @keyup.enter="advanceHandler"
              />
              <button
                class="w-12 text-white bg-dark-full hover:bg-red-full hover:cursor-pointer"
                @click="advanceHandler"
              >
                OK
              </button>

              <button
                class="w-12 text-white border-l bg-dark-full hover:bg-red-full hover:cursor-pointer"
                @click="cancelHandler"
              >
                X
              </button>
            </div>
          </div>
          <BaseUploadButton @upload="uploadFiles" :_id="offer?._id" category="projects" />
        </div>

        <div class="flex gap-4">
          <BaseButtonWithConfirmation
            name="Į gamybą"
            @onConfirm="productionHandler"
            :isLoading="isLoading"
          />
          <div>
            <BaseButton
              v-if="!isOpenInstallation"
              name="Į montavimą"
              @click="isOpenInstallation = true"
              :isLoading="isLoading"
            />
            <BaseSelectField
              v-else
              :values="workers"
              id="workersList"
              defaultValue="Pasirinkti montuotoją"
              width="w-60"
              @onChange="(value: string) => installationHandler(value)
                "
            />
          </div>
          <BaseButtonWithConfirmation
            name="Baigti užsakymą"
            @onConfirm="orderFinishHandler"
            :isLoading="isLoading"
          />
        </div>

        <div class="flex gap-4 items-end">
          <BaseSelectField
            :values="settingsStore.selectValues.status"
            id="orderStatus"
            :defaultValue="offer?.status"
            label="Statusas"
            width="w-60"
            @onChange="(value: string) => statusHandler(value)
              "
          />
          <BaseSelectField
            :values="allUsers"
            id="changeCreator"
            width="w-60"
            :defaultValue="offer?.creator.username"
            label="Atsakingas asmuo"
            @onChange="(value: string) => changeCreatorHandler(value)
              "
          />

          <div v-if="gateExist">
            <BaseButton
              v-if="gateOrdered"
              name="Atšaukti vartų užsakymą"
              @click="gateCancelHandler"
            />
            <BaseButton
              v-else-if="!gateOrdered && !isOpenGates && !isOpenGates2"
              name="Užsakyti vartus"
              @click="isOpenGates = true"
              :isLoading="isLoading"
            />
            <div
              v-else-if="!gateOrdered && isOpenGates"
              class="flex items-center justify-center h-10 w-60 capitalize transition-colors rounded-lg shadow-sm divide-x divide-red-full overflow-hidden"
            >
              <button
                @click="setProvider('Vartonas')"
                class="bg-dark-full text-white flex-1 px-4 py-2 hover:bg-red-full"
              >
                Vartonas
              </button>
            </div>
            <BaseSelectField
              v-else-if="!gateOrdered && isOpenGates2"
              :values="vartonasUsers"
              id="userSelect"
              defaultValue="Priskirti vartotoja"
              width="w-60"
              @onChange="(value: string) => gateOrderHadnler(value)
                "
            />
          </div>
        </div>
      </div>
      <div class="flex-[2]">
        <BaseGalleryElement :_id="offer?._id" :files="offer?.files" category="projects" />
      </div>
    </div>
    <BaseComment
      :commentsArray="offer?.comments"
      :id="offer?._id"
      @onSave="(value) => addComment(value)"
      @onDelete="(id, comment) => deleteComment(comment)"
    />

    <ResultTotalElement :results="offer" />

    <PreviewMain :offer="offer" />
  </div>
</template>
