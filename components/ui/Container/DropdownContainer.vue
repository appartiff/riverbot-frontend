<template>
    <div class="dropdown-content">
      <slot>

      </slot>
    </div>
</template>

<script>
    export default {
        name: "DropdownContainer"
    }
</script>

<style scoped>
  .dropdown-content
  {
    position: absolute;
    background-color: #22222a;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
    top: 100%;
  }
  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
</style>
