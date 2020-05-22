<template>
  <transition name="me" appear>
      <div class="lb-message_box" v-if="show">
      {{ message }}
    </div>
  </transition>

</template>

<script>
export default {
  name:'lb-message'
}
</script>
<style scoped>
  .lb-message_box{
    position: fixed;
   height: 50px;
   background: red;
   width: 200px;
  left: 50%;
  transition: all .3s;
  transform: translateX(-50%);
  }
  .me-enter,.me-leave-to{
    top: -30px !important;
  }
  .me-enter-active,.me-leave-active{
    transition: all .3s ease-in-out;
  }

</style>