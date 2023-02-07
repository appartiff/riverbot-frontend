<template>
  <div class="nav-list-item">
    <div class="nav-tools">

    </div>
  </div>
</template>

<script>
    import Time from './NavigationMenu/Timeframes'
    import Assets from './NavigationMenu/Assets'
    import Indicators from './NavigationMenu/Indicators';
    import Patterns from './NavigationMenu/patterns';
    import Harmonics from './NavigationMenu/Harmonics';
    import ChartType from './NavigationMenu/ChartType';

    export default {
        components:
            {
            'apexTime': Time,
            'apexAssets': Assets,
                'apexChartType':ChartType,
            'apexIndicators': Indicators,
            'apexPatterns': Patterns,
            'apexHarmonics': Harmonics,}
    }
</script>

<style>
  .fade-enter-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .nav-tools {
    float: left;
    height: 100%;
  }

  .nav-tools > div {
    height: 100%;
    float: left;
  }

  .nav-tools button {
    height: 100%;
    white-space: nowrap;
    height: 5em;
    padding: 0 1em;
  }
  @media (max-width: 999px) {
    .nav-tools button
    {
      padding: 0 0.5em;
    }
  }
  .nav-tools i {
    padding: 0 0.5em;
    color: #fff;
    font-size: 1.25em;
  }

  .dropbtn:not(.selected):hover {
    background-color: white;
    color: black;
  }

  .dropbtn {
    background-color: #22222a;
    color: white;
    font-size: 0.8em;
    border: none;
    cursor: pointer;
    height: 100%;
    display: block;
  }

  .dropdown {
    position: relative;
    display: block;
    height: 100%;
    margin: auto;
  }
</style>
