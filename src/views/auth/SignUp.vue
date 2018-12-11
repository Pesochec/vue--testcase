<template>
  <div>
    <form class="login-form">
      <p class="login__error" v-if="error">{{error}}</p>
      <div class="login-form__input">
        <input
          type="text"
          id="login-name"
          name="username"
          class="login-form__input-fileds"
          v-validate="'required'"
          value
          onkeyup="this.setAttribute('value', this.value); "
          v-model="username"
        >
        <label for="login-name" class="float-label">Ваше Имя</label>
      </div>
      <p v-show="errors.has('username')" class="login__error">Введите Ваше имя и Фамилию</p>
      <div class="login-form__input">
        <input
          type="text"
          id="login-avatar"
          name="avatar"
          class="login-form__input-fileds"
          v-validate="'required'"
          value
          onkeyup="this.setAttribute('value', this.value); "
          v-model="avatar"
        >
        <label for="login-name" class="float-label">Ссылка на фото</label>
      </div>
      <p v-show="errors.has('avatar')" class="login__error">Укажите ссылку на изображение</p>
      <div class="login-form__input">
        <input
          type="email"
          id="login-email"
          class="login-form__input-fileds"
          name="email"
          v-validate="'required|email'"
          value
          onkeyup="this.setAttribute('value', this.value);"
          v-model="email"
        >
        <label for="login-email" class="float-label">Email</label>
      </div>
      <p v-show="errors.has('email')" class="login__error">Введите правильный email</p>
      <div class="login-form__input">
        <input
          type="password"
          id="login-password"
          name="password"
          v-validate="'required|min:6'"
          class="login-form__input-fileds"
          ref="password"
          value
          onkeyup="this.setAttribute('value', this.value);"
          v-model="password"
        >
        <label for="login-password" class="float-label">Пароль</label>
      </div>
      <p v-show="errors.has('password')" class="login__error">Введите пароль не менее 6 символов</p>
      <div class="login-form__input">
        <input
          type="password"
          id="login-сpassword"
          name="cpassword"
          class="login-form__input-fileds"
          v-validate="'required|confirmed:password|min:6'"
          v-model="cpassword"
          data-vv-as="password"
          value
          onkeyup="this.setAttribute('value', this.value);"
        >
        <label for="login-сpassword" class="float-label">Подтвердите Пароль</label>
      </div>
      <p v-show="errors.has('cpassword')" class="login__error">Пароли не совпадают</p>
      <div class="login-form__submitbutton">
        <button
          type="submit"
          class="btn-primary button-max"
          @click.prevent="onSubmit"
          :disabled="loading"
        >Зарегистрируйтесь</button>
      </div>
    </form>
    <p class="login__still">Есть аккаунт?
      <router-link to="/sign-in">Войдите.</router-link>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      username: "",
      avatar: "",
      email: "",
      password: "",
      cpassword: ""
    };
  },
  methods: {
    ...mapActions({
      registerUser: "registerUser"
    }),
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const user = {
            email: this.email,
            username: this.username,
            avatar: this.avatar,
            password: this.password
          };
          this.registerUser("registerUser", user)
            .then(() => {
              this.$router.push("/sign-in");
            })
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      erro: "error",
      load: "loading"
    }),
    loading() {
      return this.load;
    },
    error() {
      return this.erro;
    }
  }
};
</script>