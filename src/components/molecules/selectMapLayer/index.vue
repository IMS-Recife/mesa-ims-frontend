<script setup lang="ts">
interface Props {
  id?: string;
  label?: string;
  valueModel?: boolean;
  required?: boolean;
  image?: string;
  labelImage?: string;
  items: any[];
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  valueModel: true,
  required: false,
  image: "",
});

const emit = defineEmits<{
  (e: "update:value", event: boolean): void;
}>();

const model = computed({
  get() {
    return props.valueModel;
  },
  set(value: any) {
    emit("update:value", value);
  },
});
</script>
<template>
  <div class="select-map-layer">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="select-wrap"
      @click="item.function"
    >
      <input
        :checked="item.checked"
        :value="model"
        type="radio"
        name="select-map-layer"
        :required="required"
      />
      <label v-if="item.label" name="label">
        <img :src="item.imageLayer" />
      </label>
      <span> {{ item.label }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select-map-layer {
  @apply flex flex-row items-center gap-4 justify-between pb-7;
}
.select-wrap {
  @apply relative h-[46px] w-[46px];
  > label {
    @apply ml-2 flex items-center text-[12px];
    > img {
      @apply h-full w-full;
      border-radius: 8px;
    }
  }
  > span {
    @apply absolute top-15 left-[6px] text-[12px] text-neutrals-darkgrey-medium w-[120px] font-semibold;
  }
}

input[type="radio"] {
  @apply h-[46px] w-[46px];
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
}

input[type="radio"] + label {
  @apply h-[46px] w-[46px];
  margin: auto;
  border: 2px solid #000 !important;
  padding: 2px;
  border-radius: 8px;
  display: inline-block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

input[type="radio"]:checked + label {
  border: 2px solid #46bc6e !important;
}
</style>
