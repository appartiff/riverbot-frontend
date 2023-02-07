<template>
  <div class="main">

    <apex-chart v-show="selectedSidebarIndex ===0"></apex-chart>
    <apexMonitor v-if="selectedSidebarIndex ===1"></apexMonitor>
    <template v-if="selectedSidebarIndex ===3">
      <h1> Statistics</h1>
    </template>
    <apexOptions v-if="selectedSidebarIndex ===4"></apexOptions>

  </div>
</template>

<script>
  import {mapState} from "vuex";
  import Chart from './main/Chart';
  import Options from './main/Options';
import Monitor from './main/Monitor';

  export default {
components:{
  'apex-chart' : Chart,
    'apexMonitor':Monitor,
    'apexOptions': Options,
},
    computed:
      {
        ...mapState([
          'selectedSidebarIndex',
        ]),
      },
  }
</script>

<style scoped>
  h1 {
    color: white;
  }

.main
{
  overflow-y: hidden;
  overflow-x: hidden;
  flex-grow: 1;
  flex-direction: column;
}
</style>
