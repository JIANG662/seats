<template>
    <div class="container">
      <div class="login-box">
        <h2>登 录</h2>
        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label for="username">用户名</label>
            <input 
              type="text" 
              id="username" 
              v-model="username" 
              placeholder="输入用户名" 
              required 
            />
          </div>
          <div class="input-group">
            <label for="password">密码</label>
            <input 
              type="password" 
              id="password" 
              v-model="password" 
              placeholder="输入密码" 
              required 
            />
          </div>
          <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
          <button type="submit">登 录</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { inject, ref,defineEmits } from 'vue';
  const emit = defineEmits();
  const pageIndex = inject('pageIndex');
  const username = ref('1');
  const password = ref('1');
  const errorMessage = ref('');
  
  const handleLogin = () => {
    if (!username.value.trim() || !password.value.trim()) {
      errorMessage.value = '请填充完整信息.';
      return;
    }
  
    if (username.value === '1' && password.value === '1') {
      errorMessage.value = '';
      alert('登陆成功!');
      pageIndex.value = '2';
      emit('login');
    } else {
      errorMessage.value = '用户名或密码错误.';
    }
  };
  </script>
  
  <style scoped>
  /* Basic container styling */
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 20px;
    background-color: #f0f0f0;
    box-sizing: border-box;
  }
  
  /* Login box styling */
  .login-box {
    width: 100%;
    max-width: 400px; /* Limit width for larger screens */
    padding: 20px;
    border-radius: 8px;
    background: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }
  
  h2 {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  input:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .error {
    color: red;
    font-size: 12px;
    margin-bottom: 10px;
  }
  
  button {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  /* Responsive design for desktop and mobile */
  @media (min-width: 768px) {
    .login-box {
      padding: 30px;
      border-radius: 10px;
    }
  
    h2 {
      font-size: 28px;
    }
  
    input {
      padding: 12px;
      font-size: 16px;
    }
  
    button {
      padding: 12px;
      font-size: 18px;
    }
  }
  
  @media (min-width: 1024px) {
    .container {
      padding: 40px;
    }
  
    .login-box {
      max-width: 500px;
    }
  }
  </style>
  