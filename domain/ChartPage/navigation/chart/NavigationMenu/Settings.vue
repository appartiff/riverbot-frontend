<template>
  <dropdown name="Settings">
    <ul class="navigation-dropdown-list">
      <li @click="update(river)" :class="[highlight(river)]">
        Channel Zones
      </li>
    </ul>
  </dropdown>

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

</style>
