<template>
  <ul class="lb-tree">
    <li v-for="(item, index) in data" :key="index">
      <div
        :style="{paddingLeft:`${treeData.level*padding}px`}"
        class="lb-tree-node__contentd"
        :class="{
          'lb-tree-node-focus':
            activeLevel === treeData.level && activeId === item.id,
        }"
        @click.stop="activeClick(item)"
      >
        <i
          :style="{ opacity: item[option.children] && item[option.children].length ? 1 : 0 }"
          @click="show(index)"
          class="el-icon-caret-right allow"
          :class="{ isRotate: showObj[index] }"
        ></i>
        <span @click="nodeClick(item, $event)">{{ item.name }}</span>
      </div>
      <div v-if="item[option.children] && item[option.children].length">
        <transition
          @beforeEnter="beforeEnter"
          @enter="enter"
          @afterEnter="afterEnter"
          @beforeLeave="beforeLeave"
          @leave="leave"
          @afterLeave="afterLeave"
        >
          <lb-tree
            v-show="showObj[index]"
            class="lb-tree_child"
            v-bind="{
              data: item[option.children],
              index: index,
              option
            }"
            v-on="{ ...$listeners }"
          ></lb-tree>
        </transition>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "lb-tree",
  props: {
    data: {
      type: Array,
      default: () => []
    },
    index: {
      type: Number,
      default: 0
    },
    padding: {
      type: Number,
      default: 20
    },
    option:{
      type:Object,
      default:()=>{
        return {
          label:'name',
          children:'children'
        }
      }
    }
  },
  data() {
    return {
      activeId: null,
      showObj: {},
      activeLevel: null,
      treeData: {
        level: 0,
        parent: null
      }
    };
  },
  methods: {
    show(index) {
      this.$set(this.showObj, index, !this.showObj[index]);
    },
    activeClick({ id }) {
      if (this.activeId === id) return;
      this.$root.$emit("click", this.treeData.level, id);
    },
    nodeClick(item) {
      const index = this.data.findIndex(e => e[this.option.label] === item[this.option.label]);
      const childrenTree = this.$children.filter(child => {
        return child.treeData.parent.data[this.option.label] === this.data[index][this.option.label];
      });
      if (childrenTree.length) {
        if (childrenTree[0].treeData.parent.data[this.option.label] == item[this.option.label]) {
          const arr = [];
          childrenTree[0].data.forEach(child => {
            const { treeData } = childrenTree[0];
            arr.push({ ...treeData, data: child });
          });
          this.treeData.children = arr;
        } else {
          this.treeData.children = null;
        }
      } else {
        this.treeData.children = null;
      }
      this.$emit("node-click", item,this.treeData);
    },
    beforeEnter(el) {
      el.style.height = "0";
    },

    enter(el) {
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + "px";
      } else {
        el.style.height = "";
      }
      el.style.overflow = "hidden";
    },

    afterEnter(el) {
      el.style.height = "";
    },

    beforeLeave(el) {
      el.style.height = el.scrollHeight + "px";
      el.style.overflow = "hidden";
    },

    leave(el) {
      if (el.scrollHeight !== 0) {
        el.style.height = 0;
      }
    },

    afterLeave(el) {
      el.style.height = "";
    }
  },
  created() {
    if (this.$parent.$options.name === "lb-tree") {
      const { treeData, data } = this.$parent;
      this.treeData.level = treeData.level + 1;
      this.treeData.parent = { ...treeData, data: data[this.index] };
    }
    this.$root.$on("click", (level, id) => {
      this.activeId = id;
      this.activeLevel = level;
    });
  }
};
</script>