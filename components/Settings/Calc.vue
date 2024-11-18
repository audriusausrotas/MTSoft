<script setup lang="ts">
import type { Product } from "~/data/interfaces";
const useProducts = useProductsStore();
const useSettings = useSettingsStore();

const poles = ref<Product[]>([]);
const borders = ref<Product[]>([]);
const holders = ref<Product[]>([]);
const crossbars = ref<Product[]>([]);
const gates = ref<Product[]>([]);
const works = ref<Product[]>([]);
const fences = ref<Product[]>([]);
const other = ref<Product[]>([]);

useProducts?.products?.forEach((item) => {
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
      :value="useSettings.defaultValues.poleMain"
      :data="poles"
      field="poleMain"
      name="Tvoros Stulpas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.poleAlt"
      :data="poles"
      field="poleAlt"
      name="Segmento Stulpas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.gatePoleMain"
      :data="poles"
      field="gatePoleMain"
      name="Stumdomų vartų stulpas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.gatePoleAlt"
      :data="poles"
      field="gatePoleAlt"
      name="Varstonų vartų stulpas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.anchoredPoleMain"
      :data="poles"
      field="anchoredPoleMain"
      name="Ankeriuojamas tvoros stulpas H-1.5"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.anchoredPoleAlt"
      :data="poles"
      field="anchoredPoleAlt"
      name="Ankeriuojamas tvoros stulpas H-2.0"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.anchoredGatePoleMain"
      :data="poles"
      field="anchoredGatePoleMain"
      name="Ankeriuojamas vartų stulpas H-1.5"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.anchoredGatePoleAlt"
      :data="poles"
      field="anchoredGatePoleAlt"
      name="Ankeriuojamas vartų stulpas H-2.0"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.border"
      :data="borders"
      field="border"
      name="Pamatėlis"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.borderHolder"
      :data="holders"
      field="borderHolder"
      name="Pamatėlio laikiklis"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.crossbar"
      :data="crossbars"
      field="crossbar"
      name="Tvorralenčių skersinis"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.crossbarHolders"
      :data="holders"
      field="crossbarHolders"
      name="Skersinio laikiklis"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.rivets"
      :data="other"
      field="rivets"
      name="Kniedės"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.bolts"
      :data="other"
      field="bolts"
      name="Sąvigrežiai"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.bindings"
      :data="other"
      field="bindings"
      name="Tvoros apkaustai"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.segment103"
      :data="fences"
      field="segment103"
      name="Segmentas 1.03 m"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.segment123"
      :data="fences"
      field="segment123"
      name="Segmentas 1.23 m"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.segment153"
      :data="fences"
      field="segment153"
      name="Segmentas 1.53 m"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.segment173"
      :data="fences"
      field="segment173"
      name="Segmentas 1.73 m"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.segment203"
      :data="fences"
      field="segment203"
      name="Segmentas 2.03 m"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.segmentHolders"
      :data="other"
      field="segmentHolders"
      name="Segmento apkabos"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.gates"
      :data="gates"
      field="gates"
      name="Stumdomi vartai"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.gates2"
      :data="gates"
      field="gates2"
      name="Varstomi vartai"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.gatesAuto"
      :data="gates"
      field="gatesAuto"
      name="Stumdomi vartai su automatika"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.gates2Auto"
      :data="gates"
      field="gates2Auto"
      name="Varstomi vartai su automatika"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.smallGates"
      :data="gates"
      field="smallGates"
      name="Kiemo varteliai"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.smallGates2"
      :data="gates"
      field="smallGates2"
      name="Kiemo varteliai su elektromagnetine spyna"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.smallGatesSegment"
      :data="gates"
      field="smallGatesSegment"
      name="Kiemo varteliai segmentiniai"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.gateSegment"
      :data="gates"
      field="gateSegment"
      name="Varstomi vartai segmentiniai"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.dileCork"
      :data="other"
      field="dileCork"
      name="Tvoralentės Dilė kamštelis"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.segmentGatesWork"
      :data="works"
      field="segmentGatesWork"
      name="Segmentinių vartelių montavimas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.segmentGateWork"
      :data="works"
      field="segmentGateWork"
      name="Segmentinių vartų montavimas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.polesWork"
      :data="works"
      field="polesWork"
      name="Tvoros stulpo betonavimas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.gatesPoleWork"
      :data="works"
      field="gatesPoleWork"
      name="Vartų stulpo betonavimas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.gateBnkette"
      :data="works"
      field="gateBnkette"
      name="Vartų pamato betonavimas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.bordersWork"
      :data="works"
      field="bordersWork"
      name="Pamatėlio montavimas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.transport"
      :data="works"
      field="transport"
      name="Transportas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.fenceWork"
      :data="works"
      field="fenceWork"
      name="Tvoros montavimas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.totalFencesWithBindings"
      :data="works"
      field="totalFencesWithBindings"
      name="Tvoros montavimas su apkaustais"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.bindingWork"
      :data="works"
      field="bindingWork"
      name="Apkaustų montavimas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.fenceboardWork"
      :data="works"
      field="fenceboardWork"
      name="Tvoralentės montavimas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.crossbarWork"
      :data="works"
      field="crossbarWork"
      name="Skersinio montavimas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.segmentWork"
      :data="works"
      field="segmentWork"
      name="Segmento montavimas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.anchoredPolesWork"
      :data="works"
      field="anchoredPolesWork"
      name="Ankeriuojamo stulpo montavimas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.anchoredGatePolesWork"
      :data="works"
      field="anchoredGatePolesWork"
      name="Ankeriuojamo vartų stulpo montavimas"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.retailBindings"
      :data="other"
      field="retailBindings"
      name="Tvoros apkaustai - metras"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.retailDoubleLeg"
      :data="other"
      field="retailDoubleLeg"
      name="Koja dviguba - metras"
    />
    <SettingsCalcElement
      :value="useSettings.defaultValues.retailSingleLeg"
      :data="other"
      field="retailSingleLeg"
      name="Koja vienguba - metras"
    />
  </div>
</template>

<style scoped></style>
