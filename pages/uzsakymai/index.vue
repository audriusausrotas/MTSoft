<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col gap-8 m-auto select-none mb-12">
      <div class="text-center font-bold text-2xl">Spalvų kodų paaiškinimas</div>
      <div class="flex gap-3">
        <OrdersHelper label="Statusas nekeistas" color="bg-slate-200" value="" />
        <OrdersHelper label="Medžiagos užsakytos" color="bg-yellow-400" value="" />
        <OrdersHelper label="Medžiagos sandėlyje" color="bg-green-500" value="" />
        <OrdersHelper label="Medžiagos pristatytos" color="bg-stone-400" value="" />
        <OrdersHelper label="Pristatymas nesvarbus" color="bg-slate-200" value="---------" />
        <OrdersHelper label="Pristatymas toli" color="bg-slate-200" value="0000-00-00" />
        <OrdersHelper
          label="Pristatymas arti"
          color="bg-slate-200 text-red-600"
          value="0000-00-00"
        />
        <OrdersHelper
          label="Pristatymas vėluoja"
          color="bg-slate-200 border-4 border-red-500 text-red-600"
          value="0000-00-00"
        />
      </div>
    </div>

    <div class="text-center font-bold text-2xl">Užsakymai</div>

    <OrdersOrder
      v-for="(order, index) in useOrderStore().orders"
      :order="order"
      :key="order._id"
      :index="index"
    />
  </div>
</template>

<style scoped></style>
