<script setup lang="ts">
const props = defineProps(["result", "index", "hidePrices", "_id", "showbuttons", "location"]);
const emit = defineEmits(["checked", "unchecked"]);

const { setError, setIsError } = useError();

const measurement = ref<string>("vnt");

if (props.result.type.includes("Apkaustai")) measurement.value = "m";
else if (
  props?.result?.type.includes("Daimond") ||
  props?.result?.type.includes("Plank") ||
  props?.result?.type.includes("Eglė") ||
  props?.result?.type.includes("Žaliuzi")
)
  measurement.value = "m2";
else measurement.value = "vnt";

const deliverHandler = async (value: boolean) => {
  const requestData = { _id: props?._id, measureIndex: props?.index, value };
  const response: any = await request.patch("partsDelivered", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useProjectsStore().partsDelivered(
        response?.data?._id,
        response?.data?.measureIndex,
        response?.data?.value
      );
    setIsError(false);
    setError(response?.message);
  } else {
    setError(response?.message);
  }
};

const orderHandler = async (value: boolean) => {
  const requestData = { _id: props?._id, measureIndex: props?.index, value };
  const response: any = await request.patch("partsOrdered", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useProjectsStore().partsOrdered(
        response?.data?._id,
        response?.data?.measureIndex,
        response?.data?.value
      );
    setIsError(false);
    setError(response?.message);
  } else {
    setError(response?.message);
  }
};

const selectData = (value: boolean) => {
  const data = {
    name: props?.result?.type,
    color: props?.result?.color,
    quantity: props?.result?.quantity,
    measureIndex: props?.index,
  };

  value ? emit("checked", data) : emit("unchecked", data.name);
};
</script>

<template>
  <div
    class="flex w-full flex-col lg:flex-row border-b-2 print:gap-6 gap-4 items-start lg:gap-6 lg:items-center font-medium print:text-xs print:border-b print:border-gray-full print:even:bg-transparent even:bg-gray-ultra-light px-8 lg:px-2 py-[10px] print:py-2 border-red-full lg:border-none"
  >
    <div class="flex">
      <p class="block lg:hidden font-bold">Nr.:</p>
      <div class="w-6 text-center">{{ props?.index + 1 }}</div>
    </div>

    <div v-if="props.showbuttons" class="w-6 items-center">
      <BaseCheckField
        :name="'order' + index"
        @onChange="selectData"
        :checked="props?.result?.delivered"
        height="h-6"
      />
    </div>

    <div class="border lg:hidden w-full"></div>
    <div class="flex-1">
      <p class="block lg:hidden font-bold">Pavadinimas:</p>
      <div class="flex print:gap-4 gap-2 lg:gap-8">
        <span class="w-fit">{{ props?.result?.type }}</span>
        <span v-if="props?.result?.seeThrough">{{ props?.result?.seeThrough }}</span>
        <span
          v-if="
            props?.result?.height &&
            props?.result?.category.toLowerCase() === 'tvoros' &&
            !props?.result?.type.includes('Segmentas')
          "
          >H-{{ props?.result?.height }}</span
        >
        <span v-if="props?.result?.color && !props?.result?.type?.includes('RAL')"
          >RAL {{ props?.result?.color }}</span
        >
        <span v-if="props?.result?.category.toLowerCase() === 'vartai'"
          >plotis: {{ props?.result?.width }} cm
        </span>
      </div>
    </div>
    <div class="border lg:hidden w-full"></div>
    <div class="flex print:gap-6 gap-6 flex-wrap">
      <div>
        <p class="block lg:hidden font-bold">Kiekis:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props?.result?.quantity }}
          </p>
          <p>{{ measurement }}</p>
        </div>
      </div>

      <div v-if="!props?.hidePrices">
        <p class="block lg:hidden font-bold">Savikaina:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props?.result?.cost }}
          </p>
          <p>€</p>
        </div>
      </div>

      <div v-if="!props?.hidePrices">
        <p class="block lg:hidden font-bold">Kaina:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props?.result?.price }}
          </p>
          <p>€</p>
        </div>
      </div>

      <div v-if="!props?.hidePrices">
        <p class="block lg:hidden font-bold">Viso:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props?.result?.totalPrice }}
          </p>
          <p>€</p>
        </div>
      </div>

      <div v-if="!props?.hidePrices">
        <p class="block lg:hidden font-bold">Pelnas:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props?.result?.profit }}
          </p>
          <p>€</p>
        </div>
      </div>

      <div v-if="!props?.hidePrices">
        <p class="block lg:hidden font-bold">Marža:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props?.result?.margin }}
          </p>
          <p>%</p>
        </div>
      </div>

      <div>
        <p class="block lg:hidden font-bold">Užsakyta:</p>
        <div
          class="w-16 items-center"
          :class="props?.location === 'installation' ? 'pointer-events-none ' : ''"
        >
          <BaseCheckField
            :name="'vartai' + index"
            @onChange="orderHandler"
            :checked="result?.ordered"
            height="h-6"
          />
        </div>
      </div>
      <div>
        <p class="block lg:hidden font-bold">Pristatyta:</p>
        <div
          class="w-16 items-center"
          :class="props?.location === 'installation' ? 'pointer-events-none ' : ''"
        >
          <BaseCheckField
            :name="'vartai' + index"
            @onChange="deliverHandler"
            :checked="result?.delivered"
            height="h-6"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
