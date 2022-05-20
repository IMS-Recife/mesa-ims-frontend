<script setup lang="ts">
interface Props {
  id?: string;
  label?: string;
  valueModel?: boolean;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  label: "",
  valueModel: false,
  required: false,
});

const emit = defineEmits<{
  (e: "update:value", event: boolean): boolean;
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
  <div class="check-box-base">
    <div class="checkbox_wrapper">
      <input v-model="model" type="checkbox" :required="required" />
      <label></label>
    </div>
    <label v-if="label" name="label"> {{ label }}</label>
    <slot v-else />
  </div>
</template>

<style lang="scss">
.check-box-base {
  @apply flex flex-row items-center;

  > label {
    @apply ml-2 flex items-center text-[12px];
  }
}

.checkbox_wrapper {
  position: relative;
  height: 20px;
  width: 20px;
}

input[type="checkbox"] {
  opacity: 0;
  height: 20px;
  width: 20px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  cursor: pointer;
}

input[type="checkbox"] + label {
  border: 1px solid #000;
  border-radius: 4px;
  height: 20px;
  width: 20px;
  display: inline-block;
  padding: 0 0 0 0px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

input[type="checkbox"]:checked + label {
  background-image: url("@assets/icons/tick.png");
  background-repeat: no-repeat;
  background-size: contain;
  height: 20px;
  width: 20px;
  display: inline-block;
  padding: 0 0 0 0px;
}
</style>
