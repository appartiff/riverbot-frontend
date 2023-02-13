<template>
  <div class="dropdown indicators-container">
    <button @click="toggle('indicators')" :class="{selected : selectedNav === 'indicators'}"  class="dropbtn" id="indicators-button">
      Indicators

    </button>
    <div id="timeFrameDropDown" v-show="selectedNav==='indicators'" class="dropdown-content">
      <div id="timeframe"  v-show="selectedNav==='indicators'">
        <ul class="timeframes-list">
          <li>RSI</li>
          <li>AC</li>
          <li>AO</li>
          <li>MA</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState} from "vuex";

    export default {
      computed:{
        ...mapState([
          'selectedNav'
        ])
      },
      methods:{
        toggle: function (category)
        {
          this.$store.commit('chartNavigation/setSelectedNav',category);
        },
      }
    }
</script>

<style scoped>
  .indicators-container {
    border-left: 1px solid #66fcf1;

  }

</style>
