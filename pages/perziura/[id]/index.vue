<script setup lang="ts">
import { status } from "~/data/selectFieldData";
definePageMeta({
  layout: "preview",
} as any);

const route = useRoute();
const { setError, setIsError } = useError();
const useProjects = useProjectsStore();
const useGates = useGateStore();
const useUsers = useUserStore();
const useGamyba = useGamybaStore()

const allUsers = useUsers.users.map((item) => item.username);
const isLoading = ref<boolean>(false);
const isOpen = ref<boolean>(false);
const open = ref<boolean>(false);
const offer = useProjects.projects.find((item) => item._id === route.params.id);
const gateOrdered = ref(false);
const advance = ref<number>(0);

const statusHandler = async (value: string) => {
  const data: any = await $fetch("/api/project", {
    method: "patch",
    body: { _id: offer!._id, value },
  });
  if (data.success) {
    useProjects.updateStatus(data.data);
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};

const sendEmailHandler = async () => {
  isLoading.value = true;
  const data: any = await $fetch("/api/mail", {
    method: "post",
    body: { to: offer?.client.email, link: offer?._id },
  });
  if (data.success) {
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
  isLoading.value = false;
};

const gateOrderHadnler = async (name: string): Promise<void> => {
  isLoading.value = true;
  const data: any = await $fetch("/api/gates", {
    method: "post",
    body: { _id: offer?._id, value: name },
  });
  if (data.success) {
    useGates.addGate(data.data, name);
    console.log(name)
    let sendTo
    if (name === "Vartonas") {
      sendTo = useUsers.users.find(item => item.accountType === "Vartonas")
    }
    if (name === "Gigasta") {
      sendTo = useUsers.users.find(item => item.accountType === "Gigasta")
    }

    const data2: any = await $fetch("/api/mail", {
      method: "put",
      body: { to: sendTo?.email, message: `Turi naują užsakymą "${data.data.client.address}"`, title: "Naujas užsakymas" },
    });
    if (data2.success) {
      setIsError(false);
      setError(data2.message);
    } else {
      setError(data2.message);
    }

    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
  isLoading.value = false;
  isOpen.value = false;
};

const gateCancelHadnler = async (): Promise<void> => {
  isLoading.value = true;
  const data: any = await $fetch("/api/gates", {
    method: "delete",
    body: { _id: offer?._id },
  });
  if (data.success) {
    useGates.removeGates(offer!._id);
    gateOrdered.value = false;
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
  isLoading.value = false;
};

const cancelHandler = () => {
  advance.value = 0
  open.value = false
}

const changeCreatorHandler = async (value: string) => {
  const data: any = await $fetch("/api/projectCreator", {
    method: "PATCH",
    body: { _id: offer!._id, value },
  });
  if (data.success) {
    useProjects.changeCreator(data.data);
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
};

const advanceHandler = async () => {
  isLoading.value = true;
  const data: any = await $fetch("/api/advance", {
    method: "post",
    body: { _id: offer!._id, advance: advance.value },
  });
  if (data.success) {
    useProjects.changeAdvance(data.data)
    offer!.advance = advance.value
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
  cancelHandler()
  isLoading.value = false;
}

const orderFinishHandler = async () => {
  const response: any = await $fetch("/api/project", {
    method: "PATCH",
    body: { _id: offer!._id, value: "Baigtas" },
  });
  if (response.success) {
    useProjects.updateStatus(response.data);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }

  const data: any = await $fetch("/api/archive", {
    method: "POST",
    body: { _id: offer!._id },
  } as any);
  if (data.success) {
    useProjects.moveToArchive(offer!);
    setIsError(false);
    setError(data.message);
    navigateTo("/")
  } else {
    setError(data.message);
  }
}

const gamybaHandler = async () => {
  const data: any = await $fetch("/api/gamyba", {
    method: "post",
    body: { _id: offer!._id },
  });
  if (data.success) {
    setIsError(false);
    setError(data.message);
    useGamyba.addGamyba(data.data)
  } else {
    setError(data.message);
  }
}

const montavimasHandler = async () => {
  const data: any = await $fetch("/api/montavimas", {
    method: "post",
    body: { _id: offer!._id },
  });
  if (data.success) {
    setIsError(false);
    setError(data.message);
  } else {
    setError(data.message);
  }
}


const checkGates = () => {
  const allGates = [...useGates.gates.vartonas, ...useGates.gates.gigasta];
  gateOrdered.value = allGates.some(
    (item) => item._id.toString() === offer?._id.toString()
  );
};

checkGates();

const gateExist = offer?.gates.length && offer?.gates.length > 0 && offer?.gates.some(item => item.type !== "Segmentiniai" && item.option !== "Segmentiniai")

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
    <div class="flex gap-4 flex-wrap items-end">



      <BaseButtonWithConfirmation name="išsiūsti pasiūlymą" @onConfirm="sendEmailHandler" :isLoading="isLoading" />

      <div>
        <BaseButton v-if="!open" name="Paliktas avansas" @click="open = !open" />
        <div v-else-if="open" class="flex overflow-hidden border rounded-lg">
          <input placeholder="Avansas" type="number" class="px-2 py-1 outline-none w-36 bg-gray-ultra-light"
            v-model="advance" :autofocus="open" @keyup.enter="advanceHandler" />
          <button class="w-12 text-white bg-dark-full hover:bg-red-full hover:cursor-pointer" @click="advanceHandler">
            OK
          </button>

          <button class="w-12 text-white border-l bg-dark-full hover:bg-red-full hover:cursor-pointer"
            @click="cancelHandler">
            X
          </button>
        </div>
      </div>

      <div v-if="gateExist">
        <BaseButton v-if="gateOrdered" name="Atšaukti vartų užsakymą" @click="gateCancelHadnler" />
        <BaseButton v-else-if="!gateOrdered && !isOpen" name="Užsakyti vartus" @click="isOpen = true"
          :isLoading="isLoading" />
        <div v-else-if="!gateOrdered && isOpen"
          class="flex items-center justify-center h-10 w-60 capitalize transition-colors rounded-lg shadow-sm divide-x divide-red-full overflow-hidden">
          <button @click="gateOrderHadnler('Vartonas')"
            class="bg-dark-full text-white flex-1 px-4 py-2 hover:bg-red-full">
            Vartonas
          </button>
          <button @click="gateOrderHadnler('Gigasta')"
            class="bg-dark-full text-white flex-1 px-4 py-2 hover:bg-red-full">
            Gigasta
          </button>
        </div>
      </div>
      <BaseButtonWithConfirmation name="Į gamybą" @onConfirm="gamybaHandler" :isLoading="isLoading" />
      <BaseButtonWithConfirmation name="Į montavimą" @onConfirm="montavimasHandler" :isLoading="isLoading" />
      <BaseButtonWithConfirmation name="Baigti užsakymą" @onConfirm="orderFinishHandler" :isLoading="isLoading" />

    </div>
    <div class="flex gap-4">
      <BaseSelectField :values="status" id="orderStatus" :defaultValue="offer?.status" label="Statusas" width="w-40"
        @onChange="(value: string) => statusHandler(value)
        " />
      <BaseSelectField :values="allUsers" id="changeCreator" :defaultValue="offer?.creator.username"
        label="Atsakingas asmuo" width="w-40" @onChange="(value: string) => changeCreatorHandler(value)
        " />
      <BaseInput label="Avansas" width="w-40" :name="offer?.advance + ' €'" :disable="true" />
    </div>
    <PreviewClient :offer="offer" />
    <ResultTotalElement :results="offer" />
    <previewTrello :offer="offer" :hidePrices="false" />



  </div>
</template>
