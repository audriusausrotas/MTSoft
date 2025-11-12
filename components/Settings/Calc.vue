<script setup lang="ts">
import type { Product } from "~/data/interfaces";
const productsStore = useProductsStore();
const settingsStore = useSettingsStore();

const poles = ref<Product[]>([]);
const borders = ref<Product[]>([]);
const holders = ref<Product[]>([]);
const crossbars = ref<Product[]>([]);
const gates = ref<Product[]>([]);
const works = ref<Product[]>([]);
const fences = ref<Product[]>([]);
const other = ref<Product[]>([]);

productsStore?.products?.forEach((item) => {
  switch (item.category.toLowerCase()) {
    case "borteliai":
      borders.value.push(item);
      break;
    case "darbai":
      works.value.push(item);
      break;
    case "laikikliai":
      holders.value.push(item);
      break;
    case "skersiniai":
      crossbars.value.push(item);
      break;
    case "stulpai":
      poles.value.push(item);
      break;
    case "tvoros":
      fences.value.push(item);
      break;
    case "vartai":
      gates.value.push(item);
      break;
    default:
      other.value.push(item);
      break;
  }
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="m-auto font-bold text-2xl mb-4">
      Standartines medžiagos ir darbai
    </p>
    <SettingsCalcElement
      :value="settingsStore.defaultValues.poleMain"
      :data="poles"
      field="poleMain"
      name="Tvoros Stulpas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.poleAlt"
      :data="poles"
      field="poleAlt"
      name="Segmento Stulpas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.gatePoleMain"
      :data="poles"
      field="gatePoleMain"
      name="Stumdomų vartų stulpas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.gatePoleAlt"
      :data="poles"
      field="gatePoleAlt"
      name="Varstonų vartų stulpas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.anchoredPoleMain"
      :data="poles"
      field="anchoredPoleMain"
      name="Ankeriuojamas tvoros stulpas H-1.5"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.anchoredPoleAlt"
      :data="poles"
      field="anchoredPoleAlt"
      name="Ankeriuojamas tvoros stulpas H-2.0"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.anchoredGatePoleMain"
      :data="poles"
      field="anchoredGatePoleMain"
      name="Ankeriuojamas vartų stulpas H-1.5"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.anchoredGatePoleAlt"
      :data="poles"
      field="anchoredGatePoleAlt"
      name="Ankeriuojamas vartų stulpas H-2.0"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.border"
      :data="borders"
      field="border"
      name="Pamatėlis"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.borderHolder"
      :data="holders"
      field="borderHolder"
      name="Pamatėlio laikiklis"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.crossbar"
      :data="crossbars"
      field="crossbar"
      name="Tvorralenčių skersinis"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.crossbarHolders"
      :data="holders"
      field="crossbarHolders"
      name="Skersinio laikiklis"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.rivets"
      :data="other"
      field="rivets"
      name="Kniedės"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.bolts"
      :data="other"
      field="bolts"
      name="Sąvigrežiai"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.bindings"
      :data="other"
      field="bindings"
      name="Tvoros apkaustai"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.segmentHolders"
      :data="other"
      field="segmentHolders"
      name="Segmento apkabos"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.gates"
      :data="gates"
      field="gates"
      name="Stumdomi vartai"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.gates2"
      :data="gates"
      field="gates2"
      name="Varstomi vartai"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.gatesAuto"
      :data="gates"
      field="gatesAuto"
      name="Stumdomi vartai su automatika"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.gates2Auto"
      :data="gates"
      field="gates2Auto"
      name="Varstomi vartai su automatika"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.smallGates"
      :data="gates"
      field="smallGates"
      name="Kiemo varteliai"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.smallGates2"
      :data="gates"
      field="smallGates2"
      name="Kiemo varteliai su elektromagnetine spyna"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.smallGatesSegment"
      :data="gates"
      field="smallGatesSegment"
      name="Kiemo varteliai segmentiniai"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.gateSegment"
      :data="gates"
      field="gateSegment"
      name="Varstomi vartai segmentiniai"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.dileCork"
      :data="other"
      field="dileCork"
      name="Tvoralentės Dilė kamštelis"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.segmentGatesWork"
      :data="works"
      field="segmentGatesWork"
      name="Segmentinių vartelių montavimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.segmentGateWork"
      :data="works"
      field="segmentGateWork"
      name="Segmentinių vartų montavimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.polesWork"
      :data="works"
      field="polesWork"
      name="Tvoros stulpo betonavimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.gatesPoleWork"
      :data="works"
      field="gatesPoleWork"
      name="Vartų stulpo betonavimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.gateBnkette"
      :data="works"
      field="gateBnkette"
      name="Vartų pamato betonavimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.bordersWork"
      :data="works"
      field="bordersWork"
      name="Pamatėlio montavimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.transport"
      :data="works"
      field="transport"
      name="Transportas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.fenceWork"
      :data="works"
      field="fenceWork"
      name="Tvoros montavimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.holesWork"
      :data="works"
      field="holesWork"
      name="Skylučių išmušimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.totalFencesWithBindings"
      :data="works"
      field="totalFencesWithBindings"
      name="Tvoros montavimas su apkaustais"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.bindingWork"
      :data="works"
      field="bindingWork"
      name="Apkaustų montavimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.fenceboardWork"
      :data="works"
      field="fenceboardWork"
      name="Tvoralentės montavimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.crossbarWork"
      :data="works"
      field="crossbarWork"
      name="Skersinio montavimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.segmentWork"
      :data="works"
      field="segmentWork"
      name="Segmento montavimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.anchoredPolesWork"
      :data="works"
      field="anchoredPolesWork"
      name="Ankeriuojamo stulpo montavimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.anchoredGatePolesWork"
      :data="works"
      field="anchoredGatePolesWork"
      name="Ankeriuojamo vartų stulpo montavimas"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.retailBindings"
      :data="other"
      field="retailBindings"
      name="Tvoros apkaustai - metras"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.retailDoubleLeg"
      :data="other"
      field="retailDoubleLeg"
      name="Koja dviguba - metras"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.retailSingleLeg"
      :data="other"
      field="retailSingleLeg"
      name="Koja vienguba - metras"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.retailBindingsEco"
      :data="other"
      field="retailBindingsEco"
      name="Tvoros apkaustai - metras Eco"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.retailDoubleLegEco"
      :data="other"
      field="retailDoubleLegEco"
      name="Koja dviguba - metras Eco"
    />
    <SettingsCalcElement
      :value="settingsStore.defaultValues.retailSingleLegEco"
      :data="other"
      field="retailSingleLegEco"
      name="Koja vienguba - metras Eco"
    />
  </div>
</template>

<style scoped></style>
