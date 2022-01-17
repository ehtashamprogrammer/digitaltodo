<template>
  <div>
    <b-container>
      <!--      <b-row class="justify-content-md-center">-->
      <!--        <b-col lg="4" md="5" sm="6">-->
      <!--          <div class=" auth_form mb-50 mt-50">-->
      <!--            <div class="form_header">-->
      <!--              <h4>Kube Publishing</h4>-->
      <!--            </div>-->
      <!--            <auth-loginfields :redirect="'/'"></auth-loginfields>-->
      <!--          </div>-->
      <!--        </b-col>-->
      <!--      </b-row>-->

      <b-row class="justify-content-center my-5">
        <div class="col-md-12 col-lg-10">
          <div class="wrap d-md-flex">
            <div class="text-wrap login-featured p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
              <div class="text w-100">
                <h2>Welcome to login</h2>

              </div>
            </div>
            <div class="login-wrap p-4 p-lg-5">
              <div class="d-flex">
                <div class="w-100">
                  <h3 class="mb-4">Sign In</h3>
                </div>
                <div class="w-100">
                </div>
              </div>
              <b-form @submit.prevent="login" class="signin-form">
                <div class="mb-3">
                  <label class="label" >Email</label>
                  <b-form-input class="" v-model="form.email"
                                type="email"
                  ></b-form-input>
                  <span v-if="form.errors.has('email')" class="mb-2">{{ form.errors.get('email') }}</span>
                </div>
                <div class="form-group mt-3">
                  <label class="label" for="password">Password</label>
                  <b-form-input type="password" v-model="form.password"></b-form-input>
                  <span v-if="form.errors.has('password')" class="mb-2">{{ form.errors.get('password') }}</span>
                </div>
                <div class="form-group">
                  <button class="form-control gradient-btn gradient-btn-primary submit px-3" type="submit">Sign In</button>
                </div>

              </b-form>
            </div>
          </div>
        </div>
      </b-row>
    </b-container>
  </div>
</template>
<script>


import Form from 'vform'

export default ({
  name:"login",
  layout: "guest",
  middleware:"guest",

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
          this.$router.push(this.redirect);

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
