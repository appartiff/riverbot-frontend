<template>
    <ul>
      <slot>

      </slot>
    </ul>
</template>

<script>
    export default {
        name: "NavList"
    }
</script>

<style scoped>
  /*Nav right item*/
 ul {
    float: right;
    list-style-type: none;
    white-space: nowrap;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
  }

  ul > li {
    float: left;
    color: white;
    text-align: center;
    font-size: 1.25em;
    padding: 0 1em;
    text-decoration: none;
  }

</style>
