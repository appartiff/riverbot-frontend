<template>
  <div>
    <button @click="$emit('clicked', 'asset')" v-bind:class="{selected : selectedDropdown === 'asset'}" class="dropbtn" id="assets-button">
      BTCUSDT
    </button>
    <transition name="fade">
      <DropdownContainer v-show="selectedDropdown==='asset'">
        <DarkBox>
          <div class="field">
            <RoundedInput icon-right="search" placeholder="Search for Assets" v-model="input"
                          :value="input"></RoundedInput>
          </div>
          <div class="field">
            <table>
              <tr>
                <th>Asset</th>
                <th>Exchange</th>
              </tr>
              <tr v-for="(tickers,index) in getFormattedAssets" :key="index">
                <td>{{tickers.asset}}</td>
                <td>{{tickers.exchange}}</td>
              </tr>
            </table>
          </div>
        </DarkBox>
      </DropdownContainer>
    </transition>
  </div>
</template>

<script>
  import RoundedInput from '../../../../components/ui/input/RoundedInput.vue';
  import DarkBox from '../../../../components/ui/box/DarkBox.vue';
  import DropdownContainer from '../../../../components/ui/Container/DropdownContainer.vue';
  import Form from '../../../../components/ui/form/Form.vue';
  import {mapActions, mapMutations, mapState,mapGetters} from "vuex";
  export default {
    name: "Assets",
    components: {
      RoundedInput,
      DarkBox,
      DropdownContainer,
      Form
    },
    data() {
      return {
        input: ''
      }
    },
    computed:{
      ...mapGetters('assets', ['getFormattedAssets']),
    },

    props: {
      selectedDropdown: {
        required: true,
      }
    }
  }
</script>

<style lang="scss" scoped>

  table {
    table-layout: auto;
    border-collapse: collapse;
    display: block;
    max-height: 400px;
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
    display: block;
    white-space: nowrap;
    height: 5em;
    padding: 0 1em;
    float: left;
  }

  .dropdown {
    position: relative;
    height: 100%;
    display: inline-block;
  }
  .dropbtn:hover {
    background-color: #ddd;
    color: black;
  }
</style>
