<template>
  <div class="converter">
    <select class="converter__select" v-model="selectedPair">
      <option v-for="pair in pairs" :value="pair.id" :key="pair.id">{{ pair.currency_from }} - {{ pair.currency_to }}</option>
    </select>
    <input class="converter__input" v-model="amount" type="number" placeholder="Montant" />
    <button class="converter__button" @click="convert">Convertir</button>
    <p class="converter__result">{{ result }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pairs: [],
      selectedPair: 0,
      amount: '',
      result: '',
    };
  },
  mounted() {
    fetch('http://127.0.0.1:8000/api/pairs/list', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.pairs = data.pairs;
        
      });
  },
  methods: {
    convert() {
      const selectedPair = this.pairs.find(pair => pair.id === this.selectedPair);
      if (!selectedPair) {
        return;
      }

      const requestData = {
        currency_from: selectedPair.currency_from,
        currency_to: selectedPair.currency_to,
        amount: this.amount
      };
console.log(requestData);
      fetch('http://127.0.0.1:8000/api/pairs/convert', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          const convertedValue = data.converted_amount;
          this.result = convertedValue.toFixed(2); // Afficher la valeur convertie avec 2 décimales
        });
    },
  },
};
</script>

<style>
.converter {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

.converter__select,
.converter__input {
  font-size: 16px;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid gray;
  outline: none;
}

.converter__button {
  font-size: 16px;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.converter__button:hover {
  background-color: #2980b9;
}

.converter__result {
  font-size: 24px;
  margin-top: 20px;
}
</style>
