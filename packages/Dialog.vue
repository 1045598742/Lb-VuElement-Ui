<template>
  <transition name="lb-dialog" appear>
    <div class="lb-dialog" ref="lbDialog" :style="{width}" v-if="visible" v-drop="drop">
      <div class="lb-dialog_header" v-if="headerShow" ref="lbDialogHeader">
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
  directives: {
    drop: {
      bind(el, building, vnode) {
        if (!building.value) return;
        const header = vnode.context.$refs.lbDialogHeader;
        const dialog = vnode.context.$refs.lbDialog;
        if (header) {
          let clientW = null;
          let clientH = null;
          let downX = null;
          let downY = null;
          let offsetW = null;
          let offsetH = null;
          let maxLeft = null;
          let maxTop = null;
          header.style.cursor = "move";
          const mousemove = ev => {
            ev.stopPropagation();
            let left = ev.pageX - downX;
            let top = ev.pageY - downY;
            left <= 0 && (left = 0);
            top <= 0 && (top = 0);
            left >= maxLeft && (left = maxLeft);
            top >= maxTop && (top = maxTop);
            dialog.style.margin = "unset";
            dialog.style.left = left + "px";
            dialog.style.top = top + "px";
          };

          const mousedown = ev => {
            if (ev.target.className === "lb-icon-clear") return;
            ev.preventDefault();
            clientW = document.documentElement.clientWidth;
            clientH = document.documentElement.clientHeight;
            downX = ev.offsetX;
            downY = ev.offsetY;
            offsetW = dialog.offsetWidth;
            offsetH = dialog.offsetHeight;
            maxLeft = clientW - offsetW;
            maxTop = clientH - offsetH;
            document.addEventListener("mousemove", mousemove, false);
            document.addEventListener("mouseup", mouseup, false);
          };

          const mouseup = ev => {
            document.removeEventListener("mousemove", mousemove);
            document.removeEventListener("mouseup", mouseup);
          };

          header.addEventListener("mousedown", mousedown, false);
          el.directiveEvent = {
            mousedown,
            mousemove,
            mouseup
          };
        }
      },
      unbind(el, building, vnode) {
        if (el.directiveEvent) {
          const header = vnode.context.$refs.lbDialogHeader;
          const dialog = vnode.context.$refs.lbDialog;
          const { mousedown, mousemove, mouseup } = el.directiveEvent;
          mousedown && header.removeEventListener("mousedown", mousedown);
          mousemove && document.removeEventListener("mousemove", mousemove);
          mousedown && document.removeEventListener("mouseup", mouseup);
          header.style.cursor = "";
        }
      }
    }
  },
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
    drop: {
      type: Boolean,
      default: true
    }
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
        this.$emit("close");
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
        parentNode && this.close();
      }
    },
    // 键盘事件监听
    keyCodeEvent(ev) {
      if (ev.keyCode === 27) {
        parentNode && this.close();
      }
    },
    startEvent() {
      this.$emit("open");
      this.escClose && window.addEventListener("keydown", this.keyCodeEvent);
      this.modeClickClose && window.addEventListener("click", this.clickEvent);
    },
    clearEvent() {
      this.escClose && window.removeEventListener("keydown", this.keyCodeEvent);
      this.modeClickClose &&
        window.removeEventListener("click", this.clickEvent);
    }
  },
  mounted() {
    if (this.visible) {
      this.$emit("open");
      this.domFormat();
    }
  }
};
</script>