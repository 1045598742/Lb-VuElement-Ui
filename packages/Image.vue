<template>
  <div class="lb-image" ref="lbImage">
    <img v-if="defaultSrc != ''" :src="defaultSrc" alt="" @error="error" />
  </div>
</template>
<script>
let dom = null;
// import { throttle } from '../plugins/throttle'
export default {
  name:'lb-image',
  props: {
    src: {
      type: String,
      default: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    },
    index: {
      type: Number
    }
  },
  data() {
    return {
      defaultSrc: '',
      isLazyed: false
    }
  },
  methods: {
    error(ev) {
      console.log(ev, 'error')
    },
    event: throttle(function () {
      console.log(123)
            let parentBottom = dom.getBoundingClientRect().bottom;
      let imgTop = this.$refs.lbImage.getBoundingClientRect().top;
      if (imgTop <= parentBottom) {
        this.defaultSrc = this.src;
        this.isLazyed = true;
        dom.removeEventListener('scroll',this.event,false);
        // dom = null;
        // this.event = null;
      }
    }, 100)
  },
  mounted() {
    dom = this.$refs.lbImage;
    let flag = true;
    while (flag) {
      let parent = dom.parentNode;
      if (parent == document.body) {
        dom = document.documentElement;
        flag = false;
      } else {
        let overflow = window.getComputedStyle(parent).overflow;
        if (overflow == 'scroll' || overflow == 'auto') {
          flag = false;
        }
        dom = parent
      }
    }
    this.$nextTick(() => {
     
      dom.addEventListener('scroll', this.event, false)
       this.event()
    })
  }
}
</script>
<style scoped lang="scss">
.lb-image {
  width: 500px;
  height: 300px;
  position: relative;
  background: red;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    // transform: translate(-50%,-50%);
  }
}
</style>