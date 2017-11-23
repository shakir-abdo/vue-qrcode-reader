<template>
  <QrcodeReader
    @locate="onLocate"
    @init="onInit">
    <div
      v-for="point in points"
      :style="positionOf(point)"
      class="point"
    ></div>

    <LoadingIndicator v-show="loading" />
  </QrcodeReader>
</template>

<script>
import { QrcodeReader } from 'vue-qrcode-reader'
import InitHandler from '@/mixins/InitHandler'

export default {
  components: { QrcodeReader },

  mixins: [ InitHandler ],

  data () {
    return {
      points: []
    }
  },

  methods: {
    onLocate (points) {
      this.points = points
    },

    positionOf ({ x, y }) {
      return {
        'top': y + 'px',
        'left': x + 'px'
      }
    }
  }
}
</script>

<style scoped>
.point {
  position: absolute;

  background-color: red;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin-left: -5px;
  margin-top: -5px;

  transition: all 40ms;
}
</style>
