<script setup lang="ts"></script>

<template>
  <div class="flex justify-center bg-dark-full py-8 text-white print:hidden">
    <div class="w-[1200px]">
      <div class="flex flex-col items-center gap-8">
        <div class="flex flex-col items-center">
          <NuxtImg
            src="/images/logoLight.png"
            alt="Moderni Tvora logotipas"
            width="100"
            height="60"
            decoding="auto"
            loading="lazy"
            :ismap="true"
          />
          <p>©2024. Visos teisės saugomos.</p>
        </div>

        <div class="border border-red-full w-full"></div>

        <div class="flex justify-between w-full py-2">
          <div class="flex flex-col gap-2">
            <div class="flex gap-2">
              <NuxtImg
                src="/icons/business.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
                decoding="auto"
                loading="lazy"
                :ismap="true"
              />
              <p>Įmonės kodas: 305174431</p>
            </div>
            <div class="flex gap-2">
              <NuxtImg
                src="/icons/tag.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
                decoding="auto"
                loading="lazy"
                :ismap="true"
              />
              <p>PVM kodas: LT100013165913</p>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex gap-2">
              <NuxtImg
                src="/icons/bank.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
                decoding="auto"
                loading="lazy"
                :ismap="true"
              />
              <p>Bankas: Swedbank AB</p>
            </div>
            <div class="flex gap-2">
              <NuxtImg
                src="/icons/bank.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
                decoding="auto"
                loading="lazy"
                :ismap="true"
              />
              <p>Banko sąskaita: LT247300010158952845</p>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <a href="tel:++37066347011" class="flex gap-2">
              <NuxtImg
                src="/icons/email.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
                decoding="auto"
                loading="lazy"
                :ismap="true"
              />
              <p>+370 663 47011</p>
            </a>

            <a href="mailto:info@modernitvora.lt" class="flex gap-2">
              <NuxtImg
                src="/icons/call.svg"
                alt="Moderni Tvora logotipas"
                width="20"
                height="20"
                decoding="auto"
                loading="lazy"
                :ismap="true"
              />
              <p>info@modernitvora.lt</p>
            </a>
          </div>
          <div class="flex gap-2">
            <NuxtImg
              src="/icons/location.svg"
              alt="Moderni Tvora logotipas"
              width="20"
              height="20"
              decoding="auto"
              loading="lazy"
              :ismap="true"
            />
            <p>
              Kauno g. 31, Marijampolė, <br />
              LT-68178, Lietuva
            </p>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
