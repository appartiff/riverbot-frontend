<template>
    <div class="form">
      <slot>

      </slot>
    </div>
</template>

<script>
    export default {
        name: "Form"
    }
</script>

<style scoped>
.form {
  display:flex;
  flex-direction: column;
}
  .form > * {
    padding-bottom:1rem;
  }
</style>
