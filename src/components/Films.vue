<template>
  <div class="container" id="app">
    <h2>电影列表</h2>
    <table class="film-table">
      <thead>
        <tr>
          <th>名称</th>
          <th>海报</th>
          <th>电影介绍</th>
          <th>购票</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="film in films" >
          <td>{{ film.电影名称 }}</td>
          <td><img :src="film.照片"  width="100" height="150"></td>
          <td>{{ film.电影介绍 }}</td>
          <td><button @click="buy(film)">购票</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import axios from 'axios';
const pageIndex = inject('pageIndex')
const films = ref([]);
const film = inject('film');
const fetchFilms = async () => {
  try {
    const response = await axios.get('test');
    if (response.status === 200) {
      films.value = response.data;
      
      // console.log("获取电影海报：",films.value)
    } else {
      console.error('获取电影列表失败1: ' + response.statusText);
    }
  
  } catch (err) {
    console.error('获取电影列表失败2: ' + err.message);
  }
};

onMounted(fetchFilms);
// const selectedFilm = ref(null);
const buy = (f) => {
  // console.log(f)
  // alert(`您选择了电影: ${film.value.电影名称}`);
  film.value=f
  // selectedFilm.value = film;
  // console.log("已选电影：",selectedFilm.value)
  pageIndex.value='3'
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.film-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.film-table th,
.film-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.film-table th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #333;
}

.film-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.film-table tr:hover {
  background-color: #f1f1f1;
}

.film-table img {
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
}

.film-table button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.film-table button:hover {
  background-color: #0056b3;
}
</style>