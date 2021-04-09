(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("@awtrix/common"), require("vue")) : typeof define === "function" && define.amd ? define(["@awtrix/common", "vue"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.AwtrixComponent = global.AwtrixComponent || {}, global.AwtrixComponent.awtrix = factory(global.AwtrixCommon, global.Vue));
})(this, function(common, vue) {
  "use strict";
  var _sfc_main = common.defineComponent({
    mounted() {
      this.lock();
    }
  });
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createBlock("div", null, vue.toDisplayString(_ctx.name), 1);
  }
  _sfc_main.render = _sfc_render;
  return _sfc_main;
});
