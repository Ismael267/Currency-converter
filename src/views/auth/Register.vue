<template>
  <div>
    <form @submit.prevent="register">
      <h2>Inscription</h2>
      <div class="form-group">
        <label for="name">Nom d'utilisateur</label>
        <input type="text" id="name" name="name" v-model="user.name" required>
      </div>
      <div class="form-group">
        <label for="email">Adresse e-mail</label>
        <input type="email" id="email" name="email" v-model="user.email" required>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" v-model="user.password" required>
      </div>
      <div class="form-group">
        <label for="confirm-password">Confirmer le mot de passe</label>
        <input type="password" id="confirm-password" name="confirm-password" v-model="user.password_confirmation" required>
      </div>
      <div class="form-group">
        <button type="submit">S'inscrire</button>
      </div>
      <div v-if="successMessage">{{ successMessage }}</div>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </form>
    <button @click="$router.push({name: 'login'})">Aller à la page de connexion</button>
  </div>
</template>

<style>
  /* Styles CSS ici */
</style>

<script>
export default {
  name: "register",
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        successMessage: "",
        errorMessage: ""
      }
    };
  },
  methods: {
    register() {
      fetch("http://127.0.0.1:8000/api/users/register", {
        headers: {
          accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(this.user)
      })
        .then(response => {
          if (response.ok) {
            this.successMessage = "Inscription réussie !";
            this.errorMessage = "";
            this.$router.push({ name: "login" });
          } else {
            this.successMessage = "";
            this.errorMessage = "Échec de l'inscription";
          }
          console.log(response.status);
          return response.json();
        })
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }
  }
};
</script>
