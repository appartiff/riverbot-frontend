<template>
  <div class="dropdown">
    <button @click="onClick" v-bind:class="{selected : selectedNav === 'asset'}"  class="dropbtn" id="assets-button">
      BTCUSDT
    </button>
  </div>
</template>

<script>
    export default {
        name: "DropdownButton",
      props: {
        onClick: {
          type: Function,
          required: true
        }
      }
    }
</script>

<style scoped>

</style>
