<template>
  <div class="login">
    <div class="d-flex align-items-center login-conainer justify-content-center">
      <div class="login__panel">
        <div class="login__brand d-flex justify-content-center">
          <div class="login__brand-container">
            <img src="@/assets/logo.png" class="login__brand-logo" alt>
            <h2 class="login__brand-name">ЖКХ</h2>
          </div>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
    name: 'auth'
  }
</script>