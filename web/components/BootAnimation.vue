<template>
  <div id="boot" ref="application">
  </div>
</template>

<script>
import Scaffolding from './Scaffolding.vue'
import mojs from '@mojs/core'

export default Scaffolding.extend({
  mounted () {
    const StaggeredShapes = mojs.stagger(mojs.Shape)

    const width = 1920 / 32
    const shapes = new StaggeredShapes({
      parent: this.$refs.application,
      quantifier: 32,
      radius: width / 2,
      shape: 'rect',
      delay: 'stagger(100)',
      left: width / 2,
      top: width / 2,
      x: `stagger(${width})`,
      scale: { 0: 1 },
    }).play()

    // setTimeout(() => this.requestHidden(), 1000)
  },
})
</script>
