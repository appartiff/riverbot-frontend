<template>
  <div class="menu-items">
    <Assets @clicked="dropdownClicked" :selected-dropdown="selectedDropdown"></Assets>
    <Timeframe @clicked="dropdownClicked" :selected-dropdown="selectedDropdown">
    </Timeframe>
  </div>

</template>

<script>
  import Assets from './ChartMenu/Assets';
  import Timeframe from "@/domain/ChartPage/ui/NavBar/ChartMenu/Timeframe";
    export default {
        name: "ChartMenu",
      components:{
          Assets,Timeframe
      },
      data() {
        return {
          selectedDropdown:''
        }
      },
      methods:{
          dropdownClicked(input){

            this.selectedDropdown = input === this.selectedDropdown ? '' : input;
          }
      }
    }
</script>

<style scoped>

  .nav-tools i {
    padding: 0 0.5em;
    color: #fff;
    font-size: 1.25em;
  }
  .menu-items{
    display: flex;
    flex-direction: row;
  }

</style>
