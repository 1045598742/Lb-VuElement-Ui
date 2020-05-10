<template>
  <div
    class="lb-input"
    :class="{ 'lb-input-padding-prev':prevIcon,'lb-input-padding-next':nextIcon||clearable }"
  >
    <template v-if="type=='text'">
      <i class="lb-input-icon lb-icon-test44" clear="clear" v-show="clearable&&value" @click="$emit('input','')"></i>
      <i class="lb-input-icon-prev" :class="[prevIcon]" v-if="prevIcon"></i>
      <input class="lb-input_inner" v-bind="$props" @input="inputChange" />
      <i class="lb-input-icon-next" :class="[nextIcon]" v-if="nextIcon&&!clearable"></i>
    </template>
    <template v-if="type=='textarea'">
      <textarea class="el-textarea_inner" v-bind="$props" @input="inputChange" cols="1" rows="3"></textarea>
    </template>
  </div>
</template>
<script>
export default {
  name: "lb-input",
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
      default: "请输入"
    },
    maxlength: {
      type: [String, Number],
      default: ""
    },
    minlength: {
      type: [String, Number],
      default: ""
    },
    clearable: {
      type: Boolean,
      default: false
    },
    clearable: {
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
    }
  },
  model: {
    prop: "value"
  },
  methods: {
    inputChange(ev) {
      this.$emit("input", ev.target.value);
    }
  }
};
</script>