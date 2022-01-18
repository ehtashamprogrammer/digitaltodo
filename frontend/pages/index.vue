<template>
  <div class="row">
  <div class="col-md-8 col-lg-7">

    <div class="login-wrap p-0">
      <div class="col-md-6">
        <a v-b-modal.modal-prevent-closing class="addnewtask" href="#!">+ Add new task</a>
        <p class="addnewtask mt-3" href="#!">Incomplete</p>

        <div v-for="(task,index) in pending_tasks" :key="Math.random()" class="form-group d-md-flex">
          <div class="">
            <b-form-checkbox
              :value="task.id"
              @change="markAsCompleted(task)"
            >
            <label id="liveToastBtn" class="checkbox-wrap checkbox-primary">{{ task.summary }}
            </label>

            </b-form-checkbox>

<!--              <span class="checkmark"></span>-->
            <span class="time">⏰ {{ task.due_date }}</span>
          </div>
        </div>


        <p class="addnewtask mt-3" href="#!">Completed</p>
        <div v-for="(task,index) in completed_tasks" :key="Math.random()" class="form-group d-md-flex">
          <div class="">
            <input type="checkbox"
              :value="task.id"
              disabled
              checked

            >
              <label class="checkbox-wrap d-inline-flex checkbox-primary">{{ task.summary }}

              </label>

            </input>

          </div>
        </div>
      </div>

    </div>
  </div>



    <div class="col-md-4 col-lg-3">
      <div class="custom-toast" v-for="(notification,index) in notifications"  :key="Math.random()">
        <div class="toast-body">
          <div class="row">
            <div class="col-md-9">
              <p class="mr-auto toasttitle mb-0">{{ notification.summary }}</p>
              <span class="subtitle">{{ notification.description }}</span>
            </div>
            <div class="col-md-3">
              <img alt="..." class="rounded mr-2" src="~/assets/images/frame.png">
            </div>
          </div>
        </div>
        <div class="toast-footer">
          <span @click="removeNotification(notification)" aria-label="Close" class="footer-text" data-dismiss="toast">Skip</span>
          <span @click="removeNotification(notification)" aria-label="Close" class="footer-text" data-dismiss="toast">Remind me later</span>
        </div>
      </div>


      </div>

      <b-modal
        id="modal-prevent-closing"
        ref="modal"
        hide-footer
        hide-header
        size="lg"
      >
        <template #default="{ cancel }">

          <form ref="form" @submit.stop.prevent="handleSubmit">

            <div class="modal-body px-5 py-5">
              <h5 id="" class="modal-title text-left pb-4">New Task</h5>
              <div class="form-group mx-3 px-4 py-2 fieldunderline">
                <img class="mt-2" src="images/summary.png">
                <b-form-input id="Summary" v-model="form.summary" class="form-control" name="Summary"
                              placeholder="Summary"
                              required type="text"></b-form-input>
              </div>
              <div class="form-group mx-3 px-4 py-2 fieldunderline">
                <img class="mt-2" src="images/description.png">
                <b-form-textarea id="Description" v-model="form.description" class="form-control" name="Description"
                                 placeholder="Description" required></b-form-textarea>
              </div>
              <div class="form-group mx-3 px-4 py-2 fieldunderline">
                <img class="mt-2" src="images/duedate.png">
                <date-time-picker v-model="form" placeholder="Due Date"></date-time-picker>

              </div>
              <div class="modalfooter col-md-12">
                <button class="btn btn-primary d-block" type="submit">Save</button>

                <button class="btn btn-cancel d-block" type="button" @click="cancel()">Cancel</button>
              </div>
            </div>
          </form>
        </template>


      </b-modal>
  </div>

</template>

<script>

import Form from "vform";
import dateTimePicker from "~/components/DateTimePicker";

export default {
  name: 'indexPage',

  components: {
    dateTimePicker,
  },
  data() {
    return {
      pending_tasks: [],
      completed_tasks: [],
      notifications:[],
      form: new Form({
        summary: null,
        description: null,
        due_date: null,

      }),

      completed_task: true


    }
  },

  mounted() {
    this.$echo.channel('task-expired.' + this.user.id).on("TaskExpired", (payload) => {
      this.notifications.push(payload.task)
    });

    this.get();
  },
  methods: {

    get() {
      this.$axios.get(this.route('/tasks'))
        .then((response) => {
          this.pending_tasks = response.data.pending_tasks;
          this.completed_tasks = response.data.completed_tasks;
          this.loader = false;
        }).catch((error) => {

      })
    },

    removeNotification(notification){
      const index = this.notifications.indexOf(notification);
      if (index > -1) {
        this.notifications.splice(index, 1);
      }

    },

    markAsCompleted(task){



      this.$axios.get(this.route('/tasks/completed/:task', {task:task.id}))
      .then((response) => {
        this.$toast.success('Mark as Completed').goAway(5000);
        this.removeFromPendingTasks(task);
        this.addToCompletedTasks(task);
      })
      .catch((error) => {

      })
    },

    removeFromPendingTasks(task){
      const index = this.pending_tasks.indexOf(task);
      if (index > -1) {
        this.pending_tasks.splice(index, 1);
      }
    },

    addToCompletedTasks(task){
      this.completed_tasks.push(task);
    },




    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      this.form.post(this.route('/tasks'))
        .then((response) => {
          this.pending_tasks.push(response.data)
        })
        .catch((error) => {

        })

      // Exit when the form isn't valid
      // if (!this.checkFormValidity()) {
      //   return
      // }
      // Push the name to submitted names
      // this.submittedNames.push(this.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    }
  }
}
</script>
