<template>
  <div class="features-box block">
    <div class="feature-icon">
<!--      <font-awesome-icon icon="globe"/>-->
    </div>
    <h3>{{pairsCount}} Trading Pairs</h3>
<!--    <p class="big">The scanner is continuously monitoring {{pairsCount}} trading pairs.</p>-->
  </div>
</template>

<script>
    import axios from "axios";
    export default
    {
      data()
      {
        return {
          pairsCount: 0,
        }
      },
      mounted () {
        axios
          .get('/api/assets/GetAssetsCount')
          .then(response =>
          {
            this.pairsCount = response.data;
          })
      }
    }
</script>

<style scoped>

</style>
