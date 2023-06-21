<template>
  <div class="currency-table">
    <div>
      <h2>Liste des paires de devise</h2>
      <table>
        <thead>
          <tr>
            <th>Devise</th>
            <th>Taux</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pair in currencyPairs" :key="pair.currency_from + '-' + pair.currency_to">
            <td>{{ pair.currency_from }} - {{ pair.currency_to }}</td>
            <td>{{ pair.rate }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style>
.currency-table {
  margin: 20px;
  padding: 20px;
  border: 1px solid black;
  border-radius: 10px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 10px;
  text-align: left;
}

thead {
  background-color: #f2f2f232;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f20f;
}
</style>

<script>
export default {
  name: "liste",

  data() {
    return {
      currencyPairs: [],
    };
  },

  mounted() {
    fetch('http://127.0.0.1:8000/api/pairs/list', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.currencyPairs = data.pairs;
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
</script>
