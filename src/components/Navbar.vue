<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Open Password Manager</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav ms-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link" @click.prevent="logout" href="#" v-if="loggedIn">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      loggedIn: localStorage.getItem("token") !== "" && localStorage.token
    };
  },
  mounted() {
    this.emitter.on("getLoggedUser", () => {
      this.checkIfLoggedIn();
    });
  },
  methods: {
    logout(){
      localStorage.token='';
      this.loggedIn = false;
      this.$router.push({ path: '/login' })
    },
    checkIfLoggedIn(){
      this.loggedIn = localStorage.getItem("token") !== "" && localStorage.token;
    }
  },
}
</script>

<style scoped>
</style>
