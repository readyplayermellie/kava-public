<template>
  <div class="chart-wrapper">
    <highchart :options="chartOptions"></highchart>
  </div>
</template>

<script>
export default {
  name: 'ColumnChart',
  props: {
    chartData: {
      type: Array,
      attribute: 'chart-data',
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'column',
          events: {
            redraw: function () {
              console.log('am active')
            }
          }
        },
        title: {
          text: "General stats of all devices",
        },
        subtitle: {
          text: 'Categorized by plant'
        },
        xAxis: {
          categories: this.getChartCategories(),
        },
        yAxis: {
          title: {
            text: 'Total amount of stats'
          }
        },
        series: [
          {
            name: "Moist",
            data: this.getChartData('analogSoil'),
            redraw: true,
          },
          {
            name: "Temperature",
            data: this.getChartData('temp'),
            redraw: true,
          },
          {
            name: "Humidity",
            data: this.getChartData('hum'),
            redraw: true,
          }],
        },
    }
  },
  methods: {
    getChartCategories() {
      let categories = [];
      this.chartData.forEach((sensor) => {
        categories.push(sensor.deviceId);
      });
      return categories;
    },
    getChartData(type) {
      let data = [];
      this.chartData.forEach((sensor) => {
        data.push(sensor[type]);
      });
      return data;
    },
  }
}
</script>