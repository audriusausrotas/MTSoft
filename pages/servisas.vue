<script setup lang="ts">
import { ref, watch } from "vue";

definePageMeta({
  layout: false,
});

const input = ref<string>("");
const data = ref<any>([]);
let timeout: ReturnType<typeof setTimeout> | null = null;

const searchHandler = async (value: string) => {
  if (timeout) clearTimeout(timeout);

  timeout = setTimeout(async () => {
    if (value.length < 3) {
      data.value = [];
      return;
    }

    const options: any = {
      method: "GET",
      credentials: "include",
    };
    const response: any = await $fetch(`https://mtsoft.lt/serviceSearch?q=${value}`, options);
    data.value = response.data || [];
  }, 250);
};

function isWithinTwoYears(dateString: string): boolean {
  const givenDate = new Date(dateString);
  const today = new Date();

  const diffInMilliseconds = today.getTime() - givenDate.getTime();

  const diffInYears = diffInMilliseconds / (1000 * 60 * 60 * 24 * 365);

  return diffInYears <= 2;
}

watch(input, searchHandler);
</script>

<template>
  <div class="flex flex-col gap-10 pt-20 items-center">
    <BaseInput
      :name="input"
      @onChange="(value) => (input = value)"
      variant="light"
      placeholder="Paieška"
      width="w-96"
    >
      <NuxtImg
        src="/icons/search.svg"
        width="14"
        height="14"
        alt="search icon"
        decoding="auto"
        loading="lazy"
        :ismap="true"
    /></BaseInput>

    <div v-if="data.length" class="flex flex-col">
      <div class="flex border-b-2 border-black mb-1 px-2 font-medium">
        <p class="w-8">Nr</p>
        <p class="w-96">Adresas</p>
        <p class="w-32">Užbaigimo data</p>
      </div>
      <div class="flex flex-col">
        <div v-for="(item, index) in data" :key="item._id">
          <div class="flex border-b border-black items-center px-2 py-1">
            <p class="w-8">{{ index + 1 }}</p>
            <p class="w-96">{{ item.client.address }}</p>
            <div class="w-32 flex items-center justify-center gap-2">
              <p class="">
                {{ item.dateExparation.slice(0, 10) }}
              </p>
              <span
                class="p-1 rounded-full"
                :class="isWithinTwoYears(item.dateExparation) ? 'bg-green-500' : 'bg-red-500'"
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
