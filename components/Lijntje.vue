<template>
  <div class="chart-wrapper">
    <highchart :options="chartOptions"></highchart>
  </div>
</template>

<script>
export default {
  name: 'Lijntje',
  props: {
    chartData: {
      type: Array,
      attribute: 'chart-data',
    }
  },
  data() {
    return {
      chartOptions: {},
    }
  },
  async created() {
    this.chartOptions = {
      title: {
        text: "line most levels",
      },
                  chart: {
                zoomType: 'x'
            },
      yAxis: {
        title: {
            text: 'moist level'
        }
      },
      xAxis: {
          type: 'datetime',
          accessibility: {
              rangeDescription: 'time'
          }
      },
      series: this.chartData.map(elm =>{
        return {
          name: elm.deviceId,
          data: elm.telemetry.map(metric => [new Date(metric.date).getTime(),metric.analogSoil])
        }
      }),
    };
  },
  methods: {
    getChartData() {
      let data = [];
      this.chartData.forEach((sensor) => {
        const dataObj = {
          name: sensor.deviceId,
          y: sensor.analogSoil,
        }
        data.push(dataObj);
      })
      return data;
    }
  }
}
</script>