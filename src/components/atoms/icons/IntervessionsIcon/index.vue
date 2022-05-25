<script lang="ts" setup>
  
   interface IconProps{
     color: string;
   }
  
   const props = defineProps<IconProps>();
  //  export default {
  //    props:{color: String},
  //    data(){
  //      return{
  //      }
  //    },
  //  }
  
  </script>
<template>
<svg width="24" height="24" viewBox="0 0 20 20" fill="#000" xmlns="http://www.w3.org/2000/svg">
  <path :fill="props.color" d="M19 0.5H14V1.5H18.65L13.35 6.8C12.45 6 11.29 5.5 10 5.5C8.71 5.5 7.55 6 6.66 6.8L3.57 3.72C3.84 3.38 4 2.96 4 2.5C4 1.4 3.1 0.5 2 0.5C0.9 0.5 0 1.4 0 2.5C0 3.52 0.76 4.35 1.75 4.47V15.52C0.76 15.65 0 16.48 0 17.5C0 18.6 0.9 19.5 2 19.5C3.1 19.5 4 18.6 4 17.5C4 17.3 3.96 17.12 3.91 16.94L6.66 14.19C7.55 14.99 8.71 15.49 10 15.49C11.29 15.49 12.45 14.99 13.34 14.19L16 16.85V19.5H20V15.5H16V16.15L13.7 13.85C14.5 12.96 15 11.8 15 10.51C15 9.22 14.5 8.06 13.7 7.17L19 1.87V6.5H20V1.5V0.5H19ZM2.25 15.53V4.47C2.61 4.42 2.94 4.28 3.22 4.07L6.3 7.16C5.5 8.05 5 9.21 5 10.5C5 11.79 5.5 12.95 6.3 13.84L3.7 16.45C3.39 15.95 2.86 15.6 2.25 15.53Z"/>
</svg>
</template>
<style lang="scss" scoped>

</style>