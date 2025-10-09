<script setup lang="ts">
const props = defineProps(["phone", "email", "image"]);
</script>

<template>
  <OffersBoxWrap>
    <div class="flex flex-col gap-4 md:gap-8">
      <NuxtImg
        src="/images/stipriausi.jpg"
        alt="Rombo tipo tvora"
        decoding="auto"
        loading="lazy"
        :ismap="true"
        class="object-contain rounded-md self-center w-full h-auto hidden md:block lg:hidden min-w-0"
      />
      <div class="flex gap-4">
        <div class="flex flex-col gap-4 flex-1 justify-between">
          <NuxtImg
            src="/images/stipriausi.jpg"
            alt="Rombo tipo tvora"
            decoding="auto"
            loading="lazy"
            :ismap="true"
            class="object-contain rounded-md w-full h-auto md:hidden lg:block"
          />
          <div class="flex flex-col gap-4 items-center justify-evenly flex-1">
            <p class="text-justify font-normal md:max-w-96 min-w-72">
              <span class="font-bold sm:text-xl text-lg">„Moderni Tvora“</span>
              – šiuolaikiškus tvorų sprendimus siūlanti įmonė. Ilgametę patirtį
              turinti profesionalų komanda specializuojasi skardinių tvorų ir
              lauko žaliuzių gamyboje. Didelį dėmesį skiria gaminių kokybei bei
              valdymo procesams, kurie užtikrina aukščiausią gaminių kokybę ir
              greitą bei skalndų užsakymų įgyvendinimą. Pas mus rasite didelį
              aukščiausios kokybės skardų bei kitų medžiagų pasirinkimą,
              užtikrinantį šimtaprocentinį jūsų poreikių įgyvendinimą.
            </p>
            <div class="flex gap-2 md:gap-4 flex-col md:max-w-96">
              <div class="md:text-2xl text-xl font-bold">
                Susisiekite su mumis
              </div>
              <p class="text-justify text-sm font-normal">
                Atsakysime į visus jums rūpimus klausimus, pakonsultuosime ir
                pateiksime individualų pasiūlymą, atitinkantį jūsų poreikius.
              </p>
              <div class="flex flex-col gap-2 md:mt-4">
                <a
                  :href="`mailto:${email}`"
                  class="flex gap-2 hover:scale-105 transition-transform w-fit"
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
                      stroke="red"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17 9L13.87 11.5C12.84 12.32 11.15 12.32 10.12 11.5L7 9"
                      stroke="red"
                      stroke-width="1.5"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p>{{ email }}</p>
                </a>

                <a
                  :href="`tel:${phone}`"
                  class="flex gap-2 hover:scale-105 transition-transform w-fit"
                >
                  <NuxtImg
                    src="/icons/call.svg"
                    alt="Moderni Tvora logotipas"
                    width="20"
                    height="20"
                    decoding="auto"
                    loading="lazy"
                    :ismap="true"
                  />
                  <p>{{ phone }}</p>
                </a>

                <NuxtLink
                  to="https://maps.app.goo.gl/YThusc8NVmJxAMAS9"
                  target="_blank"
                  class="flex gap-2 hover:scale-105 transition-transform w-fit"
                >
                  <NuxtImg
                    src="/icons/location.svg"
                    alt="Moderni Tvora logotipas"
                    width="20"
                    height="20"
                    decoding="auto"
                    loading="lazy"
                    :ismap="true"
                  />
                  <p>Kauno g. 31, Marijampolė</p>
                </NuxtLink>

                <NuxtLink
                  to="https://modernitvora.lt/lt"
                  target="_blank"
                  class="flex gap-2 hover:scale-105 transition-transform w-fit"
                >
                  <NuxtImg
                    src="/icons/bank.svg"
                    alt="Moderni Tvora logotipas"
                    width="20"
                    height="20"
                    decoding="auto"
                    loading="lazy"
                    :ismap="true"
                  />
                  <p>Apie mus</p>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <NuxtImg
          :src="image"
          alt="Rombo tipo tvora"
          decoding="auto"
          loading="lazy"
          :ismap="true"
          class="object-cover object-top rounded-md self-center flex-1 md:block hidden min-w-0"
        />
      </div>
    </div>
  </OffersBoxWrap>
</template>

<style scoped></style>
