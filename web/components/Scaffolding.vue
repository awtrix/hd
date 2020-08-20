<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    app: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },

  data () {
    return {
      isLocked: false,
      isReady: true,
    }
  },

  watch: {
    visible: {
      immediate: true,
      handler (nowVisible, previouslyVisible) {
        if (nowVisible == previouslyVisible) return

        nowVisible ? this.becameVisible() : this.becameHidden()
      },
    },
  },

  methods: {
    /**
     * TODO: Figure out how to make this a lifecycle-like method.
     */
    becameVisible () {
      // no-op
    },

    /**
     * TODO: Figure out how to make this a lifecycle-like method.
     */
    becameHidden () {
      // no-op
    },

    /**
     * Declare the app to be in a state in which it does not want
     * to be interrupted. It will keep being displayed until `unlock()`
     * is called.
     */
    lock () {
      this.isLocked = true
      this.$emit('lock')
    },

    /**
     * Declare the app to be in a state in which it can safely be
     * hidden. This is the opposite of the `lock()` state.
     */
    unlock () {
      this.isLocked = false
      this.$emit('unlock')
    },

    /**
     * The app is now in a state in which it can be displayed.
     */
    ready () {
      this.isReady = true
      this.$emit('ready')
    },

    /**
     * The app has finished its rendering and does no longer need to be
     * displayed in future loops.
     */
    finished () {
      this.isReady = false
      this.$emit('finished')
    },

    /**
     * The app is requesting to be immediately displayed. This implicitly
     * also calls `ready()`.
     */
    requestDisplay (keepInLoop = true, immediately = false) {
      if (keepInLoop) this.ready()

      this.$emit('requestDisplay', immediately)
    },

    requestHidden () {

    },
  },
})
</script>
