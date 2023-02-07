<template>
  <div class="background">
    <h2>Monitor - In development</h2>
    <div class="monitor-main">

<!--      <div>-->
<!--      <table class="monitor-table">-->

<!--      </table>-->
<!--        <div class="table-container">-->
<!--          <table class="monitor-table tbody">-->
<!--            <thead>-->
<!--            <tr>-->
<!--              <th>Exchange</th>-->
<!--              <th>Asset</th>-->
<!--              <th>Timeframe</th>-->
<!--              <th>Status</th>-->
<!--              <th>Date</th>-->
<!--            </tr>-->
<!--            </thead>-->
<!--            <tbody>-->

<!--            </tbody>-->
<!--          </table>-->
<!--        </div>-->

<!--      </div>-->

    </div>
  </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        data() {
            return {
                monthNames: [
                    "January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"
                ],
            }
        },
        computed: {
            ...mapState('scannerMonitor', ['patterns',]),

        },
        methods:
            {
                ...mapActions('scannerMonitor', ['getPatterns']),
                determinedStatus: function (status)
                {
                    if (status.success && status.active) {
                        return 'Complete';
                    }
                    if (status.success) {
                        return 'Success';
                    }
                    if (status.failed) {
                        return 'Failed';
                    }
                    if (status.active) {
                        return 'Active';
                    }
                    return '';
                },
                getDate:function(date)
                {
                    return this.formatDate(new Date(date));
                },
                formatDate:function (date)
                {
                    var  hours = date.getHours();
                    var minutes = date.getMinutes();
                        var day = date.getDate();
                        var monthIndex = date.getMonth();
                        var year = date.getFullYear();
                        return   day + ' ' + this.monthNames[monthIndex] + ' ' + year;
                    }

            },
        mounted() {
            this.getPatterns(100);
        }
    }
</script>

<style scoped>
  .background {
    background-color: #1b1b23;
    width: 100%;
    height: 100%;
    padding: 1em 0;
    display: flex;
  }

  .monitor-main
  {
    margin: 1em;
    border-radius: 15px;
    height: 100%;
  }
.table-container
{
  height: 800px;
  overflow: auto;
  overflow-x: hidden;  /* Hide the horizontal scroll */
}
  .monitor-table
  {
    width: 1500px;
    margin: 1em;
  }


  .monitor-table
  {
    table-layout: fixed;
    display: table;
    margin:0;
    border-spacing: 0;
  }
  .tbody{
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .monitor-table th, .monitor-table td {
    text-align: center;
    font-size: 1em;
    overflow: hidden;
    color: #fff;
    width: 16.6%;
    border-bottom: 1px solid #1b1b1b;
    padding: 0.38em 0;
    white-space:nowrap
  }

  .monitor-table th {
    background-color: black;
  }

  .Active
  {
color:#f5af6a!important;
  }
  .Success
  {
    color:#54DEB7!important;
  }
  .Complete
  {
color:#6af4f5!important;
  }
  .Failed
  {
    color:#f56a6a!important;
  }
  .monitor-table td {
    background-color: #22222a!important;
  }

</style>
