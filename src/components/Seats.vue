<template>
  <div class="container" id="app">
    <div class="row">
      <div class="col-md-6">
        <!-- 左上半部分：座位行 -->
        <div class="seat-wrapper">
          <ul>
            <li id="screen">
              <h1>屏幕</h1>
            </li>
            <hr />
            <li
              class="seat"
              v-for="(item, index) in seatflag"
              :key="index"
              :class="{
                seatNo: seatflag[index] === -1,
                seatSpace: seatflag[index] === 0,
                seatActive: seatflag[index] === 1,
                seatNouse: seatflag[index] === 2,
              }"
              @click="handleSeatClick(index)"
            ></li>
          </ul>
        </div>
        <div class="row">
          <!-- 座位提示 -->
          <hr />
          <div class="notice-wrapper">
            <div class="seat seatActive"></div>
            <span class="notice">已选座位</span>
            <div class="seat seatSpace"></div>
            <span class="notice">可选座位</span>
            <div class="seat seatNouse"></div>
            <span class="notice">售出座位</span>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <!-- 电影信息展示 -->
        <div class="film-info">
          <img
            v-if="film.照片"
            :src="film.照片"
            alt="海报"
            class="film-poster"
          />
          <h4 class="film-name">{{ film.电影名称 }}</h4>
          <p class="film-description">{{ film.电影介绍 }}</p>
        </div>
        <!-- 座位选择提示 -->
        <div class="seat-selection">
          <p>已选择座位：<span>{{ selectedSeats.join(", ") }}</span></p>
          <p>总票数：<strong>{{ selectedSeats.length }}</strong></p>
          <button @click="submitOrder" class="btn btn-success">确认信息，下单</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref,defineEmits } from "vue";


const pageIndex = inject('pageIndex')
// 定义事件
const emit = defineEmits();
// const films = ref();
const film = inject('film');

const seatflag = ref([
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
]);

const selectedSeats = ref([]);

const handleSeatClick = (index) => {
  if (seatflag.value[index] === 0 && selectedSeats.value.length < 5) {
    seatflag.value[index] = 1;
    selectedSeats.value.push(index + 1); // 添加座位
  } else if (seatflag.value[index] === 1) {
    seatflag.value[index] = 0;
    const seatIndex = selectedSeats.value.indexOf(index + 1);
    selectedSeats.value.splice(seatIndex, 1); // 移除座位
  }
};

const submitOrder = () => {  
  // console.log("selectedShow:", selectedShow.value);
  alert(`确认订单，已选择座位：${selectedSeats.value.join(", ")}`);
  // console.log("submit的：",selectedSeats.value)
  // console.log("触发父组件事件: confirmOrder");
  // emit('confirmOrder');
  pageIndex.value='5'
};
</script>

<style scoped>
#app {
  margin: 50px auto;
}

#app ul {
  list-style: none;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#app ul #screen {
  text-align: center;
  letter-spacing: 30px;
}

.seat-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.seat {
  width: 30px;
  height: 30px;
  background-color: bisque;
  margin: 5px;
  cursor: pointer;
}

.seatActive {
  background: url("/img/bg.png") 1px 0px;
}

.seatSpace {
  background: url("/img/bg.png") 1px -29px;
}

.seatNouse {
  background: url("/img/bg.png") 1px -56px;
}

.seatNo {
  background: url("/img/bg.png") 1px -84px;
}

.notice-wrapper {
  display: flex;
  align-items: center;
}

.notice {
  margin-left: 10px;
  font-size: 14px;
}

.film-info {
  text-align: center;
}

.film-poster {
  width: 100px;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
}

.film-name {
  font-size: 18px;
  font-weight: bold;
}

.film-description {
  font-size: 14px;
}

.seat-selection {
  margin-top: 20px;
  text-align: center;
}

button {
  margin-top: 10px;
}
</style>
