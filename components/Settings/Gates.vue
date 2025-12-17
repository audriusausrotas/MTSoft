<script setup lang="ts">
import type { Gates } from "~/data/interfaces";
import GatesElement from "./GatesElement.vue";

const gates: Gates[] = [
  {
    name: "Varstomi vartai 4m",
    length: 4,
    category: "varstomi",
    profit: { retail: 30, wholesale: 15 },
    prices: {
      cost: { frame: 380, automation: 450, installation: 320 },
      priceRetail: { frame: 380, automation: 450, installation: 320 },
      priceWholesale: { frame: 380, automation: 450, installation: 320 },
    },
  },
  {
    name: "Varstomi vartai 5m",
    length: 5,
    category: "varstomi",
    profit: { retail: 30, wholesale: 15 },
    prices: {
      cost: { frame: 380, automation: 450, installation: 320 },
      priceRetail: { frame: 380, automation: 450, installation: 320 },
      priceWholesale: { frame: 380, automation: 450, installation: 320 },
    },
  },
  {
    name: "Varstomi vartai 6m",
    length: 6,
    category: "varstomi",
    profit: { retail: 30, wholesale: 15 },
    prices: {
      cost: { frame: 380, automation: 450, installation: 320 },
      priceRetail: { frame: 380, automation: 450, installation: 320 },
      priceWholesale: { frame: 380, automation: 450, installation: 320 },
    },
  },
  {
    name: "Stumdomi vartai 4m",
    length: 4,
    category: "stumdomi",
    profit: { retail: 30, wholesale: 15 },
    prices: {
      cost: { frame: 380, automation: 450, installation: 320 },
      priceRetail: { frame: 380, automation: 450, installation: 320 },
      priceWholesale: { frame: 380, automation: 450, installation: 320 },
    },
  },
  {
    name: "Stumdomi vartai 5m",
    length: 5,
    category: "stumdomi",
    profit: { retail: 30, wholesale: 15 },
    prices: {
      cost: { frame: 380, automation: 450, installation: 320 },
      priceRetail: { frame: 380, automation: 450, installation: 320 },
      priceWholesale: { frame: 380, automation: 450, installation: 320 },
    },
  },
  {
    name: "Stumdomi vartai 6m",
    length: 6,
    category: "stumdomi",
    profit: { retail: 30, wholesale: 15 },
    prices: {
      cost: { frame: 380, automation: 450, installation: 320 },
      priceRetail: { frame: 380, automation: 450, installation: 320 },
      priceWholesale: { frame: 380, automation: 450, installation: 320 },
    },
  },
  {
    name: "Stumdomi vartai 7m",
    length: 7,
    category: "stumdomi",
    profit: { retail: 30, wholesale: 15 },
    prices: {
      cost: { frame: 380, automation: 450, installation: 320 },
      priceRetail: { frame: 380, automation: 450, installation: 320 },
      priceWholesale: { frame: 380, automation: 450, installation: 320 },
    },
  },
  {
    name: "Stumdomi vartai 8m",
    length: 8,
    category: "stumdomi",
    profit: { retail: 30, wholesale: 15 },
    prices: {
      cost: { frame: 380, automation: 450, installation: 320 },
      priceRetail: { frame: 380, automation: 450, installation: 320 },
      priceWholesale: { frame: 380, automation: 450, installation: 320 },
    },
  },
  {
    name: "Varteliai",
    length: 1,
    category: "varteliai",
    profit: { retail: 30, wholesale: 15 },
    prices: {
      cost: {
        frame: 380,
        inox: 450,
        locinox: 450,
        iseo_el: 450,
        locinox_el: 450,
        installation: 320,
      },
      priceRetail: {
        frame: 380,
        inox: 450,
        locinox: 450,
        iseo_el: 450,
        locinox_el: 450,
        installation: 320,
      },
      priceWholesale: {
        frame: 380,
        inox: 450,
        locinox: 450,
        iseo_el: 450,
        locinox_el: 450,
        installation: 320,
      },
    },
  },
];
</script>

<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-4">
      <GatesElement
        v-for="(gate, index) in gates"
        :key="gate._id?.toString() || gate.name + index"
        :data="gate"
      />
    </div>
  </div>
</template>
