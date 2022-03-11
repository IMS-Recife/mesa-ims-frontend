<script setup lang="ts"></script>
<template>
  <main class="gateway">
    <Map :disabled="true"></Map>
    <div class="box-contain">
      <router-view></router-view>
    </div>
  </main>
</template>

<style lang="scss">
.gateway {
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  > .box-contain {
    width: 548px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  > .map {
    width: calc(100% - 548px);
    height: 100vh;
  }
}
</style>
