<template scoped>
  <div
    mb-10px shadow-item rounded-7px
    w="100%"
  >
    <div rounded-7px overflow-hidden class="box">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.box:deep(.item) {
  --uno: shadow-none mb-0 rounded-0 border-b-1px border-b-solid border-b-black/10 w-[calc(100%-30px)];
}
.box:deep(.item):last-child {
  --uno: border-0;
}
</style>
