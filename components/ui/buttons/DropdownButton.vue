<template>
    <button @click="$emit('clicked')" class="dropbtn" id="assets-button">
      {{text}}
    </button>
</template>

<script>
    export default {
        name: "DropdownButton",
      props: {
          text:String
      }
    }
</script>

<style lang="scss" scoped>
.dropbtn:not(.selected):hover {
  background-color: white;
  color: black;
}

.dropbtn {
  background-color: #22222a;
  color: white;
  font-size: 0.8em;
  border: none;
  cursor: pointer;
  display: block;
  white-space: nowrap;
  height: 5em;
  padding: 0 1em;
  float: left;
}

.dropdown {
  position: relative;
  height: 100%;
  display: inline-block;
}
.dropbtn:hover {
  background-color: #ddd;
  color: black;
}
</style>
