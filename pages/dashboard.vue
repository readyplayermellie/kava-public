<template>
  <div>
    <div class="container">
      <div>
        <h1 class="title">
          {{ title }}
        </h1>
        <!-- Added not polling that its not refreshing the components everytime -->
        <div v-if="$fetchState.pending && !polling " class="corners ButtonWrpapper">
          <div class="corner corner--1"></div>
          <div class="corner corner--2"></div>
          <div class="corner corner--3"></div>
          <div class="corner corner--4"></div>
        </div>
        <p v-else-if="$fetchState.error">Pardon out dust. we are trying to fix it...</p>
        <div class="float-left" v-else>
          <label>Enable polling: <input type="checkbox" @change="togglePolling" v-model="polling"> Polling is: {{ polling ? 'Active' : 'Inactive' }}</label>
          <p v-if="polling">For {{ this.timerCount }} seconds</p>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="sensor of lifeSensorsData " :key="sensor.deviceId">
              <div class="card">
                <div>
                  <img src="../assets/plant-pot.png" class="plant-img">
                  <p>Plant name: {{sensor.deviceId}}</p>
                  <div class="inline-block">
                    <p>Active moisture level: {{sensor.analogSoil}}</p>
                  </div>
                  <div class="inline-block">
                    <meter v-bind:id="sensor.deviceId+'moist'" min="0" max="1024" low="100" high="600" optimum="400" v-bind:value="sensor.analogSoil"> 
                    at {{sensor.analogSoil}}/1024 </meter>
                  </div>
                </div>
                <div>
                  <div class="inline-block">
                    <p>Active temperature: {{sensor.temp}}</p>
                  </div>
                  <div class="inline-block">
                    <meter v-bind:id="sensor.deviceId+'temp'" min="0" max="100" low="10" high="40" optimum="20" v-bind:value="sensor.temp"> 
                    at {{sensor.temp}}/100 </meter>
                  </div>
                </div>

                <div>
                  <div class="inline-block">
                    <p>Active humidity: {{sensor.hum}}</p>
                  </div>
                  <div class="inline-block">
                    <meter v-bind:id="sensor.deviceId+'hum'" min="0" max="100" low="20" high="60" optimum="30" v-bind:value="sensor.hum"> 
                    at {{sensor.hum}}/100 </meter>
                  </div>
                </div>
              </div>
              <client-only>
                <PieChart :chart-data="sensor"/>
              </client-only>
            </div>
          </div>
          <client-only>
            <AllPlantsColumnChart :chart-data="lifeSensorsData"/>
            <Lijntje :chart-data="historyData"/>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AllPlantsColumnChart from '@/components/AllPlantsColumnChart.vue';
import PieChart from '@/components/PieChart.vue';
import Lijntje from '@/components/Lijntje.vue';

export default {
  components: {
    AllPlantsColumnChart,
    PieChart,
    Lijntje,
  },
  data() {
    return {
      title: 'Kava Dashboard',
      lifeSensorsData: [],
      historyData:[],
      polling: false,
      intervalID: 0, // Not something to show on screen
      timerCount: 5,
    }
  },
  methods: {
    startCountDown() {
      let counter = 5;
      const interval = setInterval(() => {
        this.timerCount = counter--;
        if (counter < 1) {
          clearInterval(interval);
        }
      }, 1000);
    },
    togglePolling: function () {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
      if(this.polling){
        console.log ('interval is active');
        this.intervalID = setInterval(function(){
          //Resync data
          this.$fetch();
          this.startCountDown();
        }.bind(this), 5*1000); //5seconds
      }
    },
  },
  async fetch() {
      this.lifeSensorsData = await fetch(
        `${process.env.BEHOST}/api/getLifeData`
      ).then(res => res.json());
      //For now to skip the polling :D
      if(!this.polling){
        this.historyData = await fetch(
          `${process.env.BEHOST}/api/getHistory`
        ).then(res => res.json());
      }
    }
  }
</script>

<style scoped>
.card {
  -webkit-box-shadow: -1px 5px 16px -4px #015108; 
  box-shadow: -1px 5px 16px -4px #015108;
  margin: 20px;
  margin-bottom: 50px;
  padding: 15px;
  border-radius: 10px;
}

.plant-img {
  height: 100px;
  margin: auto;
  padding: 10px;
}
</style>