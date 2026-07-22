<script setup lang="ts"></script>

<template>
  <div class="flex gap-4 w-full h-full">
    <ReportsInfoCardProduction
      name="Staklių 2 KPI"
      :data="1250"
      :target="2000"
      icon="kpi"
    />
    <ReportsInfoCardProduction
      name="Pjovimo staklės"
      :data="1250"
      :target="2000"
      icon="scissors"
      sign="m"
    />
    <ReportsInfoCardProduction
      name="Skylučių staklės"
      :data="1250"
      :target="2000"
      icon="hole"
    />
    <ReportsInfoCardProduction
      name="Staklių 1 KPI"
      :data="1250"
      :target="2000"
      icon="kpi"
    />
  </div>
</template>
<style scoped></style>
