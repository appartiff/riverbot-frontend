<template>
    <div class="box--dark">
      <slot>

      </slot>
    </div>
</template>

<script>
    export default {
        name: "DarkBox"
    }
</script>

<style scoped>
.box--dark{
  background: #17171D;
  padding:1rem;
}
</style>
