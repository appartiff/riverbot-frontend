<template>
  <div class="dropdown patterns-container">
    <button @click="toggle('patterns')" v-bind:class="{selected : selectedNav === 'patterns'}" class="dropbtn"
            id="tools-button">
      <font-awesome-icon icon="shapes"/>
    </button>
    <div id="DropDown" v-show="selectedNav==='patterns'" class="dropdown-content">
      <div>
        <ul class="navigation-dropdown-list">
          <li v-if="value.visible === true" @click="update(name,value.enabled)" v-bind:class="[highlight(value.enabled)]" v-for="(value, name) in patternsConfig" :key="name">
            {{name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState} from "vuex";

  export default {

    computed: {
      ...mapState('chartNavigation', ['selectedNav']),
      ...mapState('chartPatterns', ['patternsConfig'])
    },
    methods:
      {
        highlight: function (i)
        {
          if (i)
          {
            return 'highlight';
          }
        },
        update: function (name, value) {
          this.$store.commit('chartPatterns/setEnabledPattern', {name, value});
        },
        toggle: function (category) {
          this.$store.commit('chartNavigation/setSelectedNav', category);
        }
        ,
      },
  }
</script>

<style scoped>

  .patterns-container
  {
    border-left: 1px solid #66fcf1;
  }
#tools-button
{
  width: 5em;
}
  svg

  {
    font-size: 2em;
  }
</style>
