<script setup lang="ts">
const props = defineProps(["work", "index", "hidePrices", "location", "_id"]);

const { setError, setIsError } = useError();

const doneHandler = async (value: boolean) => {
  const requestData = { _id: props?._id, measureIndex: props?.index, value };
  const response: any = await request.patch("workDone", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useProjectsStore().workDone(
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
</script>

<template>
  <div
    class="flex flex-col lg:flex-row border-b-2 print:gap-6 gap-4 items-start lg:gap-6 lg:items-center font-medium print:text-xs print:border-b print:border-gray-full print:even:bg-transparent even:bg-gray-ultra-light px-8 lg:px-2 py-[10px] print:py-2 border-red-full lg:border-none"
  >
    <div class="flex">
      <p class="block lg:hidden font-bold">Nr.:</p>
      <div class="w-6 text-center">{{ props.index + 1 }}</div>
    </div>
    <div class="border lg:hidden w-full"></div>
    <div class="flex-1">
      <p class="block lg:hidden font-bold">Pavadinimas:</p>
      <p>{{ props.work.name }}</p>
    </div>
    <div class="border lg:hidden w-full"></div>
    <div class="flex print:gap-6 gap-6 flex-wrap">
      <div>
        <p class="block lg:hidden font-bold">Kiekis:</p>
        <div class="w-20 gap-2 flex">
          <p>
            {{ props.work.quantity }}
          </p>
          <p>
            {{
              props.work.name.includes("Tvoros montavimas")
                ? "m2"
                : props.work.name.includes("Vartų pamato betonavimas")
                ? "m"
                : "vnt"
            }}
          </p>
        </div>
      </div>

      <div v-if="!props.hidePrices">
        <p class="block lg:hidden font-bold">Savikaina:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props.work.cost }}
          </p>
          <p>€</p>
        </div>
      </div>

      <div v-if="!props.hidePrices">
        <p class="block lg:hidden font-bold">Kaina:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props.work.price }}
          </p>
          <p>€</p>
        </div>
      </div>

      <div v-if="!props.hidePrices">
        <p class="block lg:hidden font-bold">Viso:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props.work.totalPrice }}
          </p>
          <p>€</p>
        </div>
      </div>

      <div v-if="!props.hidePrices">
        <p class="block lg:hidden font-bold">Pelnas:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props.work.profit }}
          </p>
          <p>€</p>
        </div>
      </div>

      <div v-if="!props.hidePrices">
        <p class="block lg:hidden font-bold">Marža:</p>
        <div class="w-20 flex gap-2">
          <p>
            {{ props.work.margin }}
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
            @onChange="doneHandler"
            :checked="work?.done"
            height="h-6"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
