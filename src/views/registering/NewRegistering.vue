<template>
 <div>
    <ul class="nav nav-tabs nav-tabs-line" role="tablist">
      <li class="nav-item active" role="presentation" style>
        <a
          class="nav-link active"
          data-toggle="tab"
          href="#activities"
          aria-controls="activities"
          role="tab"
          aria-selected="true"
        >
          Добавить заявку
          <span class="badge badge-pill badge-danger"></span>
        </a>
      </li>
      <li class="nav-item" role="presentation" style>
        <router-link
          tag="button"
          to="/"
          type="button"
          class="btn btn-light"
          data-toggle="modal"
          data-target="#exampleModal"
        >Заявки</router-link>
      </li>
    </ul>

    <div class="tab-content">
      <div class="tab-pane active show" id="activities" role="tabpanel">
        <ul class="list-group list-group-flush active">
          <li class="list-group-item registering">
<form>
      <div class="form-group">
        <label for="exampleInputEmail1">Заголовок</label>
        <input
          type="text"
          class="form-control"
          id="regtite"
          v-validate="'required'"
          name="regtite"
          v-model="title"
          placeholder="Заголовок"
        >
      </div>
      <p v-show="errors.has('regtite')" class="login__error">Поле обязательно для заполнения</p>
      <div class="form-group">
        <label for="vendor">Кто нужен</label>
        <input
          type="type"
          class="form-control"
          name="regvendor"
          v-validate="'required'"
          v-model="vendor"
          id="regvendor"
          placeholder="Кто нужен"
        >
      </div>
      <p v-show="errors.has('regvendor')" class="login__error">Поле обязательно для заполнения</p>
      <div class="form-group">
        <label for="regtext">Текст заявки</label>
        <input
          type="type"
          class="form-control"
          name="regtext"
          v-validate="'required'"
          v-model="text"
          id="regtext"
          placeholder="Текст заявки"
        >
      </div>
      <p v-show="errors.has('regtext')" class="login__error">Поле обязательно для заполнения</p>
      <div class="form-group form-check"></div>
      <button
        type="submit"
        class="btn btn-primary"
        @click.prevent="createRegistering()"
        :loading="loading"
      >Отправить заявку</button>
    </form>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      text: "",
      title: "",
      vendor: ""
    };
  },
  computed: {
    ...mapGetters({
      us: "user",
      load: "loading"
    }),
    user() {
      return this.us;
    },
    loading() {
      return this.load;
    }
  },
  methods: {
    ...mapActions({
      createProduct: "createProduct"
    }),
    createRegistering() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const product = {
            title: this.title,
            vendor: this.vendor,
            text: this.text
          };
          this.createProduct(product)
            .then(() => {
              this.$router.push("/");
            })
        }
      });
    }
  }
};
</script>
