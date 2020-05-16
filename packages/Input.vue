<template>
  <div
    class="lb-input"
    :class="{ 'lb-input-padding-prev':prevIcon,'lb-input-padding-next':nextIcon||clearable }"
  >
    <template v-if="type=='text'||type=='number'">
      <i
        class="lb-input-icon lb-icon-clear"
        clear="clear"
        v-show="clearable&&value"
        @click="$emit('input','')"
      ></i>
      <i class="lb-input-icon-prev" :class="[prevIcon]" v-if="prevIcon"></i>
      <input
        class="lb-input_inner"
        v-bind="bindProps"
        @input="inputEvent($event,'input')"
        @change="inputEvent($event,'change')"
        @focus="inputEvent($event,'focus')"
        @blur="inputEvent($event,'blur')"
      />
      <i class="lb-input-icon-next" :class="[nextIcon]" v-if="nextIcon&&!clearable"></i>
    </template>
    <template v-if="type=='textarea'">
      <textarea
        class="lb-textarea_inner"
        
        v-bind="bindProps"
        @input="inputEvent($event,'input')"
        @change="inputEvent($event,'change')"
        @focus="inputEvent($event,'focus')"
        @blur="inputEvent($event,'blur')"
      ></textarea>
    </template>
  </div>
</template>
<script>
export default {
  name: "lb-input",
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number]
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    maxlength: {
      type: [String, Number],
      default: ""
    },
    minlength: {
      type: [String, Number],
      default: ""
    },
    min: {
      type: [String, Number],
      default: ""
    },
    max: {
      type: [String, Number],
      default: ""
    },
    clearable: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    prevIcon: {
      type: String,
      default: ""
    },
    nextIcon: {
      type: String,
      default: ""
    },
    rows: {
      type: [Number,String],
      default: "10"
    },
    cols: {
      type: [Number,String],
      default: "50"
    },
    resize: {
      type: String,
      default: ""
    },
  },
  model: {
    prop: "value"
  },
  computed: {
    bindProps() {
      let { clearable,resize, ...props } = this.$props;
      let obj = {};
      Object.keys(props).forEach(e => {
        if (props[e] !== "") {
          obj[e] = props[e];
        }
      });
      if(this.type!=='textarea'){
        delete obj.cols;
        delete obj.rows;
      }
      if(this.type=='textarea'&& this.resize!==''){
        obj.style = `resize:${this.resize}`
      }
      return obj;
    }
  },
  methods: {
    inputEvent(ev, listenerName) {
      if (listenerName == "input") {
        this.$emit("input", ev.target.value);
      }
      if (listenerName == "change") {
        this.$emit("change", ev.target.value);
      } else {
        this.$emit(listenerName, ev);
      }
    }
  }
};
</script>