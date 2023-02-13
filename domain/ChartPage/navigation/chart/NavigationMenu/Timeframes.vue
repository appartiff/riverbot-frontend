<template>
  <dropdown :name="selectedTimeframe">

      <div id="timeframe-bitfinex" :class="ShowExchange('binance')">
        <ul class="navigation-dropdown-list">
          <li @click="update(i)" :class="[highlight(i)]"   v-for="(item,i) in timeframes.binance" :key="i">
            {{item}}
          </li>
        </ul>
      </div>
      <div id="timeframe-bitmex" :class="ShowExchange('deribit')">
        <ul class="navigation-dropdown-list">
          <li @click="update(i)" :class="[highlight(i)]"   v-for="(item,i) in timeframes.deribit" :key="i">
            {{item}}
          </li>
        </ul>
      </div>

  </dropdown>
</template>

<script>
    import {mapActions, mapGetters, mapState} from 'vuex'

  export default {
      data() {
        return {

        }
      },
      computed:{
        ...mapGetters('chartNavigation',[
          'updateAssetBox']),
        ...mapState('chartNavigation',[
          'selectedNav',
          'timeframes',
          'selectedTimeframe'
        ])
      },
      methods:
        {
          update: function (i)
          {
              this.$store.commit('chartNavigation/setSelectedNav','');
              this.$store.dispatch('chartNavigation/setTimeframe',i);
          },
          highlight: function(i)
          {
            let exchange = this.$store.state.selectedExchange;
            if(this.selectedAsset === i && this.exchange === exchange)
            {
              return 'highlight';
            }
            return '';
          },
          ShowExchange: function (exchange)
          {
            return this.$store.getters['chartNavigation/isSelectedExchange'](exchange);
          },
          toggle: function (category)
          {
            this.$store.commit('chartNavigation/setSelectedNav',category);
          },
        },
    }
</script>

<style>

  .timeframe-container span {
    display: inline-block;
    vertical-align: middle;
    color: white;
    padding-left: 0.5em;
    height: 100%;
    line-height: 60px;
  }

</style>
