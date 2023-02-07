<template>
  <section class="marketContainer"
           v-bind:class="ShowExchange(exchange)">
    <div style="height: 320px; overflow: auto;">
      <template v-if="Asset">
        <table style="width: 100%">
          <tr>
            <th class="header">Asset</th>
            <th class="header">Description</th>
          </tr>
          <tr v-for="(item,i) in Asset" @click="item.enabled ?  update(i)  : null;hideNav()"
              v-bind:class="[item.enabled ? highlight(i):'', item.enabled === false ? 'disabled' : '']" :key="i">
            <template v-if="item.enabled === false">
              <th class="disabled">{{item.asset}}</th>
              <th class="disabled">Disabled</th>
            </template>
            <template v-if="item.enabled === true">
              <th>{{item.asset}}</th>
              <th></th>
            </template>
          </tr>
        </table>
      </template>
      <template v-else>
        <div class="center">
          <p>Loading data</p>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
    import {mapState} from 'vuex';
    import {mapGetters} from 'vuex';

    export default {
        props: {
            exchangeProp:{required: true,type:String},
            marketsProp:{required:true,type:String}
        },

        computed: {
            ...mapGetters('chartNavigation', ['getAssets','selectedNav']),
            ...mapState('chartNavigation',['selectedExchange']),
            Asset() {
                return this.getAssets({exchange: this.exchange, market: this.markets});
            },
        },
        data() {
            return {
                selectedAsset: undefined,
                exchange:this.exchangeProp,
                markets:this.marketsProp,
            }
        },
        methods: {
            hideNav:function()
            {
                this.$store.commit('chartNavigation/setSelectedNav','');
            },
            update: function (i) {
                let exchange = this.exchange;
                let market = this.markets;
                this.selectedAsset = i;
                this.$store.dispatch('chartNavigation/setExchange', {exchange: exchange, assetIndex: i, market: market});
            },
            highlight: function (i)
            {
                if (this.selectedAsset === i && this.exchange === this.selectedExchange) {
                    return 'highlight';
                }
                return '';
            },
            ShowExchange: function (exchange) {
                return this.$store.getters['chartNavigation/isSelectedExchange'](exchange);
            }
        }


    }
</script>

<style lang="scss" scoped>

</style>
