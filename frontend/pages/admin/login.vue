<template>
  <div class="container">

    <!--    <b-container >-->

    <div class="row justify-content-center">
      <div class="col-md-6 text-center mb-5">
        <h2 class="heading-section">Log In</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-4">
        <div class="login-wrap p-0">
          <b-form @submit.prevent="login" class="signin-form">
            <div class="form-group">
              <b-form-input class="form-control" v-model="form.email"
                            type="email" placeholder="Email"
              ></b-form-input>
            </div>
            <div class="form-group mb-4">
              <b-form-input id="password-field"  class="form-control" type="password" v-model="form.password"></b-form-input>
              <span v-if="form.errors.has('password')" class="mb-2">{{ form.errors.get('password') }}</span>
              <span toggle="#password-field" class="field-icon toggle-password">Show</span>
            </div>
            <div class="form-group">
              <button type="submit" class="form-control btn btn-primary submit px-3">Log In</button>
            </div>
          </b-form>
        </div>
      </div>
    </div>

    <!--     -->
    <!--    </b-container>-->
  </div>
</template>
<script>


import Form from 'vform'

export default ({
  name:"login",
  layout: "guest",
  middleware:"guest",

  props:{
    redirect:{
    }
  },


  data(){
    return{
      busy: false,
      form: new Form({
        email:"user@gmail.com",
        password: "digitaltolk",
      })
    }
  },
  methods:{
    login() {

      this.busy = true;
      this.$auth.loginWith('laravelSanctum', {
        data: this.form
      })
        .then((response) => {
          this.$toast.success('Successfully Logged In ').goAway(1000);
          this.$router.push('/admin/users');

        })
        .catch((error) => {
          if(error.response)
          {
            this.form.errors.set(error.response.data.errors);
            this.$toast.error('There is something wrong').goAway(1000);
          }
        })
        .finally(() => {
          this.busy = false;
        })

    }
  }
})
</script>


<style scoped>

.login-featured{
  width: 100% !important;
}

.coupon-content {
  border: 0;
}
</style>
