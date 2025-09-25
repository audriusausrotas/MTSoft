<script setup lang="ts">
const props = defineProps(["gate", "index"]);
</script>

<template>
  <div
    v-if="gate.option !== 'Segmentiniai'"
    class="flex gap-4 flex-wrap justify-center items-center"
  >
    <div class="font-medium text-xl">{{ props.index + 1 }}</div>
    <BaseInput
      :name="gate.name"
      width="w-28"
      label="vartų tipas"
      :disable="true"
    />

    <BaseInput
      :name="gate.color"
      width="w-28"
      label="vartų spalva"
      :disable="true"
    />

    <BaseInput
      :name="gate.width"
      width="w-28"
      label="vartų ilgis"
      :disable="true"
    />

    <BaseInput
      :name="gate.height"
      width="w-28"
      label="vartų aukštis"
      :disable="true"
    />

    <BaseInput
      :name="gate.filling"
      width="w-40"
      label="vartų užpildas"
      :disable="true"
    />

    <BaseInput
      v-if="gate.auto"
      :name="gate.auto"
      width="w-28"
      label="automatika"
      :disable="true"
    />

    <BaseInput
      v-if="gate.direction"
      :name="gate.direction"
      width="w-36"
      label=" atidarymo kryptis"
      :disable="true"
    />

    <BaseInput
      v-if="gate.lock"
      :name="gate.lock"
      width="w-40"
      label="spyna"
      :disable="true"
    />
  </div>
  <div v-if="gate.comment !== ''" class="flex flex-col text-lg pl-7">
    <p class="font-bold">papildoma informacija:</p>
    <p>
      {{ gate.comment }}
    </p>
  </div>
</template>
<style scoped></style>
