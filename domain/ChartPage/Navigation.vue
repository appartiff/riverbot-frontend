<template>
  <nav id="nav">
    <div class="nav-list">
      <apex-logo></apex-logo>
      <transition name="fade">
      <apexChartNav v-if="selectedSidebarIndex ===0"></apexChartNav>
      </transition>
    </div>
    <div>
    </div>
    <div class="login">
    </div>
  </nav>
</template>

<script>
  import Logo  from'./navigation/Logo'
  import ChartNav from './navigation/chart/NavigationMenu'
  import {mapState} from "vuex";
    export default {
        components:
          {
            'apexChartNav':ChartNav,
            'apex-logo': Logo,
          },
      computed:
        {
          ...mapState([
            'selectedSidebarIndex',
          ]),
        },
    }
</script>

<style lang="scss">
  body {
    margin: 0;
  }


  .navigation-dropdown-list {
    padding: 0;
    text-align: left;
    margin: 0;
    overflow-x: hidden;
  }

  .navigation-dropdown-list li
  {

    padding: 0.4em 2em;
    background-color: #22222a;
    display: block;
    color: white;
    white-space: nowrap;

  }

  .navigation-dropdown-list li:not(.selected):hover {
    color: #80FFD0!important;
    background-color: #6B6B6B;
  }

  .navigation-dropdown-list .selected {
    color: #fc8966;
    border-left: 2px solid #66fcf1;
  }
  #nav {
    background-color: #17171d;
    position: relative;
   
  }

  nav img {
    height: 100%;
    width: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }

  .nav-list {
    margin: 0;
  }

  .nav-list li {
    display: inline-block;
    height: 100%;
    width:100%;
  }

  .nav-list > .nav-list-item {
    float: left;
  }

  .nav-list > div {
    display: inline-block;
    height: 100%;
  }


  .login {
    grid-column: 3;
  }

  /*nav button*/
  .progress-button-nav button
  {
    display: block;
    padding: 0.3em 1em;
    float: right;
    font-size: 1em;
    border: 2px solid #fc8966;
    border-radius: 40px;
    background: transparent;
    letter-spacing: 1px;
    color: white;
    -webkit-tap-highlight-color: transparent;
    -webkit-transition: background-color 0.3s, color 0.3s, width 0.3s, border-width 0.3s, border-color 0.3s;
    transition: background-color 0.3s, color 0.3s, width 0.3s, border-width 0.3s, border-color 0.3s;
  }

  .progress-button-nav button:hover {
    background-color: #fc8966;
  }

  .progress-button-nav button:hover > span {
    color: black;
  }

  button span
  {
    display: inline-block;
  }
  #assetDropDown {
    min-width: 20em;
  }

  .dropdown-content {

    position: absolute;
    background-color: #22222a;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }

  .dropdown a:hover {
    background-color: #ddd;
  }
</style>
