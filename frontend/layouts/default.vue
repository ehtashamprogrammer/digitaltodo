<template>
  <section class="webtask-section">
    <div class="container-fluid p-0">
      <div class="row">
        <div class="col-md-3 col-lg-3">
          <div class="tbtn">
            <a href="#!" class="">
              <img src="~/assets/images/task.png"> <span class="task">Task</span>
            </a>
          </div>
          <div class="lbtn mt-3">
            <a href="#!" class="">
              <img src="~/assets/images/location.png"> <span class="task">Location</span>
            </a>
          </div>
          <div class="logbtn mt-3">
            <a  @click="logout()" href="#" class="">
              <img src="~/assets/images/logout.png"> <span class="task">Logout</span>
            </a>
          </div>
        </div>

        <div class="col-md-9 col-lg-9">
            <Nuxt></Nuxt>
        </div>

      </div>
    </div>
  </section>

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
    },
    logout(){
      this.$auth.logout('laravelSanctum')
        .then((response)=> {
          this.$toast.success('Successfully Logged Out ').goAway(4000);
          this.$router.push('/login');
        })
        .catch((error)=> {
          console.log(error);
        });
    },
  }
})
</script>

