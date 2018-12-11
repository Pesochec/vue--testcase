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
          Заявки
          <span class="badge badge-pill badge-danger"></span>
        </a>
      </li>
      <li class="nav-item" role="presentation" style>
        <router-link
          tag="button"
          to="/addproduct"
          type="button"
          class="btn btn-light"
          data-toggle="modal"
          data-target="#exampleModal"
        >Добавить заявку</router-link>
      </li>
    </ul>
    <div class="tab-content" v-if="!user.isAdmin">
      <div class="tab-pane active show" id="activities" role="tabpanel">
        <ul class="list-group list-group-flush active">
          <li class="list-group-item registering" v-for="(product, i) in products" :key="i">
            <div class="registering-info d-flex align-text-bottom">
              <div class="registering-info__title">
                <h5>{{product.title}}</h5>
              </div>
              <div class="registering-info__date">{{product.vendor}}</div>
            </div>
            <div class="registering-text">
              <p>{{product.text}}</p>
            </div>
          </li>
        </ul>
        <router-link to="/sign-in">Главная</router-link>
      </div>
    </div>
    <div class="tab-content" v-if="user.isAdmin">
      <div class="tab-pane active show" id="activities" role="tabpanel">
        <ul class="list-group list-group-flush active">
          <li class="list-group-item registering" v-for="(product, i) in adminProducts" :key="i">
            <div class="registering-info d-flex align-text-bottom">
              <div class="registering-info__title">
                <h5>{{product.title}}</h5>
              </div>
              <div class="registering-info__date">{{product.vendor}}</div>
            </div>
            <div class="registering-text">
              <p>{{product.text}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      commentsadd: {
        text: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      adminProduct: "product",
      myProduct: "myProduct",
      use: "user"
    }),
    products() {
      return this.myProduct;
    },
    adminProducts() {
      return this.adminProduct;
    },
    user() {
      return this.use;
    }
  }
};
</script>




<style lang="scss">
.avatar-user {
  background-color: #e6dfdf;
  display: block;
}
.card {
  border: none;
  margin-top: 30px;
}

.page {
  margin-top: 30px;
  padding-bottom: 30px;
}

.list-group-item:first-child {
  border-top-color: transparent;
}

.list-group-item {
  padding: 25px 15px;
}

.list-group {
  margin-bottom: 20px;
}

.page-home {
  min-height: 100vh;
  background: #f1f4f5;
  .card {
    padding: 40px 15px;
  }
  .nav-tabs-line .nav-link {
    padding: 0.715rem 1.429rem;
    border-bottom: 2px solid transparent;
  }
  .nav-tabs .nav-link {
    border: 1px solid transparent;
    border-top-left-radius: 0.215rem;
    border-top-right-radius: 0.215rem;
  }
  .nav-tabs-line .nav-link.active {
    color: #3f51b5;
    background-color: transparent;
    border-color: transparent;
    border-bottom: 2px solid #3f51b5;
  }
  .nav {
    &-tabs {
      border-bottom: 1px solid #e0e0e0;
      .nav-item {
        margin-bottom: -1px;
      }
    }
  }
  .account {
    &__avatar {
      max-height: 130px;
      overflow: hidden;
      max-width: 130px;
      margin: auto;
      border-radius: 50%;
      &-img {
        width: 100%;
        max-width: 130px;
        color: transparent;
        min-height: 130px;
        border-radius: 100000px;
      }
    }
    &__info {
      &-name {
        margin-top: 15px;
        color: #212121;
        font-weight: normal;
        font-size: 20px;
      }
    }
  }
  .registering-footer {
    button {
      margin: 10px;
      &:focus {
        outline: none;
      }
    }
  }
  .registering-info {
    &__date {
      margin-top: 6px;
      margin-left: 10px;
      font-size: 12px;
    }
  }
}
</style>
