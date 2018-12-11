<template>
  <div class="page-home">
    <appheader/>
    <div class="page">
      <div class="container-fluid">
        <div class="row">
          <profile/>
          <div class="col-lg-9">
            <div class="card card-shadow">
              <router-view/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import appheader from "@/components/NavBar.vue";
import profile from "@/components/profile.vue";
export default {
  name: "defaultLayout",
  components: {
    profile,
    appheader
  }
};
</script>