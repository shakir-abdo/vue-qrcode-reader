<template>
  <div class="qrcode-reader-demo container">
    <qrcode-reader
      :paused="paused"
      @decode="onDecode"
      @locate="onLocate"
      @init="onInit">

      <div class="point" v-for="point in points" :style="positionOf(point)"></div>
      <div class="content">{{ content }}</div>
      <div class="controls">
        <button type="button" class="btn btn-primary btn-sm" @click="togglePauseOnCapture">
          {{ pauseOnCapture ? 'Scan Continuously' : 'Pause On Capture' }}
        </button>
      </div>

    </qrcode-reader>
  </div>
</template>

<script>
import 'webrtc-adapter' // shim getUserMedia
import { QrcodeReader } from 'vue-qrcode-reader'

export default {
  components: { QrcodeReader },

  data () {
    return {
      points: [],
      content: '',

      paused: false,
      pauseOnCapture: true
    }
  },

  methods: {
    onDecode (content) {
      this.content = content

      if (this.pauseOnCapture) {
        this.paused = true
      }
    },

    onLocate (points) {
      this.points = points
    },

    async onInit (promise) {
      this.content = 'STREAM LOADING...'

      try {
        this.content = ''
      } catch (e) {
        console.error(e)

        if (e.name === 'NotAllowedError') {
          this.content = 'To scan QR codes this component needs to access your camera.'
        } else {
          this.content = e.message
        }
      }
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
  padding: 0px;

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

  .content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    padding: 0px 20px;
    color: #fff;
    font-weight: bold;
    padding: 10px;
    background-color: rgba(0,0,0,.5);
  }

  .controls {
    margin-top: 40px;
  }

  .error {
    color: red;
    font-weight: bold;
    padding: 10px;
  }
}
</style>
