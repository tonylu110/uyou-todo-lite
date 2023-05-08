<template scoped>
  <div 
    mb-10px shadow="md black/30" rounded-7px
    w="[calc(100%-20px)]"
  >
    <div rounded-7px overflow-hidden class="box">
      <slot/>
    </div>
  </div>
</template>

<style scoped>
.box:deep(.item) {
  box-shadow: none;
  margin-bottom: 0;
  border-radius: 0;
  border-bottom: 1px solid #00000015;
  width: calc(100% - 30px) !important;
}
.box:deep(.item):last-child {
  border: 0;
}
</style>