<template>
  <div class="lb-select" @click="click" v-click-outside>
    <lb-input :value="labelValue" v-on="{...$listeners}" clearable></lb-input>
    <transition
      name="fade"
      @beforeEnter="beforeEnter"
      @enter="enter"
      @afterEnter="afterEnter"
      @beforLeave="beforLeave"
      @leave="leave"
      @afterLeave="afterLeave"
    >
      <ul class="lb-select-opiton__group" v-show="show">
        <slot>
          <li class="lb-select-default__item">暂无数据</li>
        </slot>
      </ul>
    </transition>
  </div>
</template>
<script>
export default {
  name: "lb-select",
  props: ["value"],
  model: {
    prop: "value",
  },
  directives: {
    clickOutside: {
      bind(el, building, vnode) {
        let handler = (ev) => {
          if (!el.contains(ev.target)) {
            vnode.context.show = false;
          }
        };
        el.handler = handler;
        document.addEventListener("click", handler);
      },
      unbind(el, building, vnode) {
        document.removeEventListener("click", el.handler);
      },
    },
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    labelValue(){
      let value = this.value;
        let children = this.$slots.default.filter(e=>{
        return e.componentOptions.propsData.value === value && e.componentOptions.tag === 'lb-option';
      })
     return children.length?children[0].componentOptions.propsData.label: value
    }
  },
  methods: {
    click(ev) {
      if(ev.target.getAttribute('clear')==='clear'){
        this.show = false;
        return
      }
      this.show = !this.show;
    },
    beforeEnter(el) {
      el.style.height = 0;
    },
    enter(el) {
      el.style.height = el.scrollHeight + "px";
      el.style.overflow = "hidden";
    },
    afterEnter(el) {
      el.style.overflow = "";
    },
    beforLeave(el) {
      
    },
    leave(el) {
        el.style.overflow = 'hidden';
      el.style.height = 0;
    },
    afterLeave(el) {
      el.style.overflow = "";
      el.style.height = "";
    }
  }
};
</script>
