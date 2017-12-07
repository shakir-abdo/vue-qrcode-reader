<template>
  <QrcodeReader
    :paused="paused"
    @decode="onDecode"
    @init="onInit">
    <div v-show="paused" class="validation-layer">
      {{ content }}

      <div v-if="validating">
        Long validation in progress...
      </div>

      <div v-else-if="isValid">
        A URL!!!
      </div>

      <div v-else>
        Not a URL!
      </div>
    </div>

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
      isValid: false,
      validating: false,
      paused: false,
      content: null
    }
  },

  methods: {
    onDecode (content) {
      this.content = content
      this.paused = true
      this.validating = true

      window.setTimeout(() => { // simulate long validation
        this.isValid = content.startsWith('http')
        this.validating = false

        window.setTimeout(() => {
          this.paused = false
        }, 2000)
      }, 3000)
    }
  }
}
</script>

<style scoped>
.validation-layer {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(0,0,0,.5);
  color: #fff;
  font-weight: bold;
  text-align: center;
  padding: 10px;
}
</style>
