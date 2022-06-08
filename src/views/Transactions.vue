<template>
  <div class="container">
    <h1 class="mt-5">Transactions</h1>
    <hr />
    <div class="row mb-3">
      <div class="col-12">
        
        <button
          type="button"
          class="btn btn-success m-1"
          data-bs-toggle="modal"
          data-bs-target="#cartModal"
        >
          Add customer
        </button>
      </div>
    </div>
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-start"
        v-for="transaction in transactions"
        :key="transaction.transactionId"
      >
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    
  },
  data() {
    return {
      transactions: [],
    };
  },
  mounted() {
  },
  methods: {
    loadSomething() {
      if (localStorage.getItem("token") !== "" && localStorage.token) {
        axios
          .get("",
            {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          })
          .then((response) => {
            this.customers = response.data;
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
