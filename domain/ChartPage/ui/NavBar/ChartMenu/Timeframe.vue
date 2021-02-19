<template>
  <div>
    <button @click="$emit('clicked', 'timeframe')" v-bind:class="{selected : selectedDropdown === 'timeframe'}" class="dropbtn" id="timeframe-button">
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
              <tr v-for="(asset,index) in searchAssets" :key="asset.id">
                <td>{{asset.asset}}</td>
                <td>{{asset.exchange}}</td>
              </tr>
            </table>
          </div>
        </DarkBox>
      </DropdownContainer>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Timeframe"
}
</script>

<style lang="scss" scoped>

</style>
