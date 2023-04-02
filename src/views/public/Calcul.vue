<template>
  <div class="converter">
    <select class="converter__select" v-model="selectedPair">
      <option v-for="(pair, index) in pairs" :value="pair.id" :key="index">{{ pair.pair }}</option>
    </select>
    <input class="converter__input" v-model="amount" type="number" placeholder="Montant" />
    <button class="converter__button" @click="convert()">Convertir</button>
    <p class="converter__result">{{ result }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pairs: [],
      selectedPair: '',
      amount: '',
      result: '',
    };
  },
  mounted() {
    fetch('http://127.0.0.1:8000/api/currency/liste', {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.pairs = data.data;
        this.selectedPair = this.pairs[0].id;
        console.log(this.selectedPair)
      });
  },
  methods: {
    convert() {
      fetch(`http://127.0.0.1:8000/api/currency/show/${this.selectedPair}`,{
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.data.rate)
          const rate = data.data.rate;
          this.result = (rate * this.amount);
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
