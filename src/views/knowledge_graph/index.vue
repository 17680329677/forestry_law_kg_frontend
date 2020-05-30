<template>
  <div class="app-container">
<!--    <div id="main" :style="{width: '300px', height: '300px'}"></div>-->
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="实体名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form.name)">查询</el-button>
      </el-form-item>
    </el-form>

    <el-divider></el-divider>

    <div id="main" style="width:1000px;height:800px">

    </div>
  </div>
</template>

<script>
import { getDrawInfo } from '@/api/drawKG'
export default {
  data() {
    return {
      form: {
        name: '',
      }
    }
  },
  mounted() {
    // this.drawLine()
  },
  methods: {

    onSubmit (entityName) {
      getDrawInfo(entityName).then(res => {
        if (res.code === 0) {
          var data = res.data
          var keys = Object.keys(data)
          if (keys.length > 0) {
            var categories = [];
            var node_data = [
              {
                name: entityName,
                des: entityName,
                symbolSize: 70,
                category: 0,
              },
            ];
            var linked_data = [];
            for (var i = 0; i < keys.length; i++) {
              var k = keys[i]
              data[k] = [...new Set(data[k])]
              categories[i] = keys[i];
              for (var j = 0; j < data[k].length; j++) {
                var tmp_node = {
                  name: data[k][j],
                  des: data[k][j],
                  symbolSize: 50,
                  category: i
                }
                var tmp_link = {
                  source: node_data[0].name,
                  target: data[k][j],
                  name: k,
                  des: k
                }
                node_data.push(tmp_node)
                linked_data.push(tmp_link)
              }
            }
            console.log(node_data)
            console.log(linked_data)
            this.drawLine(node_data, linked_data, categories)
          }
        } else if (res.code === 1001) {
          Message({
            message: res.message,
            type: 'error',
            duration: 3 * 1000
          })
        }
      })
    },

    drawLine (node_date, linked_data, category) {
      var echarts = require('echarts');
      var myChart = echarts.init(document.getElementById('main'));
      // var categories = [];
      // for (var i = 0; i < 2; i++) {
      //   categories[i] = {
      //     name: '类目' + i
      //   };
      // }

      var option = {
        // 图的标题
        title: {
          text: 'ECharts 关系图'
        },
        // 提示框的配置
        tooltip: {
          formatter: function (x) {
            return x.data.des;
          }
        },
        // 工具箱
        toolbox: {
          // 显示工具箱
          show: true,
          feature: {
            mark: {
              show: true
            },
            // 还原
            restore: {
              show: true
            },
            // 保存为图片
            saveAsImage: {
              show: true
            }
          }
        },
        legend: [{
          // selectedMode: 'single',
          data: category.map(function (a) {
            return a.name;
          })
        }],
        series: [{
          type: 'graph', // 类型:关系图
          layout: 'force', //图的布局，类型为力导图
          symbolSize: 40, // 调整节点的大小
          roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [2, 10],
          edgeLabel: {
            normal: {
              textStyle: {
                fontSize: 20
              }
            }
          },
          force: {
            repulsion: 2500,
            edgeLength: [10, 50]
          },
          draggable: true,
          lineStyle: {
            normal: {
              width: 2,
              color: '#4b565b',
            }
          },
          edgeLabel: {
            normal: {
              show: true,
              formatter: function (x) {
                return x.data.name;
              }
            }
          },
          label: {
            normal: {
              show: true,
              textStyle: {}
            }
          },

          // 数据
          data: node_date,
          links: linked_data,
          categories: category,
        }]
      };
      myChart.setOption(option)

    }
  }
}
</script>
