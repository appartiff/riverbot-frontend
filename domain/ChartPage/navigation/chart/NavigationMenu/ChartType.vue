<template>
  <dropdown :name="selectedChartType">
    <ul class="navigation-dropdown-list">
      <ul class="navigation-dropdown-list">
        <li  :class="[highlight('Bar')]" @click="update('Bar')">Bar</li>
        <li  :class="[highlight('Candle')]" @click="update('Candle')">Candle</li>

      </ul>
    </ul>
  </dropdown>

</template>

<script>
    import {mapState} from "vuex";

    export default {

        computed: {
            ...mapState('chartNavigation', ['selectedNav','selectedChartType']),
            ...mapState('chartPatterns', ['patternsConfig'])
        },
        methods:
            {
                highlight: function (i)
                {
                    if (i === this.selectedChartType)
                    {
                        return 'highlight';
                    }
                },
                update: function (value)
                {
                    this.$store.commit('chartNavigation/setSelectedNav','');
                    this.$store.commit('chartNavigation/setSelectedChartType', value);
                },
                toggle: function (category) {
                    this.$store.commit('chartNavigation/setSelectedNav', category);
                }
            },
    }
</script>

<style scoped>
  .nav-tools button
  {
    min-width: 5em;
  }
#DropDown
{
  z-index: 2;
}
</style>
