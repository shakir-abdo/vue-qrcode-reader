<template>
  <div id="app">
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-3">Vue QR code reader</h1>
        <p class="lead">
          A Vue.js 2 component, accessing the device camera and allowing users to read QR codes, right from your web app.
        </p>
        <hr />
        <p class="lead">
          <a
            class="btn btn-primary btn-lg"
            href="https://github.com/gruhn/vue-qrcode-reader"
            role="button">
            View on GitHub
          </a>
        </p>
      </div>
    </div>

    <div class="container">

      <div class="form-row align-items-center">
        <label for="demo-select" class="col-form-label">Choose demo:</label>

        <div class="col">
          <select v-model="selectedDemo" class="form-control" id="demo-select">
            <option
              v-for="demo in demos"
              :value="demo.component">
              {{ demo.title }}
            </option>
          </select>
        </div>

        <div class="col-auto">
          <a
            href="https://github.com/gruhn/vue-qrcode-reader/tree/gh-pages/dev/src/components/demos"
            class="btn btn-outline-primary">
            Sources
          </a>
        </div>
      </div>

      <hr />

      <Component :is="selectedDemo" />
    </div>
  </div>
</template>

<script>
import TheTrackLocationDemo from '@/components/demos/TheTrackLocationDemo'
import TheDecodeAllDemo from '@/components/demos/TheDecodeAllDemo'
import TheFirstResultDemo from '@/components/demos/TheFirstResultDemo'

export default {
  name: 'app',

  data () {
    const demos = [
      {
        title: 'Decode all',
        component: 'TheDecodeAllDemo'
      }, {
        title: 'First result only',
        component: 'TheFirstResultDemo'
      }, {
        title: 'Track location',
        component: 'TheTrackLocationDemo'
      }
    ]

    return {
      selectedDemo: demos[0].component,
      demos
    }
  },

  components: {
    TheTrackLocationDemo,
    TheDecodeAllDemo,
    TheFirstResultDemo
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";

.ignore-padding {
  margin: 0px -15px;
}
</style>
