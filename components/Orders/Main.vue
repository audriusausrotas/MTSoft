<script setup lang="ts">
const props = defineProps(["_id", "data", "index"]);
const { setError, setSuccess } = useError();

const disabled = ref<boolean>(true);
const name = ref<string>(props.data?.name);
const color = ref<string>(props.data?.color);
const quantity = ref<string>(props.data?.quantity);

const updateOrderHandler = async (field: string, value: boolean) => {
  const requestData = { _id: props._id, dataIndex: props.index, field, value };

  const response: any = await request.patch("updateOrderFields", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useOrderStore().updateOrderFields(
        response.data._id,
        response.data.dataIndex,
        response.data.field,
        response.data.value
      );

    setSuccess(response.message);
  } else {
    setError(response.message);
  }
};

const saveHandler = async () => {
  const requestData = {
    _id: props._id,
    dataIndex: props.index,
    data: {
      ...props.data,
      name: name.value,
      color: color.value,
      quantity: quantity.value,
    },
  };

  const response: any = await request.patch("updateOrder", requestData);

  if (response.success) {
    !useSocketStore().connected &&
      useOrderStore().updateOrder(
        response.data._id,
        response.data.dataIndex,
        response.data.data
      );

    setSuccess(response.message);
  } else {
    setError(response.message);
  }

  disabled.value = true;
};
</script>

<template>
  <div class="flex gap-2 border-b">
    <div class="w-6">{{ index + 1 }}</div>

    <input
      type="text"
      v-model="name"
      :readonly="disabled"
      class="w-96"
      :class="disabled ? '' : 'outline outline-green-200 rounded-md px-2'"
    />
    <input
      type="text"
      v-model="color"
      :readonly="disabled"
      class="w-20 text-center"
      :class="disabled ? '' : 'outline outline-green-200 rounded-md px-2'"
    />
    <input
      type="text"
      v-model="quantity"
      :readonly="disabled"
      class="w-16 text-center"
      :class="disabled ? '' : 'outline outline-green-200 rounded-md px-2'"
    />

    <BaseCheckField
      :name="data._id + index"
      @onChange="(value:boolean)=>updateOrderHandler('ordered', value)"
      :checked="data?.ordered"
      height="h-6"
      class="w-24"
    />
    <BaseCheckField
      :name="data._id + index"
      @onChange="(value:boolean)=>updateOrderHandler('inWarehouse', value)"
      :checked="data?.inWarehouse"
      height="h-6"
      class="w-24"
    />
    <BaseCheckField
      :name="data._id + index"
      @onChange="(value:boolean)=>updateOrderHandler('delivered', value)"
      :checked="data?.delivered"
      height="h-6"
      class="w-24"
    />
    <div class="w-6 hover:cursor-pointer hover:scale-125 transition-transform">
      <NuxtImg
        v-if="disabled"
        @click="disabled = false"
        src="/icons/edit.svg"
        width="20"
        height="20"
        decoding="auto"
        :ismap="true"
        loading="lazy"
      />
      <NuxtImg
        v-else
        @click="saveHandler"
        src="/icons/save.svg"
        width="20"
        height="20"
        decoding="auto"
        :ismap="true"
        loading="lazy"
      />
    </div>
  </div>
</template>
<style scoped></style>
