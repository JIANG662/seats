<template>
  <div class="schedule-selector">
    <h2>选择场次</h2>
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="rooms.length === 0" class="no-schedules">暂无场次可选。</div>
      <ul v-else>
        <li v-for="room in rooms" :key="room.房间" class="schedule-item">
          <p>电影名称：{{ room.电影名称 }}</p>
          <p>场次时间：{{ room.时间 }}</p>
          <p>影厅：{{ room.房间 }}</p>
          <p>价格：￥{{ room.price }}</p>
          <button @click="selectRoom(room)">选择</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import axios from 'axios';

const pageIndex = inject('pageIndex');
const rooms = ref([]);
// const selectedShow = ref(null);
const film=inject('film')
const show=inject('show')
const user=inject('user')
const error = ref(null);

// 请求场次数据
const fetchRooms = async () => {
  // console.log('fetching rooms...')
  try {
    const response = await axios.get('/api/Showing/ShowingList?user=' + user.value + '&电影名称=' + film.value.电影名称);
   
    if (response.status === 200) {
      // const data = await response.json();
      rooms.value = await response.data;
     
    } else {
      error.value = '获取场次列表失败1: ' + response.statusText;
     
    }
  } catch (err) {
    error.value = '获取场次列表失败2: ' + err.message;
    
    console.error('Error fetching rooms:', err);
  }
};

onMounted(fetchRooms);

// 选择场次
const selectRoom = (room) => {
  alert(`选择了场次: ${room.电影名称}，${room.时间}，影厅: ${room.房间}`);
  // 将选中的场次传递给下一个页面
  show.value=room
  // selectedShow.value = show;
  // console.log("已选择场次:", selectedShow.value);
  pageIndex.value = '4';
};
</script>

<style scoped>
.schedule-selector {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  text-align: center;
}

ul {
  list-style-type: none;
  padding: 0;
}

.schedule-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.schedule-item:last-child {
  border-bottom: none;
}

.schedule-item p {
  margin: 5px 0;
  font-size: 16px;
}

button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #218838;
}

.no-schedules {
  text-align: center;
  font-size: 16px;
  color: #999;
}
</style>
