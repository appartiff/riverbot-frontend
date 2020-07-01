<template>
  <div class="content-features" id="features">

    <h3>Features</h3>
    <div class="container-features">
      <div class="features-box block">
        <div class="feature-icon">
<!--          <font-awesome-icon icon="clock"/>-->
        </div>
        <h3>Multiple Time Frames</h3>
        <p class="big">If you prefer to trade on intraday or long term, we got you covered.</p>
      </div>
      <apex-tradingpairs></apex-tradingpairs>
      <div class="features-box block">
        <div class="feature-icon">
<!--          <font-awesome-icon icon="cloud"/>-->
        </div>
        <h3>Cloud Based</h3>
        <p class="big">No need to install any software, everything is web based.</p>
      </div>
      <div class="features-box block">
        <div class="feature-icon">
<!--          <font-awesome-icon icon="cloud"/>-->
        </div>
        <h3>Logarithmic</h3>
        <p class="big"></p>
      </div>

  </div>
<!--   <apexPatterns></apexPatterns>-->
  </div>
</template>

<script>
  import TradingPairs from './features/TradingPairs'
    export default {
components:
  {
    'apex-tradingpairs': TradingPairs,
  }
    }
</script>

<style scoped>

</style>
