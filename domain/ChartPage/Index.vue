<template>
  <div class="scanner-container">
    <apex-navigation></apex-navigation>
    <div id="scanner-content">
    <apex-sidebar></apex-sidebar>
      <apex-main></apex-main>
    </div>
  </div>
</template>

<script>
  import Navigation from './Navigation';
  import Sidebar from './Sidebar';
  import Main from './Main';
    export default
    {
      components:
          {
        'apex-navigation': Navigation,
        'apex-sidebar' : Sidebar,
        'apex-main' : Main,
          }
    }
</script>

<style lang="scss">

  .scanner-container > div
  {
    flex: 1;
  }
  .scanner-container{
    height:100vh;
    @include display-flex;
    flex-direction: column;
  }
  #scanner-content
  {
    height:100%;
    @include display-flex;
  }
  .header button
  {
    outline: 0;
    border: none;
    background-color: transparent;
  }
</style>
