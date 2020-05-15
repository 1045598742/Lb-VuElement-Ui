<template>
  <ul>
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
          :style="{ opacity: item.cList && item.cList.length ? 1 : 0 }"
          @click="show(index)"
          class="el-icon-caret-right allow"
          :class="{ isRotate: showObj[index] }"
        ></i>
        <span @click="hehe(item, $event)">{{ item.name }}</span>
      </div>
      <div v-if="item.cList && item.cList.length">
        <el-collapse-transition>
          <tree
            v-if="showObj[index]"
            class="tree"
            v-bind="{
              data: item.cList,
              index: index,
            }"
            v-on="{ ...$listeners }"
          ></tree>
        </el-collapse-transition>
      </div>
    </li>
  </ul>
</template>
<script>
// import ElCollapseTransition from "element-ui/src/transitions/collapse-transition";
export default {
  name: "tree",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    index: {
      type: Number,
      default: 0,
    },
    padding:{
      type:Number,
      default:20
    }
  },
  data() {
    return {
      activeId: null,
      showObj:{},
      activeLevel: null,
      treeData: {
        level: 0,
        parent: null,
      },
    };
  },
  methods: {
    show(index) {
      // this.$set(this.data[index], "show", !this.data[index].show);
      this.$set(this.showObj, index, !this.showObj[index]);
    },
    activeClick({ id }) {
      if (this.activeId === id) return;
      this.$root.$emit("click", this.treeData.level, id);
    },
    hehe(item) {
      const index = this.data.findIndex((e) => e.name === item.name);
      const childrenTree = this.$children.filter((child) => {
        return child.treeData.parent.data.name === this.data[index].name;
      });
      if (childrenTree.length) {
        if (childrenTree[0].treeData.parent.data.name == item.name) {
          const arr = [];
          childrenTree[0].data.forEach((child) => {
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
      this.$emit("nodeClick", { ...item, ...this.treeData });
    },
  },
  created() {
    if (this.$parent.$options.name === "tree") {
      const { treeData, data } = this.$parent;
      this.treeData.level = treeData.level + 1;
      this.treeData.parent = { ...treeData, data: data[this.index] };
    }
    this.$root.$on("click", (level, id) => {
      this.activeId = id;
      this.activeLevel = level;
    });
  },
};
</script>
<style lang="scss">
ul {
  box-sizing: border-box;
  li {
    overflow: hidden;
  }
  .lb-tree-node-focus {
    background-color: #F5F7FA;
  }
  .lb-tree-node__contentd {
    line-height: 26px;
    cursor: pointer;
  }
}
.tree {
  transition: all 0.5s ease;
}
.allow {
  transition: transform 0.5s ease;
}
.isRotate {
  transform: rotate(90deg);
}
</style>
