<template>
  <div>
    <div class="login-form">
      <p class="login__error" v-if="error">{{error}}</p>
      <div class="login-form__input">
        <input
          type="email"
          name="email"
          id="login-email"
          v-validate="'required|email'"
          class="login-form__input-fileds"
          v-model="email"
          value
          onkeyup="this.setAttribute('value', this.value);"
        >
        <label for="login-email" class="float-label">Email</label>
      </div>
      <p v-show="errors.has('email')" class="login__error">Введите правильный email</p>
      <div class="login-form__input">
        <input
          type="password"
          name="password"
          id="login-password"
          class="login-form__input-fileds"
          v-model="password"
          v-validate="'required|min:6'"
          value
          onkeyup="this.setAttribute('value', this.value);"
        >
        <label for="login-email" class="float-label">Пароль</label>
      </div>
      <p v-show="errors.has('password')" class="login__error">Введите пароль не менее 6 символов</p>
      <div class="login-form__submitbutton">
        <button
          type="submit"
          class="btn-primary button-max"
          @click.prevent="onSubmit"
          :disabled="loading"
        >Войти</button>
      </div>
    </div>
    <p class="login__still">Нет аккаунта?
      <router-link to="sign-up">Зарегистрируйтесь.</router-link>
    </p>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions({
      loginUser: "loginUser"
    }),
    onSubmit() {
      this.$validator.validateAll();
      if (!this.errors.any()) {
        const user = {
          email: this.email,
          password: this.password
        };
        this.loginUser(user)
          .then(() => {
            this.$router.push("/");
          })
      }
    }
  },
  computed: {
    ...mapGetters({
      load: "loading",
      use: "user",
      erro: "error"
    }),
    loading() {
      return this.load;
    },
    error() {
      return this.erro;
    },
    user() {
      return this.use;
    }
  }
};
</script>
<style lang="scss" >
a {
  color: #3949ab;
  &:hover {
    color: #3f51b5;
  }
}
.login {
  &__error {
    color: red;
    font-size: 10px;
    display: block;
    margin-top: -6px;
  }
  &__still {
    text-align: center;
    margin-top: 45px 0 30px;
  }
  &:before {
    content: "";
    position: fixed;
    background: #3949ab;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-image: linear-gradient(to bottom, #3949ab 0, #283593 100%);
  }
  &-conainer {
    width: 100%;
    margin: 0 auto;
    height: 100vh;
  }
  &__panel {
    background-color: #fff;
    width: 400px;
    padding: 50px 40px 40px;
    border-radius: 0.286rem;
  }
  .float-label {
    float: left;
    text-align: left;
    transition: all 0.3s;
    font-size: 16px;
    display: block;
    color: #a3afb7;
  }
  &-form {
    margin: 45px 0 30px;
    button {
      margin-top: 40px;
    }
    width: 100%;
    &__fogot {
      margin-left: auto;
      order: 2;
      margin-top: -3px;
      font-size: 14px;
    }
    &__checkbox {
      margin-top: 20px;
      margin-bottom: 20px;
      position: relative;
      &-input {
        width: 30px;
        opacity: 0;
        height: 30px;
        color: #fff;
        position: absolute;
        z-index: 1;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 0;
        &:checked {
          & + .login-form__checkbox-label:before {
            border: 10px solid;
            background-color: #3f51b5;
            border-color: #3f51b5;
            transition: 0.3s all;
          }
          & + .login-form__checkbox-label:after {
            font-family: Font Awesome\ 5 Free;
            content: "\f00c";
            font-weight: 900;
            color: #fff;
            position: absolute;
            font-size: 10px;
            left: 7px;
            top: 7px;
            display: inline-block;
          }
        }
      }
      &-label {
        padding-left: 32px;
        font-size: 14px;
        color: #757575;
        &:before {
          content: "";
          transition: 0.3s all;
          position: absolute;
          left: 0;
          margin-top: -2px;
          width: 24px;
          height: 24px;
          display: inline-block;
          z-index: 0;
          margin-left: 0;
          background-color: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 0.215rem;
        }
      }
    }
    &__input {
      width: 100%;
      position: relative;
      height: 40px;
      margin-top: 40px;
      &-fileds {
        position: absolute;
        background-color: transparent;
        width: 100%;
        border: none;
        border-bottom: 1px solid #a3afb7;
        outline: none;
        &:not([value=""]) {
          & ~ .float-label {
            transform: translateY(-20px);
            font-size: 12px;
            color: #757575;
          }
        }
        &:focus {
          border-bottom: 2px solid #3f51b5;
          & + .float-label {
            transform: translateY(-20px);
            font-size: 12px;
            color: #3f51b5;
          }
        }
      }
    }
  }

  &__brand {
    width: 100%;
    text-align: center;
    &-logo {
      width: 50px;
      text-align: center;
      height: auto;
    }
    &-name {
      font-size: 18px;
      font-weight: normal;
    }
  }
}
button {
  outline: none !important;
}
button.btn-primary {
  background-color: #3f51b5;
  border-color: #3f51b5;
  -webkit-box-shadow: none;
  outline: none;
  box-shadow: none;
  font-size: 18px;
  border-radius: 5px;
  padding: 10px 15px;
  border: 1px solid;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #5c6bc0;
    border-color: #5c6bc0;
    outline: none;
  }
  &:disabled {
    background-color: grey !important;
  }
}
.button-max {
  width: 100%;
}
</style>