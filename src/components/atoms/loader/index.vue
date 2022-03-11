<script setup lang="ts"></script>

<template>
  <div class="loader__container">
    <span class="loader">
      <span class="loader__inner"></span>
    </span>
  </div>
</template>
<style lang="scss">
.loader__container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(3px);
  z-index: 600;
}

.loader {
  opacity: 0.8;
  display: inline-block;
  width: 45px;
  height: 45px;
  position: relative;
  border: 4px solid #46bc6e;
  animation: loader 4s infinite ease;
  border-radius: 4px;
  > .loader__inner {
    vertical-align: top;
    display: inline-block;
    width: 100%;
    background-color: #46bc6e;
    z-index: 10;
    animation: loader-inner 4s infinite ease-in;
  }
  z-index: 500;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-inner {
  0% {
    height: 0%;
  }
  25% {
    height: 25%;
  }
  50% {
    height: 50%;
  }
  75% {
    height: 70%;
  }
  100% {
    height: 100%;
  }
}
</style>
