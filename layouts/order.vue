<template>
  <div class="flex flex-col min-h-[100dvh] justify-between">
    <OfferNavigation />
    <div class="w-full my-12 self-start max-w-[1470px] m-auto">
      <slot />
    </div>
    <Footer />
  </div>
</template>
