<template>
  <div class="Tablehead">
    <ul class="tabs1 active">

      <li @click="selectExchange(okex)" v-bind:class="activeTab === okex ? 'active' : ''">
        Okex
      </li>
      <li @click="selectExchange(deribit)" v-bind:class="activeTab === deribit ? 'active' : ''">
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
          okex:'okex',
          deribit:'deribit'

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
