<template>
  <div class="dropdown timeframe-container">
    <button @click="toggle('timeframe')" class="dropbtn" id="timeframes-button" :class="{selected : selectedNav === 'timeframe'}">
      {{selectedTimeframe}}
    </button>
    <transition name="fade">
    <div class="dropdown-content" id="timeFrameDropDown" v-show="selectedNav==='timeframe'">
      <div id="timeframe-poloniex"  :class="ShowExchange('poloniex')">
        <ul class="navigation-dropdown-list">
          <li @click="update(i)" :class="[highlight(i)]"  v-for="(item,i) in timeframes.poloniex" :key="i">
            {{item}}
          </li>
        </ul>
      </div>
      <div id="timeframe-bitfinex" :class="ShowExchange('bitfinex')">
        <ul class="navigation-dropdown-list">
          <li @click="update(i)" :class="[highlight(i)]"   v-for="(item,i) in timeframes.bitfinex" :key="i">
            {{item}}
          </li>
        </ul>
      </div>
      <div id="timeframe-bitmex" v-bind:class="ShowExchange('bitmex')">
        <ul class="navigation-dropdown-list">
          <li @click="update(i)" v-bind:class="[highlight(i)]"   v-for="(item,i) in timeframes.bitmex" :key="i">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
    </transition>

  </div>
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
  #timeFrameDropDown
  {
    z-index: 2;
  }
  .timeframe-container
  {
    border-left: 1px solid #66fcf1;
    border-right: 1px solid #66fcf1;
  }
  .timeframe-container span {
    display: inline-block;
    vertical-align: middle;
    color: white;
    padding-left: 0.5em;
    height: 100%;
    line-height: 60px;
  }

</style>
