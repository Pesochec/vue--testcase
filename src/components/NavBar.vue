<template>
  <div class="header">
    <div class="header__topmnu d-flex align-items-center">
      <div class="header__topmnu-logo">
        <a href="/" class>
          <img src="../assets/logo.png" width="30" height="30" alt>
          ЖКХ
        </a>
      </div>
      <div class="header__topmnu-profile ml-auto">
        <a
          class="header__topmnu-profile--avatar dropdown-toggle"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          <span class="header__topmnu-profile--avatar-img">
            <img :src="user.avatar" class="img-fluid avatar-user" alt>
          </span>
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <router-link class="dropdown-item" to="/"><font-awesome-icon :icon="['fas', 'user']" /> Профиль</router-link>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" @click.prevent="onLogout" v-if="isUserLoggedIn"><font-awesome-icon :icon="['fas', 'sign-out-alt']" /> Выйти</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    onLogout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/");
    }
  },
  computed: {
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>

<style lang="scss">
.green-dot {
}
.header {
  .dropdown-menu {
    padding: 5px 0px;
    color: #757575;
    font-size: 14px;
    border-radius: 5px;
    margin: 5px 0 0;
    a {
      padding: 10px 10px;
      display: block;
      margin: 5px 0;
    }
  }
  &__topmnu {
    background: #3f51b5;
    min-height: 60px;
    padding: 0 15px;
    &-logo {
      a {
        color: #fff;
        text-decoration: none;
      }
    }
    &-profile {
      &--avatar {
        position: relative;
        padding: 14px 7px;
        display: block;
        cursor: pointer;
        background: #354488;
        &:hover {
          background: #354499;
        }
        &-img {
          display: block;
          width: 30px;
          max-width: 30px;
          max-height: 30px;
          border-radius: 50%;
          overflow: hidden;
          position: static;
          &:after {
            content: "";
            width: 10px;
            height: 10px;
            display: block;
            background-color: #4caf50;
            bottom: 13px;
            right: 8px;
            border: 2px solid #fff;
            position: absolute;
            border-radius: 50%;
            z-index: 9999999;
          }
          img {
            border-radius: 1000px;
            width: 30px;
            min-height: 30px;
          }
        }
        &:after {
          display: none;
        }
      }
    }
  }
}
</style>