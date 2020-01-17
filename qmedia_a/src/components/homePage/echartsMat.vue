<template>
  <section>
    <div class="content">
      <div class="left">
        <div class="pro">
          <span>待审核节目</span>
          <br />
          <span>{{proCount}}</span>
        </div>
        <div class="mat">
          <span>待审核素材</span>
          <br />
          <span>{{matCount}}</span>
        </div>
      </div>
      <div class="right">
        <div id="echarts"></div>
        <div class="status clearfix">
          <ul class="clearfix">
            <li>
              <div>异常</div>

              <div>{{exception}}</div>
            </li>
            <li>
              <div>停用</div>
              <div>{{disabled}}</div>
            </li>
            <li>
              <div>已删</div>
              <div>{{del}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
var echarts = require("echarts");
export default {
  props: {
    state: {
      type: Object,
      default: () => {}
    },
    disabled: {
      type: Number,
      default: () => {}
    },
    del: {
      type: Number,
      default: () => {}
    },
    exception: {
      type: Number,
      default: () => {}
    },
    platformCheckPendingType: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      data: [{ value: 0, name: "离线" }, { value: 0, name: "在线" }],
      total: 0,
      proCount: 0,
      matCount: 0,
      isCollapse: ""
    };
  },
  methods: {
    getOption() {
      let state = this.state;
      this.data[0].value = state[0];
      this.data[1].value = state[1];
      var data = this.data;
      this.total = state[0] + state[1];
      var myChart = echarts.init(document.getElementById("echarts"));
      myChart.setOption({
        title: { text: "终端" },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        toolbox: {},
        legend: {
          // orient: "vertical",
          // x: "right",
          data: ["在线", "离线"],
          icon: "circle",
          formatter: function(name) {
            let target;
            for (let i = 0; i < data.length; i++) {
              if (data[i].name === name) {
                target = data[i].value;
              }
            }
            let arr = ["{a|" + target + "}", "{b|" + name + "}"];
            // return arr.join("\n");
            return arr.join("");
          },
          textStyle: {
            rich: {
              a: {
                fontSize: 14,
                color: "rgba(14, 26, 33, 1)",
                padding: 10
              },
              b: {
                fontSize: 14,
                color: "rgba(183, 183, 183, 1)",
                padding: 10
              }
            }
          },

          top: 10
        },
        color: [
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#F99619" },
            { offset: 1, color: "#FC147F" }
          ]),
          new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#57C848" },
            { offset: 1, color: "#4BA3E9" }
          ])
        ],
        graphic: [
          {
            //环形图中间添加文字
            type: "text", //通过不同top值可以设置上下显示
            left: "center",
            top: "50%",
            style: {
              text: this.total,
              textAlign: "center",
              fill: "#000", //文字的颜色
              width: 80,
              height: 40,
              fontSize: 28,
              color: "rgba(14, 26, 33, 1)"
              // fontFamily: "Microsoft YaHei"
            }
          },
          {
            type: "text",
            left: "center",
            top: "65%",
            style: {
              text: "总量",
              textAlign: "center",
              fill: "rgba(183, 183, 183, 1)",
              width: 30,
              height: 30,
              fontSize: 16
            }
          }
        ],
        series: [
          {
            name: "终端",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            center: ["50%", "60%"],
            label: {
              normal: {
                show: false
                // position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "12",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.data
          }
        ]
      });
    }
  },
  created() {
    this.$nextTick(this.getOption);
    this.matCount = this.platformCheckPendingType[0];
    this.proCount = this.platformCheckPendingType[1];
    this.$root.eventHub.$on("isCollapse", isCollapse => {
      this.isCollapse = isCollapse;
    });
  }
};
</script>
<style >
.content {
  display: flex;
}
.left {
  width: 30%;
}
.right {
  width: 70%;
}
.left .pro,
.left .mat {
  height: 150px;
  color: #fff;
  padding: 20px;
}
.left .pro {
  background: url("../../img/program.png") no-repeat;
  background-size: contain;
  margin-bottom: 10px;
}
.left .mat {
  background: url("../../img/material.png") no-repeat;
  background-size: contain;
}

#echarts {
  background: #fff;
  height: 290px;
  border-radius: 4px;
  margin-left: 14px;
  padding: 10px 20px 10px 10px;
}
.status {
  border-top: 1px rgba(0, 0, 0, 0.2) solid;
  background: #fff;
  border-radius: 0 0 4px 4px;
}
.status ul li {
  float: left;
  width: 33%;
  text-align: center;
  padding: 10px 0;
  list-style: none;
}
.status ul li:nth-child(2) {
  border-left: 1px rgba(0, 0, 0, 0.2) solid;
  border-right: 1px rgba(0, 0, 0, 0.2) solid;
}
.status ul li div:nth-child(1) {
  color: #b7b7b7;
  font-size: 16px;
}
.status ul li div:nth-child(2) {
  color: #0e1a21;
  font-size: 34px;
}
</style>