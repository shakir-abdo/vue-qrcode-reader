import LoadingIndicator from '@/components/LoadingIndicator'

export default {
  components: { LoadingIndicator },

  data () {
    return {
      loading: false
    }
  },

  methods: {
    async onInit (promise) {
      this.loading = true

      try {
        await promise
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    }
  }
}
