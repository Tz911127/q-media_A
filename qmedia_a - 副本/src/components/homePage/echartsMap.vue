<template>
  <section>
    <div class="echarts">
      <div id="myChartChina" :style="{width: '100%',height:'400px'}" ref="myEchart"></div>
    </div>
  </section>
</template>
<script>
import echarts from "echarts";
import "../../../node_modules/echarts/map/js/china.js"; // 引入中国地图数据
export default {
  props: {
    deviceProvince: {
      type: Array,
      default: () => {}
    }
  },
  name: "echarts",
  data() {
    return {
      chart: null,
      data: []
    };
  },
  created() {},
  mounted() {
    this.city = this.mapList(this.city);
    let deviceProvince = this.deviceProvince;
    for (let i = 0; i < deviceProvince.length; i++) {
      let item = new Object();
      item.name = this.city[deviceProvince[i].group];
      item.value = deviceProvince[i].count;
      this.data.push(item);
    }
    this.chinaConfigure();
  },
  methods: {
    chinaConfigure() {
      let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
      window.onresize = myChart.resize;
      myChart.setOption({
        title: {
          text: "终端分布",
          textStyle: {
            fontSize: 18
          }
        },
        // 进行相关配置
        backgroundColor: "#fff",
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            return (
              "终端数  <br />" +
              params.name +
              " : " +
              (params.value ? params.value : 0)
            );
          }
        }, // 鼠标移到图里面的浮动提示框
        dataRange: {
          show: false,
          min: 0,
          max: 1000,
          text: ["High", "Low"],
          realtime: false,
          calculable: false,
          color: ["#FFC282"]
        },
        geo: {
          // 这个是重点配置区
          map: "china", // 表示中国地图
          roam: true,
          label: {
            normal: {
              show: false, // 是否显示对应地名
              textStyle: {
                color: "red"
              }
            }
          },
          itemStyle: {
            normal: {
              borderColor: "#fff",
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#1F96D9" },
                { offset: 1, color: "#0CD0EE" }
              ])
            },
            emphasis: {
              areaColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#FC2274" },
                { offset: 1, color: "#FFC282" }
              ]),
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,
              borderWidth: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        series: [
          {
            name: "终端数", // 浮动框的标题
            type: "map",
            geoIndex: 0,
            data: this.data
          }
        ]
      });
    },
    mapList(arr) {
      let map = {};
      for (var i in arr) {
        map[arr[i].key] = arr[i].name;
      }
      return map;
    }
  }
};
</script>