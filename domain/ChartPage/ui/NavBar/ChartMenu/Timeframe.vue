<template>
  <div>
    <DropdownButton text="5min" @clicked="$emit('clicked', 'timeframe')" v-bind:class="{selected : selectedDropdown === 'timeframe'}">

    </DropdownButton>
    <transition name="fade">
      <DropdownContainer v-show="selectedDropdown==='timeframe'">
        <DarkBox>
          <div class="field">
            <table>
              <tr>
                <th>Timeframe</th>
              </tr>
              <tr v-for="(asset) in timeframes" :key="asset.value">
                <td>{{asset.timeframe}}</td>
              </tr>
            </table>
          </div>
        </DarkBox>
      </DropdownContainer>
    </transition>
  </div>
</template>

<script>
import {mapState} from "vuex";
import DropdownButton from "@/components/ui/buttons/DropdownButton";
import DropdownContainer from "@/components/ui/Container/DropdownContainer";
import DarkBox from "@/components/ui/box/DarkBox";
export default {
  name: "Timeframe",
  components: {DropdownButton,DropdownContainer,DarkBox},
  props: {
    selectedDropdown: {
      required: true,
    }
  },
  computed: {
    ...mapState('assets', ['timeframes']),
  }
}
</script>

<style lang="scss" scoped>
table {
  table-layout: auto;
  border-collapse: collapse;
  display: block;
  overflow-y: scroll;
  td:first-child,th:first-child{
    border-right: 1px solid $line--color-dark-light;
  }
  td,th{
    padding:0.25rem 1rem;
  }
  th {
    @include font-description;
  }
  td {
    @include font-primary;
  }


}
</style>
