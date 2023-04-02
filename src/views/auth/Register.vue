<template>
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
  </template>
  
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
  
</style>
<script>
export default{
    name:"register",
    data() {
        return {
            user: {
                name:'',
                email: '',
                password: '',
                password_confirmation: '',
                successMessage: "",
                errorMessage: "",
            }
        }
    },
    methods: {
  register() {
          fetch('http://127.0.0.1:8000/api/users/register',{
            headers:{
              'accept':'applicaton/json',
              'Content-Type':'application/json'
            },
            method:'POST',
            body:JSON.stringify(this.user)
          })
    .then(response => {
      if (response.ok) {
        this.successMessage = "Inscription réussie !";
        this.errorMessage = "";
      } else {
        this.successMessage = "";
        this.errorMessage = "Échec de l'inscription";
      }
      console.log(response.status);
      return response.json();
    })
    .then(data => console.log(data),
    this.$router.push({name: 'login'}))
    .catch(error => console.log(error))
  }
}

}


</script>