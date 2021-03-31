<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { LifecycleApplication } from '@awtrix/common/dist/types/app'
import { Socket } from 'socket.io-client'

export default defineComponent({
  props: {
    app: {
      type: Object as PropType<LifecycleApplication>,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    io: {
      type: Object as PropType<typeof Socket>,
      required: true,
    }
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
    asset (path: string): string {
      return `/static/apps/${this.app.name}/${this.app.version}/${path}`
    },

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
      // -> suspend / suspended
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
      this.$emit('requestHidden')
    },

    destroy () {
      this.$emit('destroy')
    },
  },
})
</script>
