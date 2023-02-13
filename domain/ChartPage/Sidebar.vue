<template>
  <div>
    <transition name="slide-fade">
      <div class="sidebar-left-scanner" v-if="showSidebar">
        <ul>
          <li @click="handleSideBarClick(0)" :class="{highlight : selectedSidebarIndex === 0}">
            <a>
              <font-awesome-icon icon="chart-bar"/>
              <span>Chart</span>
            </a>
          </li>
          <!--          <li @click="handleSideBarClick(1)" v-bind:class="{highlight : selectedSidebarIndex === 1}">-->
          <!--            <a>-->
          <!--              <font-awesome-icon icon="desktop"/>-->
          <!--              <span>Monitor</span>-->
          <!--            </a>-->
          <!--          </li>-->
          <li>
            <a href="https://discord.gg/M4Sg2b3" target="_blank">
              <font-awesome-icon icon="comments"/>
              <span>Chat</span>
            </a>
          </li>
          <!--        <li @click="handleSideBarClick(3)" v-bind:class="{highlight : selectedSidebarIndex === 3}">-->
          <!--          <font-awesome-icon icon="chart-pie" />-->
          <!--          <span>Statistics</span>-->
          <!--        </li>-->
          <li @click="handleSideBarClick(4)" v-bind:class="{highlight : selectedSidebarIndex === 4}">
            <font-awesome-icon icon="tools"/>
            <span>Options</span>
          </li>
        </ul>
        <div class="bottom" @click.stop="toggleShow()">
          <font-awesome-icon icon="chevron-up"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  data() {
    return {}
  },
  components:
    {},
  computed:
    {
      ...mapState('scannerUI', [
        'showSidebar'
      ]),
      ...mapState([
        'selectedSidebarIndex',
      ]),
    },
  methods:
    {
      ...mapMutations('scannerUI', ['setSidebarShow']),
      toggleShow: function () {
        this.setSidebarShow(!this.showSidebar);
        this.callFunction();
      },
      callFunction: function () {
        setTimeout(function () {
          let elements = [
            document.getElementById("chart").getElementsByClassName('canvasjs-chart-canvas'),
            document.getElementById("chart2").getElementsByClassName('canvasjs-chart-canvas'),
            document.getElementById("chart3").getElementsByClassName('canvasjs-chart-canvas'),
            document.getElementById("chart-ao").getElementsByClassName('canvasjs-chart-canvas'),
            document.getElementById("chart-ac").getElementsByClassName('canvasjs-chart-canvas')
          ];
          for (let i = 0; i <elements.length ; i++)
          {
            let cusid_ele = elements[i];
            for (var j = 0; j < cusid_ele.length; ++j) {
              var item = cusid_ele[j];
              item.style.width = '100%';
              if (j === 3) {
                break;
              }
            }
          }

        }, 800);

      },
      handleSideBarClick: function (i) {
        this.$store.commit('setSidebar', i);
      },
      handleMonitorClick: function (i) {
        this.$store.commit('setSidebar', i);
      },
    }
}
</script>
<style lang="scss">

@import '../../assets/css/Mixins';
/*sidebar left side*/
.sidebar-left-scanner {
  background-color: #17171d;
  @include display-flex;
  flex-flow: column;
  height: 100%;
  flex-direction: column;
  border-right: 1px solid;
}

.sidebar-left-scanner > .bottom {
  margin-top: auto;
  text-align: center;
}

.sidebar-left-scanner > .bottom svg {
  font-size: 1.414em;
  padding: 0.707em 0;
  color: white;
}

.sidebar-left-scanner > .bottom svg:hover {
  color: #60FDD4;
}

.highlight svg {
  color: #54DEB7 !important;
}

.highlight {
  background-color: #22222a;
}

.sidebar-left-scanner ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar-left-scanner li {
  width: 4em;
  padding: 0.707em 0;
  color: #fff;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
}

.sidebar-left-scanner a {
  color: #fff;
}

.sidebar-left-scanner li:hover svg {
  color: #60FDD4;
}

.sidebar-left-scanner svg {
  font-size: 1.414em;
}

.sidebar-left-scanner li.selected svg {
  color: #60FDD4;
}


.sidebar-left-scanner a:hover {
  color: #fff;
}

.sidebar-left-scanner ul li span {
  display: block;
  font-size: 0.8em;
  color: white;
}


.sidebar-left-scanner li.selected {
  border-left: 1vh solid #66fcf1;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}


.monitor-tabs li {
  display: inline-block;
  padding: 0.7em 0;
  color: #95b8fd;
  font-size: 1.25em;
  width: 33%;
  border-top: 1px solid black;
  border-bottom: 2px black solid;
}

.monitor-tabs > .active {
  border-bottom: 0.1em solid #66fcf1;
}


.active-trades-footer i {
  color: #95b8fd;
}

.active-trades-footer i:hover {
  color: #fff;
}

.panel div ul:hover {
  background-color: #2d3041;
}

.panel > div > ul > li {
  display: inline-block;
}

.active-ul span {
  color: white;
}

.panel li {
  white-space: nowrap;
  font-size: 1em;
  padding: 5px;
  color: white;
  vertical-align: middle;
  list-style-type: none;
}

.panel span
{
  -webkit-user-select: none;
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
  -ms-user-select: none;
  /* IE10+/Edge */
  user-select: none;
  /* Standard */
}

.panel-info {
  width: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}

.panel-info ul {
  background-color: #181a23;
}

.panel-info li {
  padding-left: 10px;
}

.active-ul {
  background-color: #222431;
}

.panel div ul {
  border-bottom-color: black;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  padding: 0;
  margin: 0;
}

.panel div li i {
  vertical-align: middle;
  padding: 0 0.2em;
}

.panel-info span {
  color: #bfbebe;
}

h4 {
  color: #fff;
}

/*# sourceMappingURL=Sidebar_Left.css.map */

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}


.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
