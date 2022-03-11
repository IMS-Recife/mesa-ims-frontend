<script lang="ts" setup>
interface Props {
  id?: number;
  title?: string;
  text?: string;
  link?: string;
  textLink?: string;
  dataGeo?: any;
  complementLink?: string;
}

withDefaults(defineProps<Props>(), {
  id: 0,
  title: "Sobre",
  text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, quisquam.",
  link: "#",
  textLink: "Text Link",
  complementLink: "Complement link text",
});
</script>

<template>
  <div class="box-text-info">
    <Title :title="title" />
    <TextBodySmall v-if="dataGeo">
      <div class="data-geo">
        <ul>
          <li>
            <span>
              <strong>Área </strong>
            </span>
            <span> {{ dataGeo.area }} m²</span>
          </li>
          <li>
            <span>
              <strong>Lat </strong>
            </span>
            <span> {{ dataGeo.lat }}</span>
          </li>
          <li>
            <span>
              <strong>Long </strong>
            </span>
            <span> {{ dataGeo.long }}</span>
          </li>
        </ul>
      </div>
    </TextBodySmall>
    <TextBodySmall v-else>
      {{ text }}
    </TextBodySmall>

    <div v-if="dataGeo" class="flex gap-1">
      <LinkSmall @click="$router.push(link)">{{ textLink }} </LinkSmall
      ><TextSmall>{{ complementLink }}</TextSmall>
    </div>

    <LinkMedium v-else>
      <a :href="link" target="_blank" rel="noopener noreferrer">{{
        textLink
      }}</a>
    </LinkMedium>
  </div>
</template>

<style lang="scss" scoped>
.box-text-info {
  @apply flex flex-col px-2 py-2 h-auto w-full gap-4 p-4 bg-neutrals-lightgrey-light;
  outline: transparent !important;
  border-radius: 8px;
  border: 1px solid #f1f1f1;
}
.btn-link {
  @apply max-w-36 p-0 justify-start;
}

.data-geo {
  > ul > li {
    @apply text-neutrals-darkgrey-dark font-sans text-[12px] py-2;
    text-transform: uppercase;
  }
}
</style>
