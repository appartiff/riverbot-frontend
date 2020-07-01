<template>
<div id="Exchanges">
  <h3>Supported Exchanges</h3>
  <ul class="list">
    <li class="list-item">
      <img src="../../assets/Imgs/Logo/okex-seeklogo.com.svg" alt="Okex logo" />
    </li>
    <li class="list-item">
      <img src="../../assets/Imgs/Logo/binance.png" alt="Binance logo" />
    </li>
  </ul>
</div>
</template>
<script>
  
    export default {
        name: "",
    }
</script>

<style lang="scss" scoped>
@import "../../assets/css/Mixins";

h3
  {
    margin:auto;
    font-size: 1.25em;
    padding: 3rem 0.5em;
    text-align: center;
  }
  .list
  {
    margin: 0;
    padding-bottom: 3rem;
    padding-left: 0;
    @include display-flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items: center;
  }
  .list li
  {
    display: inline-block;
    margin:0 1em;
  }
  .list img
  {
    width: 10em;
  }
#Exchanges
{
  background-color: white;
}
</style>
