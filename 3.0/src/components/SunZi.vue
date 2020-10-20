<template>
  <div>
    <button @click="$emit('onHehe')">hehe</button>
    <button @click="$emit('onHaha')">haha</button>
  </div>
</template>

<script>
export default {
  // emits: ['onHehe', 'onHaha']
}
</script>
