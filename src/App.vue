<template>
  <div id="app" class="container">
    <div class="ignore-padding">
      <TheQrcodeReaderDemo />
    </div>
  </div>
</template>

<script>
import TheQrcodeReaderDemo from '@/components/TheQrcodeReaderDemo'

export default {
  name: 'app',

  components: { TheQrcodeReaderDemo }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";

body {
  padding: 0;
  margin: 0;
  text-align: center;
}

.ignore-padding {
  margin: 0px -15px;
}
</style>
