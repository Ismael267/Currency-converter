<template>
    <div>
      <form @submit.prevent="login">
        <h2>Connexion</h2>
        <div class="form-group">
          <label for="email">Adresse e-mail</label>
          <input type="email" id="email" name="email" v-model="user.email" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" id="password" name="password" v-model="user.password" required>
        </div>
        <div class="form-group">
          <button type="submit">Se connecter</button>
        </div>
      </form>
  
      <div v-if="errorMessage" class="notification">
        {{ errorMessage }}
      </div>
  
      <button @click="$router.push({name: 'register'})">Aller à la page d'inscription</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "login",
    data() {
      return {
        user: {
          email: "",
          password: ""
        },
        errorMessage: ""
      };
    },
    methods: {
      login() {
        fetch("http://127.0.0.1:8000/api/users/login", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(this.user)
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              throw new Error("Échec de la connexion. Veuillez vérifier vos informations d'identification.");
            }
          })
          .then(data => {
            if (data.status === "failed") {
              throw new Error("Échec de la connexion. Veuillez vérifier vos informations d'identification.");
            }
            localStorage.setItem("token", data.Token);
            this.$router.push({ name: "adminLayout" });
          })
          .catch(error => {
            this.errorMessage = error.message;
            console.log(error);
          });
      }
    }
  };
  </script>
  
 
<style>
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff19;
    padding: 3rem;
    border-radius: 0.25rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1.5rem;
}

label {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    font-size: 1.2rem;
    width: 100%;
    max-width: 25rem;
}

button {
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #007aff;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.notification {
    background-color: #ff0000;
    color: #fff;
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 0.25rem;
}
</style>
