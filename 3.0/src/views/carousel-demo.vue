<template>
  <div>
    <Carousel>
      <CarouselItem v-for="(img, index) in imgList" :key="index">
        <img :src="img" />
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import Carousel from '@/components/Carousel/index.vue'
import CarouselItem from '@/components/Carousel/carousel-item.vue'
export default defineComponent({
  components: {
    Carousel,
    CarouselItem
  },
  setup() {
    const imgList = reactive([
      require('../assets/img/shuihu(1).jpg'),
      require('../assets/img/shuihu(2).jpg'),
      require('../assets/img/shuihu(3).jpg'),
    ])
    return {
      imgList
    }
  }
})
</script>

<style lang="scss">
  .lb-carousel__item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
