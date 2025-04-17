<script setup lang="ts">
const props = defineProps(["data", "fenceIndex", "index", "_id"]);

const useInstallation = useInstallationStore();

const { setError, setIsError } = useError();

const postoneHandler = async () => {
  const requestData = {
    _id: props._id,
    index: props.fenceIndex,
    measureIndex: props.index,
    value: !props.data.postone,
  };

  const response: any = await request.patch("updateInstallationPostone", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useInstallation.updatePostone(props._id, props.fenceIndex, props.index, !props.data.postone);
    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};

const doneHandler = async () => {
  const requestData = {
    _id: props._id,
    index: props.fenceIndex,
    measureIndex: props.index,
    value: !props.data.done,
  };

  const response: any = await request.patch("updateInstallation", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useInstallation.updateDone(props._id, props.fenceIndex, props.index, !props.data.done);

    setIsError(false);
    setError(response.message);
  } else {
    setError(response.message);
  }
};
</script>

<template>
  <div
    v-if="props.data.laiptas.exist"
    class="border-b border-black w-fit bg-red-500 text-white flex select-none h-8"
  >
    <p class="w-10 flex items-center justify-center h-full border-x border-black">
      {{ props.index + 1 }}
    </p>
    <p class="w-20 flex items-center justify-center h-full border-r border-black">Laiptas</p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">
      {{ props.data.laiptas.direction }}
    </p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">
      {{ props.data.laiptas.value }} cm
    </p>
  </div>

  <div
    v-else-if="props.data.kampas.exist"
    class="border-b border-black w-fit bg-red-500 text-white flex select-none h-8"
  >
    <p class="w-10 flex items-center justify-center h-full border-x border-black">
      {{ props.index + 1 }}
    </p>
    <p class="w-20 flex items-center justify-center h-full border-r border-black">Kampas</p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">
      {{ props.data.kampas.value }}
    </p>
    <p class="w-24 flex items-center justify-center h-full border-r border-black">laipsnių</p>
  </div>

  <div v-else class="w-fit flex select-none border-b-2 border-black">
    <p
      class="w-10 flex items-center justify-center border-x border-black"
      :class="
        props.data.postone
          ? 'bg-red-full text-white'
          : props.data.done
          ? 'bg-green-500'
          : 'bg-white'
      "
    >
      {{ props.index + 1 }}
    </p>
    <div class="flex flex-col">
      <div class="flex h-8 border-b border-black">
        <div
          class="w-20 flex items-center justify-center h-full border-r border-black px-1"
          :class="
            props.data.postone
              ? 'bg-red-full text-white'
              : props.data.done
              ? 'bg-green-500'
              : 'bg-white'
          "
        >
          {{ props.data.length }}
        </div>
        <div
          class="w-24 flex items-center justify-center h-full border-r border-black px-1"
          :class="
            props.data.postone
              ? 'bg-red-full text-white'
              : props.data.done
              ? 'bg-green-500'
              : 'bg-white'
          "
        >
          {{ props.data.elements }}
        </div>
        <div
          class="w-24 flex items-center justify-center h-full border-r border-black px-1"
          :class="
            props.data.postone
              ? 'bg-red-full text-white'
              : props.data.done
              ? 'bg-green-500'
              : 'bg-white'
          "
        >
          {{ props.data.height }}
        </div>
      </div>
      <div class="flex h-8">
        <button
          class="flex flex-1 items-center justify-center h-full border-r border-black w-24 print:hidden hover:bg-green-500"
          :class="
            props.data.done
              ? 'bg-green-500 '
              : props.data.postone
              ? 'bg-red-full text-white'
              : 'bg-green-50'
          "
          @click="doneHandler"
        >
          Sumontuota
        </button>
        <button
          class="flex flex-1 items-center justify-center h-full border-r border-black w-24 print:hidden hover:bg-red-full hover:text-white"
          :class="
            props.data.postone
              ? 'bg-red-full text-white'
              : props.data.done
              ? 'bg-green-500'
              : 'bg-red-50 text-black'
          "
          @click="postoneHandler"
        >
          Nemontuoti
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
