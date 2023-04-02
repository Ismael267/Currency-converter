<template>
    <div>
        <h2>Ajouter une paire de devises et son taux</h2>
        <form @submit.prevent="addCurrencyPair">
            <label>
                Paire de devise:
                <input type="text" v-model="data.pair" required>
            </label>
           
            <label>
                Taux:
                <input type="number" v-model="data.rate" step="0.0001" required>
            </label>
            <button type="submit">Ajouter</button>
        </form>
        <div v-if="data.status">
            {{ data.status }}
        </div>
    </div>
</template>
  
<script>
export default {
    name: "ajouterPair",
    data() {
        return {
            data:{
                pair: "",
                rate: null,
                status: "",
            }
        };
    },
    methods: {
        async addCurrencyPair() {
            const data = {
                pair: this.data.pair.toUpperCase(),
                rate: this.data.rate,
            };
            const response = await fetch("http://127.0.0.1:8000/api/currency/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                this.data.status = "La paire de devises a été ajoutée avec succès.";
                this.data.pair = "";
                this.data.rate = null;
                this.$router.push({name:'listePair'})
            } else {
                this.data.status = "Une erreur est survenue lors de l'ajout de la paire de devises.";
            }
        },
    },
};
</script>
  
<style>
/* Style pour le formulaire */
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  /* Style pour les labels */
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
  }
  
  /* Style pour les inputs */
  input {
    padding: 0.5rem;
    border: 1px solid gray;
    border-radius: 0.25rem;
    width: 100%;
    max-width: 20rem;
  }
  
  /* Style pour le bouton */
  button[type="submit"] {
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #007aff;
    color: white;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #0056b3;
  }
  
  /* Style pour le message de statut */
  div[v-if="status"] {
    margin-top: 1rem;
    padding: 0.5rem;
    border: 1px solid gray;
    border-radius: 0.25rem;
    background-color: #e5e5e5;
  }
  
</style>