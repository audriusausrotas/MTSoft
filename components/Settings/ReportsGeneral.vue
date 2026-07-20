<script setup lang="ts">
import type { ReportsGeneral } from "~/data/interfaces";

const settingStore = useSettingsStore();
const { setError, setSuccess } = useCustomError();

const isDirty = ref(false);

const saveHandler = async () => {
  const requestData: ReportsGeneral = {
    ...settingStore.reportsGeneral,
  };

  const response: any = await request.patch("updateReportsGeneral", requestData);
  if (response.success) {
    !useSocketStore().connected && settingStore.addReportsGeneral(response.data);
    isDirty.value = false;
    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

watch(
  () => settingStore.reportsGeneral,
  () => {
    isDirty.value = true;
  },
  { deep: true },
);
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      class="grid grid-cols-3 divide-y divide-x border-r border-b divide-dark-light border-dark-light"
    >
      <div class="p-2 border-l border-t font-medium text-lg bg-gray-100 border-dark-light">
        Pavadinimas
      </div>
      <div class="p-2 font-medium text-lg bg-gray-100">Pirma pamaina</div>
      <div class="p-2 font-medium text-lg bg-gray-100">Antra pamaina</div>
      <div class="p-2 font-medium">Darbo laiko pradžia</div>
      <div>
        <input v-model="settingStore.reportsGeneral.workStart1" type="time" class="p-2" />
      </div>
      <div>
        <input v-model="settingStore.reportsGeneral.workStart2" type="time" class="p-2" />
      </div>

      <div class="p-2 font-medium">Darbo laiko pabaiga</div>
      <div>
        <input v-model="settingStore.reportsGeneral.workEnd1" type="time" class="p-2" />
      </div>
      <div>
        <input v-model="settingStore.reportsGeneral.workEnd2" type="time" class="p-2" />
      </div>

      <div class="p-2 font-medium">Pjovimo staklių tikslas</div>
      <div>
        <input v-model.number="settingStore.reportsGeneral.cutGoal1" type="number" class="p-2" />
      </div>
      <div>
        <input v-model.number="settingStore.reportsGeneral.cutGoal2" type="number" class="p-2" />
      </div>

      <div class="p-2 font-medium">Lenkimo staklių 1 tikslas</div>
      <div>
        <input v-model.number="settingStore.reportsGeneral.bendGoal1M1" type="number" class="p-2" />
      </div>
      <div>
        <input v-model.number="settingStore.reportsGeneral.bendGoal2M1" type="number" class="p-2" />
      </div>

      <div class="p-2 font-medium">Lenkimo staklių 2 tikslas</div>
      <div>
        <input v-model.number="settingStore.reportsGeneral.bendGoal1M2" type="number" class="p-2" />
      </div>
      <div>
        <input v-model.number="settingStore.reportsGeneral.bendGoal2M2" type="number" class="p-2" />
      </div>

      <div class="p-2 font-medium">Skylučių mušimo staklių tikslas</div>
      <div>
        <input v-model.number="settingStore.reportsGeneral.holesGoal1" type="number" class="p-2" />
      </div>
      <div>
        <input v-model.number="settingStore.reportsGeneral.holesGoal2" type="number" class="p-2" />
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div class="grid border-l border-dark-light grid-cols-3">
        <div class="p-2 border-y border-dark-light font-medium">Skylučių mušimo indeksas</div>
        <div class="p-2 border border-dark-light">
          <input v-model.number="settingStore.reportsGeneral.holesIndex" type="number" />
        </div>
        <div></div>

        <div class="p-2 border-b border-dark-light font-medium">Gamybos savikaina</div>
        <div class="p-2 border-x border-b border-dark-light flex justify-between">
          <input v-model.number="settingStore.reportsGeneral.bendCost" type="number" />
          €
        </div>
        <div></div>
        <div class="p-2 border-b border-dark-light font-medium">Skylučių mušimo savikaina</div>
        <div class="p-2 border-x border-b border-dark-light flex justify-between">
          <input v-model.number="settingStore.reportsGeneral.holesCost" type="number" />
          €
        </div>
        <div></div>
        <div class="p-2 border-b border-dark-light font-medium">Defektų procentas</div>
        <div class="p-2 border-x border-b border-dark-light flex justify-between">
          <input v-model.number="settingStore.reportsGeneral.defectPercentage" type="number" />
          %
        </div>
        <div></div>
        <div class="p-2 border-b border-dark-light font-medium">Savikainos tikslas</div>
        <div class="p-2 border-x border-b border-dark-light flex justify-between">
          <input v-model.number="settingStore.reportsGeneral.costTarget" type="number" />
          €
        </div>
        <div></div>
      </div>
    </div>
    <BaseButton v-if="isDirty" name="išsaugoti" @click="saveHandler" />
  </div>
</template>
