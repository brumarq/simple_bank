<template>
  <div class="container">
    <h1 class="mt-5">My Passwords</h1>
    <hr />
    <div class="row mb-3">
      <div class="col-12">
        <button
          type="button"
          class="btn btn-success"
          style="float: right"
          data-bs-toggle="modal"
          data-bs-target="#cartModal"
        >
          Add
        </button>
      </div>
    </div>
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-start"
        v-for="password in passwords"
        :key="password.passwordId"
      >
        <Password :password="password"/>
      </li>
    </ul>
  </div>
  <div
    class="modal fade"
    id="cartModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myModalLabel"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Add new password information
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body" style="text-align: initial">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Website:</label
            >
            <input type="email" class="form-control" id="addWebsite" />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Email:</label
            >
            <input type="email" class="form-control" id="addEmail" />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label"
              >Password:</label
            >
            <input type="email" class="form-control" id="addPassword" />
          </div>
          <div>
            <p class="errorMessage" style="color: red;"></p>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success"
            @click="addNewPassword"
          >
            Save
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Password from '@/components/Password.vue'

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    Password
  },
  data() {
    return {
      passwords: [],
    };
  },
  mounted() {
    this.emitter.on("getPasswords", () => {
      this.getPasswords();
    });
    this.emitter.emit("getLoggedUser");
    this.getPasswords();
  },
  methods: {
    getPasswords() {
      if (localStorage.getItem("token") !== "" && localStorage.token) {
        axios
          .get("http://localhost/passwords", {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((response) => {
            this.passwords = response.data;
          })
          .catch((error) => {
            if (error.response.status == 401) {
              localStorage.token = "";
              this.$router.go({ path: "/login" });
            }
          });
      }else {
        this.$router.push({ path: "/login" });
      }
    },

    addNewPassword() {
      if (localStorage.getItem("token") !== "" && localStorage.token) {

        const websiteUrl = document.getElementById("addWebsite");
        const email = document.getElementById("addEmail");
        const password = document.getElementById("addPassword");

        if (websiteUrl.value == "" || email.value == "" || password.value == "") {
          document.getElementsByClassName('errorMessage')[0].innerHTML = "Please fill in all the fields.";
        }else{  
          axios
            .post(
              "http://localhost/password",
              {
                websiteUrl: document.getElementById("addWebsite").value,
                email: document.getElementById("addEmail").value,
                password: document.getElementById("addPassword").value
              },
              {
                headers: { Authorization: `Bearer ${localStorage.token}` },
              }
            )
            .then((response) => {
              this.passwords.push(response.data);
              document.getElementsByClassName('errorMessage')[0].innerHTML = "";

            })
            .catch((error) => {
              if (error.response.status == 401) {
                localStorage.token = "";
                this.$router.go({ path: "/login" });
              }
            });
        }
      }else {
        this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  text-align: initial;
}

.badge {
  cursor: pointer;
  float: right;
}

.badge:hover {
  color: #2c3e50;
}
</style>
