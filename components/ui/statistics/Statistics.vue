<template>
  <div class="statistics-box">
    <table id="table-statistics">
      <tbody>
      <tr>
        <th class="header">Name</th>
        <th class="header">Win Rate</th>
        <th class="header">Reward&divide;Risk</th>
        <th class="header">Patterns Analysed</th>
        <th class="header">Projected Earnings</th>
        <th class="header">
          <button id="myBtn" @click="showModal = true">
            <i class="fas fa-question-circle"></i>
          </button>
        </th>
      </tr>
      <tr v-for="(item,i) in statisticsData" :key="item.pattern" @click="rotate">
        <td class="align-left">
          <i class="fas fa-chevron-right"></i>
          {{item.pattern}}
        </td>
        <td>{{item.winRate}}</td>
        <td>{{item.rR1Average}}</td>
        <td>{{item.amount}}</td>
        <td v-bind:class="projColorCalculated(item.projectedEarnings)">{{item.projectedEarnings}}%</td>
        <td></td>
      </tr>
      </tbody>
    </table>
    <apex-modal v-if="showModal" @close="showModal = false"></Apex-Modal>
  </div>
</template>

<script>
  import axios from 'axios';
  import Modal from './Modal';
  export default {
    components: {
      'apex-modal': Modal
    },
    directives: {
      left: {
        // directive definition
        inserted: function (el) {
          el.focus()
        }
      }
    },
    data()
    {
      return {
        statisticsData: null,
        showModal: false
      }
    },

    methods:
      {
        rotate: function(event)
        {
          event.target.classList.toggle('selected');

          let links = document.querySelectorAll('.selected');
          for (let i = 0; i < links.length; i++)
          {
            if (links[i] === event.target) continue;
            links[i].classList.remove('selected');
          }
        },

        projColorCalculated: function(input)
        {
          function between(x, min, max) {
            return x >= min && x <= max;
          }
          if (between(input, 30, 1000)) {
            return "perfect";
          } else if (between(input, 20, 29.9)) {
            return "good";
          } else if (between(input, 5, 19.9)) {
            return "ok";
          } else if (input === 0) {
            return "NA";
          } else {
            return "bad";
          }
        }
      },
   beforeMount(){
     axios
       .get('/api/statistics/')
       .then(response => {
         console.log(response.data);
         this.statisticsData = response.data;
       });
    },
  }
</script>

<style scoped>
.align-left{
  text-align: left;
}

tr:hover i
{
  color:#fcae66;
}
tr:hover{
  background: rgba(10, 105, 112, 0.2);
}
td > i
{
  margin: 0 0.5em;
}
.selected  > i
{
  color:#fcae66;
  transition: transform .3s ease-in-out;
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  transform: rotate(90deg);
}

</style>
