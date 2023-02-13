<template>
  <div class="dropdown asset-container">
    <button @click="toggle('asset')" :class="{selected : selectedNav === 'asset'}"  class="dropbtn" id="assets-button">
      {{updateAssetBox}}
    </button>
    <transition name="fade">
    <div id="assetDropDown" v-show="selectedNav==='asset'" class="dropdown-content">
      <div id="MarketTables">
        <apex-markets></apex-markets>
        <apex-cryptos></apex-cryptos>
        <div id="marketAssetsCollection">
          <apex-exchange :exchangeProp="'binance'" :marketsProp="'crypto'"></apex-exchange>
          <apex-exchange :exchangeProp="'deribit'" :marketsProp="'crypto'"></apex-exchange>
          <apex-forex></apex-forex>
        </div>
      </div>
    </div>
    </transition>
  </div>
</template>

<script>

  import exchange from './assets/cryptos/exchanges/Exchange';
  import cryptos from './assets/cryptos/Cryptos';
  import forex from './assets/forex/Forex';
  import markets from './assets/Markets';
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
          routeParams:
              {
                  market:this.$route.params.market,
                  exchange:this.$route.params.exchange,
                  asset:this.$route.params.asset,
                  timeframe:this.$route.params.timeframe,
              }
      }
    },
    computed:{
      ...mapGetters('chartNavigation',[
        'updateAssetBox']),
      ...mapState('chartNavigation',[
                 'selectedNav','assets'
               ])
    },
    components: {
      'apex-exchange' : exchange,
      'apex-forex' : forex,
      'apex-cryptos':cryptos,
      'apex-markets' : markets
    },
    methods:
      {
        toggle: function (category)
        {
          this.$store.commit('chartNavigation/setSelectedNav',category);
        }
      },
    beforeMount()
    {
      this.$store.dispatch('chartNavigation/initializeScanner',{exchange: this.routeParams.exchange, assetIndex: this.routeParams.asset, market: this.routeParams.market,timeframe:this.routeParams.timeframe});
    }
  }
</script>

<style lang="scss">

#assetDropDown
{
  z-index: 2;
}
#marketAssetsCollection tr:not(:first-child):not(.highlight):not(.disabled):hover th {
    background-color: #6B6B6B;
    color: #54DEB7
  }
#marketAssetsCollection table {
    border-spacing: 0;
    table-layout: auto !important;
    display: table;
  }
  .highlight  th
  {
    color:#54DEB7!important;

  }
  .selected
  {
    background-color: #89e3dd;
    color:black;
  }

#marketAssetsCollection tbody {
    height: 100%;
    /* Just for the demo          */
    overflow-y: auto;
    /* Trigger vertical scroll    */
    overflow-x: hidden;
    /* Hide the horizontal scroll */
  }


  @media (min-width: 1281px) {
    #marketAssetsCollection   tbody tr {
      height: 21px;
      font-size: 0.8em;
    }
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    #marketAssetsCollection  tbody tr {
      height: 21px;

      font-size: 0.8em;
    }
  }

  @media (max-width: 1024px) {
    #marketAssetsCollection  tbody tr {
      height: 21px;
      font-size: 0.8em;
    }
  }

  .disabled {
    color: #717171!important;
    background-color: #101010!important;
  }

#marketAssetsCollection table .header {
    text-align: center;
    border-style: solid;
    border-width: 0px;
    overflow: hidden;
    word-break: normal;
    border-color: #b3d5d6;
    color: #fff;
    background-color: #000;
    position: sticky;
    top: 0;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

#marketAssetsCollection table td,#marketAssetsCollection table th {
    text-align: center;
    /*padding: 0 4px;*/
    overflow: hidden;
    word-break: normal;
    color: #fff;
    border-top:1px solid #1b1b1b;
    border-bottom:1px solid #1b1b1b;
    background-color: #22222a;
    padding: 0.38em 0;
  }
.marketContainer table th:first-child
  {
    width: 60%;
  }


  .fade-enter-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .rotate
  {
    color: black!important;
    -ms-transform: rotate(-90deg); /* IE 9 */
    -webkit-transform: rotate(-90deg); /* Safari 3-8 */
    transform: rotate(-90deg);
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }

  #marketAssetsCollection {
    background-color: #101010;
  }

  #MarketTables {
    width: 100%;
  }

  #marketTables, .Tablehead {
    border-top: 1px solid #273332;
    background-color: #17171d;
    background-image: linear-gradient(#181a23, #181a23);
  }

  #marketTables, .Tablehead {
    background-color: #ffffff;
    width: 100%;

  }

  #MarketTables ul {
    font-weight: 600;
    text-transform: uppercase;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
    text-align: center;
    display: table;
    font-size: 1em;
    margin-top: 1px;
    margin-bottom: 1px;
  }

  #MarketTables ul > li {
    background-color: #17171d;
    color: #a5a5a5;
  }



  #MarketTables ul.tabs li {
    float: left;
    width: 50%;
    padding: 4px 8px;
    margin-bottom: 0;
    cursor: pointer;
    box-sizing: border-box;
  }


  ul.tabs1 {
    display: none;
  }

  ul.tabs1 li
  {
    float: left;
    width: 50%;
    padding: 0.25em 0.5em;
    margin-bottom: 0;
    cursor: pointer;
    box-sizing: border-box;
  }
  ul.tabs1.active {
    display: table;
  }

  ul > li:not(.disabled):hover
  {
    color:white!important;
  }
  .Tablehead  li.active {
    color: #FFF !important;
    border-bottom-color: #66fcf1;
    border-bottom-width: 2px;
    border-bottom-style: solid;
  }


</style>
