<template>
  <div class="app-container">
    <div class="nav-buttons">
      <!-- <button @click="pageIndex='1'">登录</button>
      <button @click="pageIndex='2'">电影列表</button>
      <button @click="pageIndex='3'">选择场次</button>
      <button @click="pageIndex='4'">选择座位</button>
      <button @click="pageIndex='5'">我的订单</button> -->
      <button @click="goToPage('1')">登录</button>
      <button @click="goToPage('2')">电影列表</button>
      <button @click="goToPage('3')">选择场次</button>
      <button @click="goToPage('4')">选择座位</button>
      <button @click="goToPage('5')">我的订单</button>
    </div>

    <div class="page-container">
      <div v-if="pageIndex === '1'" class="page-content"><Login @login="handleLogin1" /></div>
      <div v-if="pageIndex === '2'" class="page-content"><Films /></div>
      <div v-if="pageIndex === '3'" class="page-content"><Showing /></div>
      <div v-if="pageIndex === '4'" class="page-content"><Seats /></div>
      <div v-if="pageIndex === '5'" class="page-content"><MySeat /></div>
    </div>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import Login from './components/Login.vue';
import Films from './components/Films.vue';
import Showing from './components/Showing.vue';
import Seats from './components/Seats.vue';
import MySeat from './components/MySeat.vue';
const pageIndex = ref("1");
provide('pageIndex', pageIndex);

const film = ref(null);
provide('film', film);

const show = ref(null);
provide('show', show);

const user = ref(null);
provide('user', user);

const isLoggedIn = ref(false);  // 用户登录状态

// 提供全局共享数据
const selectedFilm = ref(null);  // 选择的电影
const selectedShow = ref(null);  // 选择的场次
const selectedSeats = ref([]);   // 选择的座位
const orderDetails = ref(null);  // 订单详情


provide('isLoggedIn', isLoggedIn);
provide('selectedFilm', selectedFilm);
provide('selectedShow', selectedShow);
provide('selectedSeats', selectedSeats);
provide('orderDetails', orderDetails);

// 页面跳转函数
const goToPage = (page) => {
  if (page !== '1' && !isLoggedIn.value) {
    alert('请先登录');
    return;
  }
  pageIndex.value = page;
};

// 登录成功后更新登录状态
const handleLogin1 = () => {
  isLoggedIn.value = true; // 登录后设置为true
  pageIndex.value = '2'; // 登录成功后跳转到电影列表
};

// 处理订单确认
// const handleOrderConfirmation = () => {
//   orderDetails.value = {
//     film: selectedFilm.value,
//     show: selectedShow.value,
//     seats: selectedSeats.value,
//   };
//   console.log("app的：",orderDetails.value)
//   pageIndex.value = '5';  // 跳转到订单页面
// };
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* 至少占满整个视口高度 */
  background-color: #f0f0f0;
  padding: 20px;
  box-sizing: border-box;
}

.nav-buttons {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.page-container {
  width: 80%; /* 固定宽度 */
  max-width: 1200px; /* 最大宽度 */
  min-height: 80%; /* 至少占满视口高度的80% */
  background-color: #ffffff;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.page-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>