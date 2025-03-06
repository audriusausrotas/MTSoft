<script setup lang="ts">
import type { Photo, Version } from "~/data/interfaces";
const route = useRoute();
const { setError, setIsError } = useError();
const useMontavimas = useMontavimasStore();
const useProjects = useProjectsStore();
const useSettings = useSettingsStore();
const useGamyba = useGamybaStore();
const useGates = useGateStore();
const useUsers = useUserStore();

const allUsers = useUsers.users.map((item) => {
  return item.username;
});
const isLoading = ref<boolean>(false);
const isOpenGates = ref<boolean>(false);
const isOpenGates2 = ref<boolean>(false);
const isOpenMontavimas = ref<boolean>(false);
const isOpenAdvance = ref<boolean>(false);
const offer = computed(() => useProjects.projects.find((item) => item._id === route.params.id));
const gateOrdered = ref(false);
const advance = ref<number>(0);
const provider = ref<string>("");

const vartonasUsers = useUsers.users
  .filter((user) => user.accountType === "Vartonas")
  .map((user) => {
    return user.email;
  });

const gigastaUsers = useUsers.users
  .filter((user) => user.accountType === "Gigasta")
  .map((user) => {
    return user.email;
  });

const workers = useUsers.users
  .filter((user) => user.accountType === "Montavimas")
  .map((user) => {
    return user.lastName;
  });

const versions: Version[] | undefined = offer.value?.versions;

const statusHandler = async (value: string) => {
  const response: any = await $fetch("/api/project", {
    method: "patch",
    body: { _id: offer!.value!._id, value },
  });
  if (response.success) {
    useProjects.updateStatus(response.data);
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
  const response: any = await $fetch("/api/mail", {
    method: "post",
    body: { to: offer?.value?.client.email, link: offer?.value?._id },
  });
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
  const response: any = await $fetch("/api/gates", {
    method: "post",
    body: { _id: offer?.value?._id, value: provider.value, manager: name },
  });
  if (response.success) {
    useGates.addGate(response.data);

    const link = `https://mtsoft.lt/vartai/${offer?.value?._id}`;

    const emailResponse: any = await $fetch("/api/mail", {
      method: "put",
      body: {
        to: name,
        message: `Turi naują užsakymą "${response.data.client.address}.  Peržiūrėti galite čia: ${link}"`,
        title: "Naujas užsakymas",
      },
    });
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
  const response: any = await $fetch("/api/gates", {
    method: "delete",
    body: { _id: offer?.value?._id },
  });
  if (response.success) {
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
  const response: any = await $fetch("/api/projectCreator", {
    method: "PATCH",
    body: { _id: offer!.value!._id, value },
  });
  if (response.success) {
    useProjects.changeCreator(response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const advanceHandler = async () => {
  isLoading.value = true;
  const response: any = await $fetch("/api/advance", {
    method: "post",
    body: { _id: offer!.value?._id, advance: advance.value },
  });
  if (response.success) {
    useProjects.changeAdvance(response.data);
    offer!.value!.advance = advance.value;
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  cancelHandler();
  isLoading.value = false;
};

const orderFinishHandler = async () => {
  const response: any = await $fetch("/api/project", {
    method: "PATCH",
    body: { _id: offer!.value!._id, value: "Baigtas" },
  });
  if (response.success) {
    useProjects.updateStatus(response.data);
    const archieveResponse: any = await $fetch("/api/archive", {
      method: "POST",
      body: { _id: offer!.value!._id },
    });
    if (archieveResponse.success) {
      offer?.value?._id && useProjects.deleteProject(offer.value._id);
      setIsError(false);
      setError(archieveResponse.message);
      navigateTo("/");
    } else {
      setError(archieveResponse.message);
    }
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const gamybaHandler = async () => {
  const response: any = await $fetch("/api/gamyba", {
    method: "post",
    body: { _id: offer!.value!._id },
  });
  if (response.success) {
    setIsError(false);
    setError(response.message);
    useGamyba.addGamyba(response.data);
  } else {
    setError(response.message);
  }
};

const montavimasHandler = async (value: string) => {
  const response: any = await $fetch("/api/montavimas", {
    method: "post",
    body: { _id: offer!.value!._id, worker: value },
  });
  if (response.success) {
    useMontavimas.addMontavimas(response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  isOpenMontavimas.value = false;
};

const photosHandler = async (photo: Photo) => {
  const response: any = await $fetch("/api/uploadPhotos", {
    method: "post",
    body: { photo, category: "projects", _id: offer!.value!._id },
  });
  if (response.success) {
    offer?.value?._id && useProjects.addPhoto(offer!.value!._id, photo);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const addComment = async (value: any) => {
  const response: any = await $fetch("/api/projectComments", {
    method: "post",
    body: {
      _id: offer?.value!._id,
      comment: value,
      username: useUsers.user?.username,
    },
  });
  if (response.success) {
    useProjects.updateStatus(response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const deleteComment = async (value: any) => {
  const response: any = await $fetch("/api/projectComments", {
    method: "delete",
    body: {
      _id: offer?.value!._id,
      comment: value,
    },
  });
  if (response.success) {
    useProjects.updateStatus(response.data);
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
  gateOrdered.value = useGates.gates.some(
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
  useGates.gates,
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
          <BaseUpload @onSuccess="photosHandler" />
        </div>

        <div class="flex gap-4">
          <BaseButtonWithConfirmation
            name="Į gamybą"
            @onConfirm="gamybaHandler"
            :isLoading="isLoading"
          />
          <div>
            <BaseButton
              v-if="!isOpenMontavimas"
              name="Į montavimą"
              @click="isOpenMontavimas = true"
              :isLoading="isLoading"
            />
            <BaseSelectField
              v-else
              :values="workers"
              id="workersList"
              defaultValue="Pasirinkti montuotoją"
              width="w-60"
              @onChange="(value: string) => montavimasHandler(value)
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
            :values="useSettings.selectValues.status"
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
              <button
                @click="setProvider('Gigasta')"
                class="bg-dark-full text-white flex-1 px-4 py-2 hover:bg-red-full"
              >
                Gigasta
              </button>
            </div>
            <BaseSelectField
              v-else-if="!gateOrdered && isOpenGates2"
              :values="provider === 'Vartonas' ? vartonasUsers : gigastaUsers"
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
