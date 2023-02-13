<template>
  <dropdown name="Indicators">

        <ul class="timeframes-list">
          <li>RSI</li>
          <li>AC</li>
          <li>AO</li>
          <li>MA</li>
        </ul>


  </dropdown>

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


</style>
