<script setup lang="ts">
// const router = useRouter();
</script>

<template>
  <main class="px-4 py-10 text-center text-teal-700 dark:text-gray-200">
    <div>
      <p class="text-4xl">
        <carbon-warning class="inline-block" />
      </p>
    </div>
    <router-view />
    <div class="content-button flex justify-center items-center my-6">
      <Button class="-link text-[1.23rem]" @click="$router.back()">
        Clica aqui! vamos para uma pagina que existe!
      </Button>
    </div>
  </main>
</template>
