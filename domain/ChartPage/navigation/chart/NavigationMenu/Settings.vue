<template>
  <div class="dropdown settings-container">
    <button @click="toggle('settings')" :class="{selected : this.selectedNav === 'settings'}" class="dropbtn">
      Settings
    </button>
    <div  v-show="this.selectedNav==='settings'" class="dropdown-content">
        <ul class="navigation-dropdown-list">
          <li @click="update(river)" :class="[highlight(river)]">
            Channel Zones
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        computed: {
            ...mapState('chartNavigation', ['selectedNav']),
            ...mapState('chartPatterns', ['patternsConfig']),
            river() {
                return this.patternsConfig.river.channel.zones;
            },
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
                update: function (value)
                {
                    this.$store.commit('chartPatterns/setDisplayChannel', value);
                },
                toggle: function (category) {
                    this.$store.commit('chartNavigation/setSelectedNav', category);
                }
            },
    }
</script>

<style scoped>
  .settings-container
  {
    border-left: 1px solid #66fcf1;
  }
</style>
