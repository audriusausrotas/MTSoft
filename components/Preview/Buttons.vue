divdivdivdivdivdiv

<script setup lang="ts">
const props = defineProps(["offer", "location"]);

const { setError, setIsError } = useError();
const installationStore = useInstallationStore();
const projectsStore = useProjectsStore();
const productionStore = useProductionStore();
const gateStore = useGateStore();
const userStore = useUserStore();

const isOpenInstallation = ref<boolean>(false);
const isOpenGates = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const allUsers = computed(() =>
  userStore.users
    .filter((user) => user.accountType === "Administratorius")
    .map((user) => user.username)
);

const gateUsers = computed(() =>
  userStore.users.filter((user) => user.accountType === "Vartonas").map((user) => user.email)
);

const workers = computed(() =>
  userStore.users.filter((user) => user.accountType === "Montavimas").map((user) => user.lastName)
);

const gateOrdered = computed(() => {
  return gateStore.gates.some((item) => item._id.toString() === props.offer?._id?.toString());
});

const gateExist = computed(() => {
  const gates = props.offer?.gates || [];
  return gates.some((item) => item.type !== "Segmentiniai" && item.option !== "Segmentiniai");
});

const statusValues = [
  "Patvirtintas",
  "Gaminama",
  "Betonuojama",
  "Montuojama",
  "Laukiam Vartų",
  "Vartai Sumontuoti",
];

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

const statusHandler = async (value: string) => {
  const requestData = { _id: props.offer?._id, value };

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

const sendEmailHandler = async () => {
  isLoading.value = true;

  const requestData = {
    to: props.offer?.client.email,
    link: props.offer?._id,
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

const gateOrderHandler = async (name: string): Promise<void> => {
  isLoading.value = true;

  const requestData = {
    _id: props.offer?._id,
    value: provider.value,
    manager: name,
  };

  const response: any = await request.post("newOrder", requestData);

  if (response.success) {
    !useSocketStore().connected && gateStore.addGate(response.data);

    const link = `https://mtsoft.lt/vartai/${props.offer?._id}`;

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
  isOpenGates.value = false;
};

const gateCancelHandler = async (): Promise<void> => {
  isLoading.value = true;

  const response: any = await request.delete(`cancelOrder/${props.offer?._id}`);

  if (response.success) {
    !useSocketStore().connected && gateStore.removeGates(response.data._id);

    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  isLoading.value = false;
};

const changeCreatorHandler = async (value: string) => {
  const requestData = { _id: props.offer?._id, value };

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

  const requestData = { _id: props.offer?._id, advance: advance.value };

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
  const response: any = await request.patch(`projectFinished/${props.offer?._id}`);

  if (response.success) {
    if (!useSocketStore().connected) {
      useArchiveStore().addArchive("archive", response.data);
      productionStore.deleteProductionOrder(response.data._id);
      installationStore.deleteInstallationOrder(response.data._id);
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
  const response: any = await request.post(`newProduction/${props.offer?._id}`);

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
  const requestData = { _id: props.offer?._id, worker: value };

  const response: any = await request.post("addInstallation", requestData);

  if (response.success) {
    if (!useSocketStore().connected) {
      installationStore.addInstallation(response.data);
      projectsStore.updateProjectField(response.data._id, "status", "Montuojama");
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
    _id: props.offer?._id,
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
    _id: props.offer?._id,
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
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-if="props.location === 'projects'" class="flex gap-4">
      <BaseButtonWithConfirmation
        name="išsiūsti pasiūlymą"
        @onConfirm="sendEmailHandler"
        :isLoading="isLoading"
      />

      <BaseButtonWithInput name="Pridėti avansą" @onConfirm="advanceHandler" type="number" />

      <BaseSelectField
        :values="statusValues"
        id="orderStatus"
        :defaultValue="props.offer?.status"
        width="w-60"
        @onChange="(value: string) => statusHandler(value)
              "
      />

      <BaseSelectField
        :values="allUsers"
        id="changeCreator"
        width="w-60"
        :defaultValue="props.offer?.creator.username"
        @onChange="(value: string) => changeCreatorHandler(value)
              "
      />
    </div>

    <div class="flex gap-4 w-full">
      <BaseUploadButton @upload="uploadFiles" :_id="props.offer?._id" category="projects" />

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
        @onConfirm="
          props.location === 'production' ? orderFinishHandler : statusHandler('Pridavimas')
        "
        :isLoading="isLoading"
      />

      <div class="flex gap-4 items-end">
        <div v-if="gateExist">
          <BaseButton
            v-if="gateOrdered"
            name="Atšaukti vartų užsakymą"
            @click="gateCancelHandler"
          />

          <BaseButton
            v-else-if="!gateOrdered && !isOpenGates"
            name="Užsakyti vartus"
            @click="isOpenGates = true"
            :isLoading="isLoading"
          />

          <BaseSelectField
            v-else-if="!gateOrdered && isOpenGates"
            :values="gateUsers"
            id="userSelect"
            defaultValue="Priskirti vartotoja"
            width="w-60"
            @onChange="(value: string) => gateOrderHandler(value)
                "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
