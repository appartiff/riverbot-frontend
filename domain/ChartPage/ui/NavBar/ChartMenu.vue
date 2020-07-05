<template>
      <Assets @clicked="dropdownClicked" :selected-dropdown="selectedDropdown"></Assets>
</template>

<script>
  import Assets from './ChartMenu/Assets';
    export default {
        name: "ChartMenu",
      components:{
          Assets
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

</style>
