<script setup lang="ts">
import { useGateStore } from "~/store/gates";
const gates = useGateStore();
gates.getGates();
</script>

<template>
  <div class="flex flex-col gap-12">
    <div
      v-for="(gate, index) in gates.gates"
      :key="gate._id"
      class="flex flex-col"
    >
      <div class="font-bold text-2xl">Nr {{ index + 1 }}</div>
      <div
        class="flex gap-4 font-semibold text-xl border-b border-red-300 py-4"
      >
        <BaseInput
          :name="gate.client"
          width="w-28"
          label="klientas"
          :disable="true"
        />
        <BaseInput
          :name="gate.address"
          width="w-52"
          label="adresas"
          :disable="true"
        />
        <BaseInput
          :name="gate.phone"
          width="w-36"
          label="telefonas"
          :disable="true"
        />
        <BaseInput
          :name="gate.creator"
          width="w-36"
          label="atsakingas asmuo"
          :disable="true"
        />
      </div>
      <div
        v-for="(g, i) in gate.gates"
        :key="g._id"
        class="flex items-center gap-4 border-b border-red-300"
      >
        <div class="font-bold text-2xl">{{ i + 1 }}</div>
        <div class="flex gap-4 justify-between flex-wrap py-4">
          <BaseInput
            :name="g.type"
            width="w-28"
            label="vartu tipas"
            :disable="true"
          />
          <BaseInput
            :name="g.color"
            width="w-28"
            label="vartu spalva"
            :disable="true"
          />
          <BaseInput
            :name="g.width"
            width="w-28"
            label="vartu ilgis"
            :disable="true"
          />
          <BaseInput
            :name="g.height"
            width="w-28"
            label="vartu aukstis"
            :disable="true"
          />
          <BaseInput
            :name="g.auto"
            width="w-28"
            label="automatika"
            :disable="true"
          />
          <BaseInput
            :name="g.filling"
            width="w-40"
            label="vartu uzpildas"
            :disable="true"
          />
          <div v-if="g.aditional !== ''">
            papildoma informacija: {{ g.aditional }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
