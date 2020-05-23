<template>
  <transition name="lb-dialog" appear>
    <div class="lb-dialog" ref="lbDialog" :style="{width}" v-if="visible">
      <div class="lb-dialog_header" v-if="headerShow">
        <span>{{title}}</span>
        <i class="lb-icon-clear" @click="close" v-if="closeButtonShow"></i>
      </div>
      <div class="lb-dialog_main">
        <slot></slot>
      </div>
      <div class="lb-dialog_footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
      <lb-model ref="model" v-if="modelShow"></lb-model>
    </div>
  </transition>
</template>
<script>
let parentNode = null;
export default {
  name: "lb-dialog",
  props: {
    width: {
      type: String,
      default: "40%"
    },
    title: {
      type: String,
      default: "弹窗提示"
    },
    visible: {
      type: Boolean,
      default: false
    },
    escClose: {
      type: Boolean,
      default: false
    },
    modeClickClose: {
      type: Boolean,
      default: false
    },
    headerShow: {
      type: Boolean,
      default: true
    },
    closeButtonShow: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      modelShow: false
    };
  },
  watch: {
    visible(visible) {
        if (visible) {
          this.domFormat();
          setTimeout(() => {
            this.startEvent();
          });
        } else {
          this.clearEvent();
          parentNode && parentNode.removeChild(this.$refs.model.$el);
          parentNode = null;
           this.$emit('close')
        }
      }
  },
  components: {
    lbModel: {
      render(createElement) {
        return createElement("div", { class: "lb-dialog_model" });
      }
    }
  },
  methods: {
    domFormat() {
      this.$nextTick(() => {
        parentNode = this.$refs.lbDialog.parentNode;
        document.body.appendChild(this.$refs.lbDialog);
        if (document.getElementsByClassName("lb-dialog_model").length <= 1) {
          this.modelShow = true;
          this.$nextTick(() => {
            parentNode.appendChild(this.$refs.model.$el);
          });
        }
      });
    },
    close() {
      this.$emit("update:visible", false);
    },
    //   点击事件监听
    clickEvent(ev) {
      if (!this.$refs.lbDialog.contains(ev.target)) {
       parentNode &&  this.close();
      }
    },
    // 键盘事件监听
    keyCodeEvent(ev) {
      if (ev.keyCode === 27) {
        parentNode && this.close();
      }
    },
    startEvent() {
      this.$emit('open')
      this.escClose && window.addEventListener("keydown", this.keyCodeEvent);
      this.modeClickClose && window.addEventListener("click", this.clickEvent);
    },
    clearEvent() {
      this.escClose && window.removeEventListener("keydown", this.keyCodeEvent);
      this.modeClickClose &&
        window.removeEventListener("click", this.clickEvent);
    }
  },
  mounted () {
    if(this.visible){
      this.$emit('open')
      this.domFormat();
    }

  }
};
</script>