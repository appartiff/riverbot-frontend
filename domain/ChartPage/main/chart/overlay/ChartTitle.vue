<template>
  <div class="overlay">
      <p>{{this.title}}</p>
    <p><span :class="sumColor">{{this.trend}}</span></p>
  </div>
</template>
<script>
    import {mapState} from "vuex";
    export default
    {
        props: {
            titleProp:{required: true,type:String},
            trendProp:{required: true,type:Object},
        },
        data() {
            return {}
        },
        computed: {
            ...mapState('chartNavigation', [
                'selectedNav'
            ]),
            title()
            {
                return this.titleProp;
            },
            sumColor()
            {
                return  this.trendProp.sum > 0 ? 'positive' : this.trendProp.sum < 0 ? 'negative':'';
            },
            trend()
            {
                return  `${this.trendProp.sum} (${this.trendProp.trend})`;
            },

        },
        methods:
            {
            }
    }
</script>

<style scoped>

  .positive
  {
   color:green;
  }
  .negative
  {
    color:red;
  }
  .overlay
  {
    position: absolute;
    margin-top: 0.4em;
    margin-left:1em;
    z-index: 1;
  }
  .overlay > p
  {
    margin-top: 0;
    margin-bottom: 0.4em;
    font-size: 1.25em;
    color:white;
    display:table;
  }
  p > span
  {
    font-size: 1.25em;
    display: table-cell;
    vertical-align: middle;

  }

</style>
