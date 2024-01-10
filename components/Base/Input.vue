<script setup lang="js">
const props = defineProps(["placeholder", "label", "type", "name", "width", "active", "variant", "disable"]);
const emit = defineEmits(["onChange", "EnterPressed"]);

const emitUpdate = (value) => {
  emit("onChange", value);
};

const inputRef = ref(null);

const handleEnterKey = () => {
  emit("EnterPressed");
};

onMounted(() => {
  if (props.active && inputRef.value) {
    inputRef.value.focus();
  }
});
</script>

<template>
  <div class="flex flex-col capitalize">
    <label v-if="props.label" :for="props.label" class="pl-2 text-sm">{{
      props.label
    }}</label>

    <div
      class="flex items-center justify-center h-10 gap-3 px-4 overflow-auto border rounded-lg shadow-sm border-dark-light"
      :class="(props.width ? props.width : 'w-60',
            props.variant === 'light' ? 'bg-white' : 'bg-gray-ultra-light')
          ">
      <slot />
      <input :value="props.name" :placeholder="props.placeholder" :id="props.label" :type="props.type"
        :disabled="props.disable || false" @input="emitUpdate($event.target.value)" @keyup.enter="handleEnterKey"
        ref="inputRef"
        class="w-full h-full overflow-scroll border-0 outline-none active:outline-none bg-inherit active:border-0" />
    </div>
  </div>
</template>
<style scoped></style>
