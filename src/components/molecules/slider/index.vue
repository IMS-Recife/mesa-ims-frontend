<script setup lang="ts">
interface Props {
  context: {
    number: number;
    current: boolean;
    label: string;
  }[];
  selectedValue: number;
  step: number;
  min: number;
  max: number;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "update", value: number): void;
}>();

const selectedValue = ref(props.selectedValue);
const styleLeft = ref("-8px");
const valueRange = ref(1);

function setBubble(range: any) {
  valueRange.value = range.value;
  const min = range.min ? range.min : 0;
  const max = range.max ? range.max : 100;
  const newVal = Number(((valueRange.value - min) * 100) / (max - min));
  styleLeft.value = `calc(${newVal}% + (${-8 - newVal * 0.15}px))`;
}

const input = ref<any>(null);

onMounted(() => {
  input.value.addEventListener("input", (el: any) => {
    selectedValue.value = el.target.value;

    emit("update", selectedValue.value);

    setBubble(el.target);
    props.context.forEach((item: any) => {
      if (item.number === Number(el.target.value)) {
        item.current = true;
      } else {
        item.current = false;
      }
    });
  });
});
</script>

<template>
  <div class="slider-container">
    <div class="slider-points">
      <div
        v-for="(item, index) in props.context"
        :key="index"
        class="slider-items"
      >
        <div v-if="!item.current" class="slider-point"></div>
        <div class="slider-text">
          <span
            ><TextSmall>{{ item.label }}</TextSmall></span
          >
        </div>
      </div>
    </div>
    <ValueLabel
      :labelValue="valueRange"
      :selectedValue="Number(selectedValue)"
      class="value-label"
      backgroundColor="secondary-light"
      :style="`left: ${styleLeft};`"
    >
      <template v-slot:default>
        <Overline class="value-label-text">Raio</Overline>
      </template>
    </ValueLabel>
    <input
      :step="props.step"
      class="slider"
      ref="input"
      type="range"
      :min="props.min"
      :max="props.max"
      :value="selectedValue"
    />
  </div>
</template>

<style lang="scss" scoped>
.slider-container {
  @apply w-full h-15 mt-20 relative;
  > .slider {
    @apply w-full appearance-none outline-none h-2 bg-neutrals-lightgrey-light rounded-lg absolute top-auto mx-auto z-10 cursor-pointer;
  }
  > .slider::-webkit-slider-thumb {
    @apply appearance-none w-5 h-5 cursor-pointer bg-neutrals-lightgrey-lightest rounded-full border-5 border-neutrals-darkgrey-light border-solid;
  }
  > .slider-points {
    @apply w-full flex justify-between;
    > .slider-items {
      @apply w-1 h-1 relative;
      > .slider-point {
        @apply w-2 h-2 bg-brand-primary-light rounded-full relative z-12 top-[5px] cursor-pointer pointer-events-none;
      }

      > .slider-text {
        @apply w-2 absolute z-12 top-[25px] cursor-pointer;
        > span {
          @apply text-center text-sm;
        }
      }
    }
  }
  > .value-label {
    @apply absolute -top-[60px] left-0;
  }
}
</style>
