<template>
  <div class="Tablehead">
    <ul class="tabs1 active">

      <li @click="selectExchange(binance)" :class="activeTab === okex ? 'active' : ''">
        binance
      </li>
      <li @click="selectExchange(deribit)" :class="activeTab === deribit ? 'active' : ''">
        Deribit
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters, mapState} from "vuex";

    export default {
      data() {
        return {
          activeTab: 'okex',
          binance:'binance',
          deribit:"deribit"
          //dropDown: false,
        }
      },
      methods:
        {
          selectExchange: function (exchange)
          {
            this.activeTab = exchange;
            this.$store.dispatch('chartNavigation/setDisplayedExchange',exchange);
          }
        },
    }
</script>

<style scoped>

</style>
