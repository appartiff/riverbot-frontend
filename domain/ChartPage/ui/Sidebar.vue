<template>
    <transition name="slide-fade">
      <div class="sidebar-left" v-show="showSidebar">
        <ul>
          <li @click="setSidebar('chart')" v-bind:class="{highlight : selectedSidebar === 'chart'}">
            <a>
              <font-awesome-icon icon="chart-bar"/>
              <span>Chart</span>
            </a>
          </li>
          <li>
            <a href="https://discord.gg/M4Sg2b3" target="_blank">
              <font-awesome-icon icon="comments"/>
              <span>Chat</span>
            </a>
          </li>
          <li @click="setSidebar('options')" v-bind:class="{highlight : selectedSidebar === 'options'}">
            <font-awesome-icon icon="tools"/>
            <span>Options</span>
          </li>
        </ul>
        <div class="bottom" @click.stop="toggleShowSidebar()">
            <font-awesome-icon icon="chevron-up"/>
        </div>
      </div>
    </transition>
</template>

<script>
    import {mapActions, mapMutations, mapState} from "vuex";

    export default {
        components:
            {},
        computed:
            {
              ...mapState('chart/ui', [
                'showSidebar','selectedSidebar'
              ]),
            },
      methods:
            {
              ...mapMutations('chart/ui', ['setSidebar','toggleShowSidebar']),
            }
    }
</script>
<style lang="scss" scoped>
  .sidebar-left {
    background-color: #17171d;
    height: 100%;
    border-right: 1px solid;
    display:inline-flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .sidebar-left > .bottom {
    display: inline-block;
    align-self: flex-end;
    width:100%;
    text-align: center;
    padding: 0.707em 0;
  }

  .sidebar-left > .bottom svg {
    font-size: 1.414em;
    color: white;
  }

  .sidebar-left> .bottom svg:hover {
    color: #60FDD4;
  }

  .highlight svg {
    color: #54DEB7 !important;
  }

  .highlight {
    background-color: #22222a;
  }

  .sidebar-left ul {
    list-style-type: none;
    padding: 0;
    display:inline-block;
    margin: 0;
  }

  .sidebar-left li {
    width: 4em;
    padding: 0.707em 0;
    color: #fff;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    text-align: center;
  }

  .sidebar-left a {
    color: #fff;
  }

  .sidebar-left li:hover svg {
    color: #60FDD4;
  }

  .sidebar-left svg {
    font-size: 1.414em;
  }

  .sidebar-left li.selected svg {
    color: #60FDD4;
  }


  .sidebar-left a:hover {
    color: #fff;
  }

  .sidebar-left ul li span {
    display: block;
    font-size: 0.8em;
    color: white;
  }


  .sidebar-left li.selected {
    border-left: 1vh solid #66fcf1;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }


</style>
