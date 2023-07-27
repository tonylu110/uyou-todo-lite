<template>
  <div
    mb-10px rounded-7px
    border="1px solid black/10"
    w="100%"
  >
    <div rounded-7px overflow-hidden class="box">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.box:deep(.item) {
  --uno: shadow-none mb-0 rounded-0 border-b-1px border-t-none border-l-none border-r-none border-b-black/10 w-[calc(100%-30px)];
}
.box:deep(.item):last-child {
  --uno: border-0;
}
</style>
