<template>
  <div class="container-fluid">
    <div class="row">
    <div class="col-2 bg-light">
      <div class="my-5 mx-5">
          <nuxt-link to="/"><i class="ti-user"></i>Task</nuxt-link>
      </div>
    </div>
    <div class="col-10">
      <div class="my-5">


        <Nuxt></Nuxt>
      </div>
    </div>
    </div>


  </div>
</template>

<script>

export default ({
  middleware:'authenticated',
  data() {
    return {


    }
  },
  mounted() {
    this.setCsrfToken();
  },
  methods: {
    setCsrfToken() {
      this.$axios.get(`${process.env.API_SERVER}/sanctum/csrf-cookie`)
        .then(() => {
        });
    }
  }
})
</script>

