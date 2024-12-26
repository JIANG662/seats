<template>
  <div class="my-seat-container">
    <h2>我的订单</h2>
    <div v-if="loading" class="loading">
      <span class="spinner"></span> 加载中...
    </div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <div v-if="tickets.length === 0" class="no-tickets">您还没有购买任何票。</div>
      <div class="ticket-list">
        <div v-for="ticket in tickets" :key="ticket.id" class="ticket-item">
          <h3>{{ ticket.film_name }}</h3>
          <p><strong>影厅：</strong>{{ ticket.room }}</p>
          <p><strong>场次时间：</strong>{{ ticket.showing_tm }}</p>
          <p><strong>座位：</strong>第 {{ ticket.row + 1 }} 排，第 {{ ticket.col + 1 }} 号</p>
          <p><strong>价格：</strong>￥{{ ticket.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 定义响应的状态
const tickets = ref([]);
const loading = ref(true);
const error = ref(null);

// 获取用户的票务信息
const fetchTickets = async () => {
  try {
    const response = await axios.get('/api/Ticket/TicketList');
    console.log('API 返回的数据：', response.data);
    if (response.status === 200 && Array.isArray(response.data)) {
      tickets.value = response.data;
    } else {
      error.value = '获取票务信息失败: 返回的数据格式不正确';
    }
  } catch (err) {
    error.value = '获取票务信息失败: ' + err.message;
    console.error('Error fetching tickets:', err);
  } finally {
    loading.value = false;
  }
};

// 在组件挂载时请求数据
onMounted(fetchTickets);
</script>

<style scoped>
.my-seat-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  margin: 20px auto;
}

h2 {
  margin-bottom: 20px;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  color: #333;
}

.loading {
  text-align: center;
  font-size: 16px;
  color: #999;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 2s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error {
  color: red;
  text-align: center;
  font-size: 16px;
}

.no-tickets {
  text-align: center;
  font-size: 16px;
  color: #999;
}

.ticket-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
}

.ticket-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: calc(33.33% - 20px); /* 每行显示3个票务项 */
  box-sizing: border-box;
  transition: transform 0.3s;
}

.ticket-item:hover {
  transform: scale(1.05); /* 鼠标悬停时放大 */
}

.ticket-item h3 {
  font-size: 18px;
  color: #333;
  margin: 0 0 10px;
}

.ticket-item p {
  font-size: 14px;
  color: #555;
  margin: 5px 0;
}

.ticket-item p strong {
  font-weight: bold;
  color: #333;
}

.ticket-item:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .ticket-item {
    width: 100%; /* 手机屏幕上每个订单占满一行 */
  }
}
</style>
<!-- <template>
  <div class="my-seat-container">
    <h2>我的订单</h2>
    <div v-if="orderDetails">
      <h3>{{ orderDetails.film.name }}</h3>
      <p><strong>影厅：</strong>{{ orderDetails.show.room }}</p>
      <p><strong>场次时间：</strong>{{ orderDetails.show.showing_time }}</p>
      <p><strong>座位：</strong>
        <span v-for="(seat, index) in orderDetails.seats" :key="index">{{ seat.number }}{{ index !== orderDetails.seats.length - 1 ? ', ' : '' }}</span>
      </p>
    </div>
    <div v-else>
      <p>没有订单信息。</p>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const orderDetails = inject('orderDetails');
console.log("有没有？？？————",orderDetails.value)
</script> -->