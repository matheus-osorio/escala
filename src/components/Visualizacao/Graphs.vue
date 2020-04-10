<template>
  <div>
    <Graph :data="pieChart" />
  </div>
</template>

<script>
import Graph from "./Graph";
export default {
  components: {
    Graph
  },
  props: ["user", "colors"],
  computed: {
    
    colorsObj(){
        const obj = {}
        this.colors.forEach(color => {
            obj[color.name] = color.color
        })

        return obj
    },
    categorySort() {
      const obj = {};
      for (const day of this.user.status) {
        if (obj[day] === undefined) {
          obj[day] = {
            title: day,
            value: 1
          };
        } else {
          obj[day].value += 1;
        }
      }

      return Object.values(obj);
    },
    pieChart() {
      const categories = this.categorySort
      const colors = this.colorsObj
      const tooltip = {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      }

      const legend = {
        orient: "vertical",
        left: 10,
        data: categories.map(category => category.title)
      }

      const series = {
        name: "Status",
        type: "pie",
        radius: ["50%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center"
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "30",
            fontWeight: "bold"
          }
        },
        labelLine: {
          show: false
        }
      }

      const data = categories.map((category) => {
          return{
              value: category.value,
              name: category.title
          }
      })
      const color = categories.map((category) => {
          return colors[category.title]
      })

      series.data = data
      series.color = color

      const options = {
          tooltip,
          legend,
          series
      }
      return options
    }
  }
};
</script>

<style scoped>
div {
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>