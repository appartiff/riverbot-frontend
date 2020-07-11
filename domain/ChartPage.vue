<template>
    <div class="full-size">
      <div class="flex-column">
        <NavBar></NavBar>
        <div class="flex-row">
          <Sidebar @sidebarChanged="onSidebarChanged"  :selected-sidebar="selectedSidebar"></Sidebar>
        </div>
      </div>

    </div>
</template>

<script>
  import Sidebar from './ChartPage/ui/Sidebar';
  import NavBar from './ChartPage/ui/NavBar';
  import {mapActions, mapMutations, mapState} from "vuex";
    export default {
        name: "ChartPage",
      data() {
        return {
          selectedSidebar: 'chart'
        }
      },
      methods:{
        ...mapActions('assets', ['getAssets']),
          onSidebarChanged(i){
            this.selectedSidebar = i;
          },

      },
      components:{
          Sidebar,
        NavBar
      },
      created() {
        this.$store.dispatch('assets/getAssets');
      }
    }
</script>


<style scoped>

  .flex-column{
    display:flex;
    flex-direction: column;
    height:100%;
  }
  .flex-row{
    display:flex;
    flex-direction:row;
    height:100%;
  }

.full-size {
  width:100vw;
  height:100vh;
}
</style>
