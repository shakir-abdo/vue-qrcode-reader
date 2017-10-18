<template>
  <div class="qrcode-reader-demo">
    <qrcode-reader
      :paused="paused"
      @decode="onDecode"
      @no-support="onError"
      @stream-loaded="onStreamLoaded"
      @permission-deny="onError">

      <div class="corner" v-for="corner in corners" :style="positionOf(corner)"></div>

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
      corners: [],
      content: 'STREAM LOADING...',

      errors: [],
      paused: false,
      pauseOnCapture: true
    }
  },

  methods: {
    onDecode ({ content, location }) {
      if (location === null) {
        this.corners = []
      } else {
        this.corners = [
          location.bottomLeft,
          location.topLeft,
          location.topRight
        ]
      }

      this.content = content || ''

      if (content !== null && this.pauseOnCapture) {
        this.paused = true
      }
    },

    onError (message) {
      this.errors.push(message)
    },

    onStreamLoaded () {
      this.content = ''
    },

    positionOf ({ x, y }) {
      return {
        'top': y + 'px',
        'left': x + 'px'
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
  .corner {
    position: absolute;

    background-color: red;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin-left: -5px;
    margin-top: -5px;

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
