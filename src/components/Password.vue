<template>
  <div class="ms-2 me-auto" style="width: 100%" id="passwordField">
    <div class="fw-bold mb-3">
      <a class="link-secondary" :href="localPassword.websiteUrl"
        >{{ localPassword.websiteUrl }}
      </a>
    </div>
    <div class="row" style="width: 100%">
      <div class="col-12 col-md-12">
        <div class="row" style="width: 100%">
          <div class="col-md-6 col-xs-12" style="padding-right: 20px">
            <strong>Email: </strong>
            <code>{{ localPassword.email }}</code>
          </div>
          <div class="col-md-6 col-xs-12">
            <strong>Password: </strong>
            <input
              disabled
              type="password"
              :id="'pwField-' + localPassword.passwordId"
              :value="localPassword.password"
              style="
                border: 0;
                color: black;
                background-color: white;
                cursor: text;
              "
            />
            <a href="#" @click.prevent="password_show_hide">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-eye-fill"
                viewBox="0 0 16 16"
                :name="'pwField-' + localPassword.passwordId"
              >
                <path
                  :name="'pwField-' + localPassword.passwordId"
                  d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
                />
                <path
                  :name="'pwField-' + localPassword.passwordId"
                  d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                />
              </svg>
            </a>
          </div>
          <div class="col-1"></div>
        </div>
      </div>
      <div class="col-12">
        <div class="collapse" :id="'collapse' + localPassword.passwordId">
          <div class="card card-body" style="border: 0px">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Website:</label
              >
              <input
                type="email"
                class="form-control"
                :id="'websiteUrl-' + localPassword.passwordId"
                :value="localPassword.websiteUrl"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Email:</label
              >
              <input
                type="email"
                class="form-control"
                :id="'email-' + localPassword.passwordId"
                :value="localPassword.email"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Password:</label
              >
              <input
                type="email"
                class="form-control"
                :id="'password-' + localPassword.passwordId"
                :value="localPassword.password"
              />
            </div>
            <div class="row">
              <div class="col-2">
                <button
                  type="button"
                  class="btn btn-success"
                  @click="updatePassword(localPassword.passwordId)"
                  :value="localPassword.passwordId"
                >
                  Save
                </button>
              </div>
              <div class="col-10">
                <button
                  type="button"
                  style="float: right"
                  class="btn btn-danger"
                  @click="deletePassword(localPassword.passwordId)"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <span class="badge bg-secondary rounded-pill"
    ><a
      class="badge bg-secondary rounded-pill"
      style="cursor: pointer"
      data-bs-toggle="collapse"
      :href="'#collapse' + localPassword.passwordId"
      role="button"
      aria-expanded="false"
      aria-controls="collapseExample"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-pencil-fill"
        viewBox="0 0 16 16"
      >
        <path
          d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
        /></svg></a
  ></span>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    password: Object,
  },
  data() {
    return {
      localPassword: this.password,
    };
  },
  methods: {
    password_show_hide(event) {
      var x = document.getElementById(event.target.getAttribute("name"));
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
      }
    },

    updatePassword(passwordId) {
      if (localStorage.getItem("token") !== "" && localStorage.token) {
        axios
          .put(
            "http://localhost/password/" + passwordId,
            {
              websiteUrl: document.getElementById("websiteUrl-" + passwordId)
                .value,
              email: document.getElementById("email-" + passwordId).value,
              password: document.getElementById("password-" + passwordId).value,
            },
            {
              headers: { Authorization: `Bearer ${localStorage.token}` },
            }
          )
          .then((response) => {
            this.localPassword = response.data;
          })
          .catch((error) => {
            if (error.response.status == 401) {
              localStorage.token = "";
              this.$router.go({ path: "/login" });
            }
          });
      }
    },

    deletePassword(passwordId) {
      if (localStorage.getItem("token") !== "" && localStorage.token) {
        axios
          .delete("http://localhost/password/" + passwordId, {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then(() => {
            this.emitter.emit("getPasswords");
          })
          .catch((error) => {
            if (error.response.status == 401) {
              localStorage.token = "";
              this.$router.go({ path: "/login" });
            }
          });
      }
    },
  },
};
</script>

<style scoped></style>
