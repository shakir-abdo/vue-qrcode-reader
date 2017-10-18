<template>
  <div class="qrcode-reader-demo">
    <qrcode-reader
      :paused="paused"
      @capture="onCapture"
      @no-support="onError"
      @stream-loaded="onStreamLoaded"
      @permission-deny="onError">

      <div class="module" v-for="module in modules" :style="styleOf(module)"></div>

      <div class="content">{{ content }}</div>

    </qrcode-reader>

    <div>
      <button type="button" class="btn btn-primary btn-sm" @click="togglePauseOnCapture">
        {{ pauseOnCapture ? 'Scan Continuously' : 'Pause On Capture' }}
      </button>
    </div>

    <div v-for="error in errors" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import 'webrtc-adapter' // shim getUserMedia
import { QrcodeReader } from 'vue-qrcode-reader'

export default {
  components: { QrcodeReader },

  data () {
    return {
      modules: [],
      content: 'STREAM LOADING...',
      errors: [],
      paused: false,
      pauseOnCapture: true
    }
  },

  methods: {
    onCapture (capture) {
      if (capture === null) {
        this.modules = []
      } else {
        this.modules = capture.points
        this.content = capture.result

        if (this.pauseOnCapture) {
          this.paused = true
        }
      }
    },

    onError (message) {
      this.errors.push(message)
    },

    onStreamLoaded () {
      this.content = ''
    },

    styleOf ({ X, Y, estimatedModuleSize }) {
      return {
        'top': Y + 'px',
        'left': X + 'px',
        'width': estimatedModuleSize + 'px',
        'height': estimatedModuleSize + 'px'
      }
    },

    togglePauseOnCapture () {
      this.pauseOnCapture = !this.pauseOnCapture

      if (!this.pauseOnCapture) {
        this.paused = false
      }
    }
  }
}
</script>

<style lang="scss">
.qrcode-reader-demo {
  .module {
    position: absolute;

    background-color: red;
    border-radius: 50%;
    min-width: 5px;
    min-height: 5px;

    transition: all 40ms;
  }

  .content {
    padding: 0px 10px;
    color: #fff;
    font-weight: bold;
    padding: 10px;
    background-color: rgba(0,0,0,.5);
  }

  .error {
    color: red;
    font-weight: bold;
    padding: 10px;
  }
}
</style>
