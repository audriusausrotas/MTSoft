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
const isOpen2 = ref<boolean>(false);
const open = ref<boolean>(false);
const offer = useProjects.projects.find((item) => item._id === route.params.id);
const gateOrdered = ref(false);
const advance = ref<number>(0);
const provider = ref<string>("")
const vartonasUsers = useUsers.users.filter(user => user.accountType === "Vartonas").map(user => user.email)
const gigastaUsers = useUsers.users.filter(user =>
  user.accountType === "Gigasta").map(user => user.email)


const statusHandler = async (value: string) => {
  const response: any = await $fetch("/api/project", {
    method: "patch",
    body: { _id: offer!._id, value },
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
  provider.value = value
  isOpen.value = false
  isOpen2.value = true
}

const sendEmailHandler = async () => {
  isLoading.value = true;
  const response: any = await $fetch("/api/mail", {
    method: "post",
    body: { to: offer?.client.email, link: offer?._id },
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
    body: { _id: offer?._id, value: provider.value, manager: name },
  });
  if (response.success) {
    useGates.addGate(response.data, provider.value);

    const emailResponse: any = await $fetch("/api/mail", {
      method: "put",
      body: { to: name, message: `Turi naują užsakymą "${response.data.client.address}"`, title: "Naujas užsakymas" },
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
  isOpen2.value = false;
  provider.value = ""
};

const gateCancelHadnler = async (): Promise<void> => {
  isLoading.value = true;
  const response: any = await $fetch("/api/gates", {
    method: "delete",
    body: { _id: offer?._id },
  });
  if (response.success) {
    useGates.removeGates(offer!._id);
    gateOrdered.value = false;
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
  isLoading.value = false;
};

const cancelHandler = () => {
  advance.value = 0
  open.value = false
}

const changeCreatorHandler = async (value: string) => {
  const response: any = await $fetch("/api/projectCreator", {
    method: "PATCH",
    body: { _id: offer!._id, value },
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
    body: { _id: offer!._id, advance: advance.value },
  });
  if (response.success) {
    useProjects.changeAdvance(response.data)
    offer!.advance = advance.value
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
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

  const archieveResponse: any = await $fetch("/api/archive", {
    method: "POST",
    body: { _id: offer!._id },
  } as any);
  if (archieveResponse.success) {
    useProjects.moveToArchive(offer!);
    setIsError(false);
    setError(archieveResponse.message);
    navigateTo("/")
  } else {
    setError(archieveResponse.message);
  }
}

const gamybaHandler = async () => {
  const response: any = await $fetch("/api/gamyba", {
    method: "post",
    body: { _id: offer!._id },
  });
  if (response.success) {
    setIsError(false);
    setError(response.message);
    useGamyba.addGamyba(response.data)
  } else {
    setError(response.message);
  }
}

const montavimasHandler = async () => {
  const response: any = await $fetch("/api/montavimas", {
    method: "post",
    body: { _id: offer!._id },
  });
  if (response.success) {
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
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
        <BaseButton v-else-if="!gateOrdered && !isOpen && !isOpen2" name="Užsakyti vartus" @click="isOpen = true"
          :isLoading="isLoading" />
        <div v-else-if="!gateOrdered && isOpen"
          class="flex items-center justify-center h-10 w-60 capitalize transition-colors rounded-lg shadow-sm divide-x divide-red-full overflow-hidden">
          <button @click="setProvider('Vartonas')" class="bg-dark-full text-white flex-1 px-4 py-2 hover:bg-red-full">
            Vartonas
          </button>
          <button @click="setProvider('Gigasta')" class="bg-dark-full text-white flex-1 px-4 py-2 hover:bg-red-full">
            Gigasta
          </button>
        </div>

        <BaseSelectField v-else-if="!gateOrdered && isOpen2"
          :values="provider === 'Vartonas' ? vartonasUsers : gigastaUsers" id="userSelect"
          defaultValue="Priskirti vartotoja" width="w-60" @onChange="(value: string) => gateOrderHadnler(value)
        " />

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
