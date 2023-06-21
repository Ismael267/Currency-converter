<template>
    <div>
      <h2>Modifier une paire de devises et son taux</h2>
      <form @submit.prevent="updateCurrencyPair">
        <label>
          Devise de départ:
          <select v-model="data.currency_from" required>
            <option v-for="currency in data.currencies" :value="currency.code" :key="currency.id">{{ currency.code }}</option>
          </select>
        </label>
        <label>
          Devise d'arrivée:
          <select v-model="data.currency_to" required>
            <option v-for="currency in data.currencies" :value="currency.code" :key="currency.id">{{ currency.code }}</option>
          </select>
        </label>
        <label>
          Taux:
          <input type="number" v-model="data.rate" step="0.0001" required>
        </label>
        <button type="submit">Modifier</button>
      </form>
      <div v-if="data.status">
        {{ data.status }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "editerPair",
    data() {
      return {
        data: {
          currencies: [],
          currency_from: "",
          currency_to: "",
          rate: null,
          status: ""
        }
      };
    },
    methods: {
      async updateCurrencyPair() {
        const pairId = this.$route.params.id;
        const data = {
          currency_from: this.data.currency_from,
          currency_to: this.data.currency_to,
          rate: this.data.rate
        };
        console.log(data);
        const response = await fetch(`http://127.0.0.1:8000/api/pairs/update/${pairId}`, {
          method: "put",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
        if (response.ok) {
          this.data.status = "La paire de devises a été modifiée avec succès.";
          this.$router.push({ name: "listePair" });
        } else {
          this.data.status = "Une erreur est survenue lors de la modification de la paire de devises.";
          console.log(response);
        }
      }
    },
    mounted() {
      const pairId = this.$route.params.id;
      console.log(pairId)
      fetch(`http://127.0.0.1:8000/api/pairs/${pairId}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      })
        .then(response => response.json())
        .then(data => {
          this.data.currency_from = data.currency_from;
          this.data.currency_to = data.currency_to;
          this.data.rate = data.rate;
        });
  
      fetch("http://127.0.0.1:8000/api/currency/list", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      })
        .then(response => response.json())
        .then(data => {
          this.data.currencies = data.currency;
        });
    }
  };
  </script>
  
  <style>
  /* Styles pour le formulaire */
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  /* Styles pour les labels */
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    text-align: center;
  }
  
  /* Styles pour les inputs */
  input {
    padding: 0.5rem;
    border: 1px solid gray;
    border-radius: 0.25rem;
    width: 100%;
    max-width: 20rem;
  }
  
  /* Styles pour le bouton */
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
  
  /* Styles pour le message de statut */
  div[v-if="data.status"] {
    margin-top: 1rem;
    padding: 0.5rem;
    border: 1px solid gray;
    border-radius: 0.25rem;
    background-color: #e5e5e5;
  }
  </style>
  