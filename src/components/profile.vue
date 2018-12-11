<template>
       <div class="col-lg-3">
            <div class="card card-shadow text-center">
              <div class="account card-block">
                <div class="account__avatar">
                  <img :src="user.avatar" :alt="user.username" class="account__avatar-img avatar-user">
                </div>
                <div class="account__info">
                  <h4 class="account__info-name">{{user.username}}</h4>
                </div>
              </div>
            </div>
          </div>
</template>
<script>
    export default {
        computed: {
                user() {
      return this.$store.getters.user;
    }
        }
    }
</script>