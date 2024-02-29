<script setup lang="ts">
import { useGateStore } from "~/store/gates";
const gates = useGateStore();
if (gates.gates.length === 0) gates.getGates();
</script>

<template>
  <div class="flex flex-col gap-12">
    <div
      v-for="(gate, index) in gates.gates"
      :key="gate._id"
      class="flex flex-col border-b-8 border-red-full"
    >
      <div class="font-semibold text-4xl m-auto">{{ index + 1 }}</div>
      <div
        class="flex justify-between font-semibold border-b border-red-300 py-4"
      >
        <div class="flex flex-col gap-4">
          <h3 class="text-xl">Klento duomenys</h3>
          <BaseInput
            :name="gate.client"
            width="w-96"
            label="klientas"
            :disable="true"
          />
          <BaseInput
            :name="gate.address"
            width="w-96"
            label="adresas"
            :disable="true"
          />
          <BaseInput
            :name="gate.phone"
            width="w-96"
            label="telefonas"
            :disable="true"
          />
        </div>
        <div class="flex flex-col gap-4">
          <h3 class="text-xl">Vadybininko duomenys</h3>
          <BaseInput
            :name="gate.creator.username"
            width="w-96"
            label="atsakingas asmuo"
            :disable="true"
          />
          <BaseInput
            :name="gate.creator.phone"
            width="w-96"
            label="Telefono numeris"
            :disable="true"
          />
          <BaseInput
            :name="gate.creator.email"
            width="w-96"
            label="Elektroninis paštas"
            :disable="true"
          />
        </div>
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
            :name="g.filling"
            width="w-40"
            label="vartu uzpildas"
            :disable="true"
          />

          <BaseInput
            v-if="g.auto"
            :name="g.auto"
            width="w-28"
            label="automatika"
            :disable="true"
          />

          <BaseInput
            v-if="g.direction"
            :name="g.direction"
            width="w-36"
            label=" atidarymo kryptis"
            :disable="true"
          />

          <BaseInput
            v-if="g.lock"
            :name="g.lock"
            width="w-36"
            label="spyna"
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
