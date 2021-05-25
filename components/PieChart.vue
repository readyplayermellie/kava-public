<template>
  <div class="chart-wrapper">
    <highchart :options="chartOptions"></highchart>
  </div>
</template>

<script>
export default {
  name: 'PieChart',
  props: {
    chartData: {
      type: Object,
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
      chart: {
        type: 'pie'
      },
      title: {
        text: `${this.chartData.deviceId}`,
      },
      plotOptions: {
        pie: {
          showInLegend: true,
        },
      },
      series: [
        {
          name: "Stats",
          data: [
            {
              name: 'Moist',
              y: this.chartData.analogSoil,
            },
            {
              name: 'Temperature',
              y: this.chartData.temp,
            },
            {
              name: 'Humidity',
              y: this.chartData.hum,
            }
          ],
        }
      ]
    };
  }
}
</script>