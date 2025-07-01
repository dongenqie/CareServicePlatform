<script>
export default {
  name: "Drap",
  data() {
    return {
      // 保存拖拽的元素的列表
      componentsList: [
        {
          id: 11,
          name: "团队1",
          imgUrl:
            "http://img2.3png.com/68604d0c41a6cbc132055d03bbfade602ff7.png",
          sort: 1,
          identifier: 666,
          position: {
            x: 100,
            y: 100,
            w: 80,
            h: 120,
            bg: "#ffffff",
          },
          style: {},
          temp: {
            position: {
              x: 100,
              y: 100,
            },
          },
        },
      ],
      //   元件库
      drapLeftElList: [
        {
          id: 11,
          name: "团队1",
          imgUrl:
            "http://img2.3png.com/68604d0c41a6cbc132055d03bbfade602ff7.png",
          sort: 1,
          position: {
            x: 0,
            y: 0,
            w: 80,
            h: 120,
            bg: "#fff",
          },
          temp: {
            position: {
              x: 0,
              y: 0,
            },
          },
        },
        {
          id: 13,
          name: "团队2",
          imgUrl:
            "http://img2.3png.com/68604d0c41a6cbc132055d03bbfade602ff7.png",
          sort: 2,
          position: {
            x: 0,
            y: 0,
            w: 80,
            h: 120,
            bg: "#fff",
          },
          temp: {
            position: {
              x: 0,
              y: 0,
            },
          },
        },
        {
          id: 14,
          name: "团队3",
          imgUrl:
            "http://img2.3png.com/68604d0c41a6cbc132055d03bbfade602ff7.png",
          sort: 3,
          position: {
            x: 0,
            y: 0,
            w: 80,
            h: 120,
            bg: "#fff",
          },
          temp: {
            position: {
              x: 0,
              y: 0,
            },
          },
        },
        {
          id: 15,
          name: "团队4",
          imgUrl:
            "http://img2.3png.com/68604d0c41a6cbc132055d03bbfade602ff7.png",
          sort: 3,
          position: {
            x: 0,
            y: 0,
            w: 80,
            h: 120,
            bg: "#fff",
          },
          temp: {
            position: {
              x: 0,
              y: 0,
            },
          },
        },
      ],
      identifier: "", // 当前项的 唯一标识
      curControl: null, //
      flag: "",
      containerMoveObj: {
        type: "",
        x: "",
        y: "",
      },
    };
  },
  methods: {
    // 点击画布的时候, 取消选择组件
    laryerMouseDown() {
      console.log("laryerMouseDown");
      this.curControl = null;
    },
    // 给画布绑定的mousemove事件
    laryerMouseMove(ev) {
      // 判断是需要移动的类型
      if (this.flag == "move") {
        // 用当前移动的距离减去点击的位置
        let dx = ev.pageX - this.containerMoveObj.x,
          dy = ev.pageY - this.containerMoveObj.y;

        // 上次旧的位置加上 处理完的距离就得到当前位置
        let x = this.curControl.temp.position.x + dx,
          y = this.curControl.temp.position.y + dy;
        // 这里只是让元素跟着鼠标移动, 如果再这里直接赋值
        this.curControl.position.x = x;
        this.curControl.position.y = y;
      }
    },
    // 给画布绑定的mouseup事件
    laryerMouseUp() {
      // 在鼠标抬起的时候判断是否
      if (this.flag == "") {
        return false;
      }
      const x = this.curControl.position.x;
      const y = this.curControl.position.y;
      // 这里才是实际给元素位置赋值的地方！！！！
      // 查询是否有对应的模块然后, 对应的赋值
      this.componentsList.forEach((item) => {
        if (item.identifier == this.identifier) {
          console.log(item, "找到了");

          item.temp.position.x = x;
          item.temp.position.y = y;

          item.position.x = x;
          item.position.y = y;
        }
      });

      this.flag = "";
    },

    // 拖拽元素
    handleDrapEvList(event, value) {
      let { offsetX, offsetY } = event;
      var infoJson = JSON.stringify({
        ...value,
        position: {
          ...value.position,
          x: offsetX,
          y: offsetY,
        },
      });
      //   将数据绑定到dataTransfer身上
      event.dataTransfer.setData("drapData", infoJson);
    },
    // 监听拖拽元素结束
    handleDrap(event) {
      event.preventDefault();
      const value = event.dataTransfer.getData("drapData");
      //   获取绑定到拖拽元素身上的 drapData属性
      if (value) {
        let drapData = JSON.parse(value);
        const { position } = drapData;
        const identifier = Math.floor(Math.random() * 10000);
        this.componentsList.push({
          ...drapData,
          identifier,
          position: {
            ...position,
            x: event.offsetX - position.x,
            y: event.offsetY - position.y,
          },
          temp: {
            position: {
              x: event.offsetX - position.x,
              y: event.offsetY - position.y,
            },
          },
        });
      }
    },
    // 点击元素获取组件配置
    handleClickTarget(row, index) {
      console.log(row);
      this.identifier = row.identifier;
      this.curControl = row;
    },

    // 移动元素
    handleMouseDown(e, row, index) {
      this.flag = "move";
      // 获取组件配置, 为接下来的属性配置做准备
      this.handleClickTarget(row, index);
      e = e || window.event;

      // 记录下当前点击的位置
      this.containerMoveObj.x = e.pageX;
      this.containerMoveObj.y = e.pageY;
    },
  },
};
</script>
<template>
  <div class="box">
    <!-- 左侧拖拽组件 -->
    <!-- v-if="false" -->
    <div class="drap">
      <!-- <p>元素</p> -->
      <!-- 
            @dragstart  < -- 是元素开始拖拽的时候触发
            draggable="true"  < -- 为了使元素可拖动，把 draggable 属性设置为 true ：
            @dragover.prevent < -- 阻止浏览器默认行为，不然会显示一个叉叉，不好看, 加上会显示一个添加的符号
         -->
      <div
        v-for="(item, index) in drapLeftElList"
        class="drap-item"
        :key="index"
        @dragstart="handleDrapEvList($event, item)"
        @dragover.prevent
        draggable="true"
      >
        <img
          class="drap-item-img"
          draggable="false"
          :src="item.imgUrl"
          :alt="item.name"
        />
        <div class="drap-item-name">{{ item.name }}</div>
      </div>
    </div>
    <!-- 主体部分 -->
    <div
      class="drap-container"
      @dragover.prevent
      @mousedown="laryerMouseDown"
      @mousemove="laryerMouseMove"
      @mouseup="laryerMouseUp"
      @drop="handleDrap"
    >
      <h1>画布</h1>
      <div
        v-for="(item, index) in componentsList"
        class="drap-container-item"
        :class="{
          'drap-container-item-active':
            curControl && item.identifier == curControl.identifier,
        }"
        :key="index"
        :style="{
          top: `${item.position.y}px`,
          left: `${item.position.x}px`,
          width: `${item.position.w}px`,
          height: `${item.position.h}px`,
          'background-color': `${item.position.bg}`,
        }"
        @mousedown.stop="handleMouseDown($event, item, index)"
      >
        <img
          class="drap-item-img"
          :src="item.imgUrl"
          draggable="false"
          :alt="item.name"
        />
        <div class="drap-item-name">{{ item.name }}</div>
      </div>
    </div>
    <!-- 属性配置 -->
    <div class="drap-right" style="width: 300px; height: 100%">
      <h2>属性配置</h2>
      {{ identifier }}
      <br />
      {{ curControl }}
      <br />
      {{ containerMoveObj }}
    </div>
  </div>
</template>



<style lang="scss">
.box {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  height: 500px;
  .drap {
    width: 300px;
    height: 500px;
    background: #f2f2f2;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    cursor: pointer;
    .drap-item {
      height: 120px;
      margin-right: 20px;
      .drap-item-img {
        display: block;
        width: 80px;
        height: 80px;
      }
      .drap-item-name {
        text-align: center;
      }
    }
  }
  .drap-container {
    flex: 1;
    height: 500px;
    background: #ccc;
    position: relative;

    .drap-container-item {
      -webkit-user-select: none;
      -moz-user-select: none;
      -o-user-select: none;
      user-select: none;
      position: absolute;
      user-select: none;
      cursor: pointer;
      border: 1px solid transparent;
      .drap-item-img {
        display: block;
        width: 100%;
        // height: 80px;
        user-select: none;
      }
      .drap-item-name {
        text-align: center;
      }
    }
    .drap-container-item-active {
      border: 1px solid skyblue;
    }
  }
}
</style>
