<template>
  <div class="currency-table">
    <div>
      <h2>Liste des paires de devise</h2>
      <table>
        <thead>
          <tr>
            <th>Devise</th>
            <th>Taux</th>
            <th>Editer</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pair in currencyPairs" :key="pair.id">
            <td>{{ pair.currency_from }} - {{ pair.currency_to }}</td>
            <td>{{ pair.rate }}</td>
            <td>
              <button @click="editPair(pair.id)">Editer</button>
            </td>
            <td>
              <button @click="deletePair(pair.id)">Supprimer</button>
            </td>
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

th,
td {
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
  name: "listePair",
  data() {
    return {
      currencyPairs: [],
    };
  },
  methods: {
    deletePair(index) {
      fetch(`http://127.0.0.1:8000/api/pairs/delete/${index}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Une erreur est survenue lors de la suppression de la paire de devises.");
          }
        })
        .then((data) => {
          // Recharger la liste des paires de devises après la suppression
          this.fetchCurrencyPairs();
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editPair(index) {
      // console.log(index);
      this.$router.push("/editerPair");
    },
    fetchCurrencyPairs() {
  const storedCSRFToken = localStorage.getItem('token');

  fetch("http://127.0.0.1:8000/api/pairs/list", {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": storedCSRFToken,
    },
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Une erreur est survenue lors du chargement des paires de devises. ${response.status}: ${response.statusText}`);
      }
    })
    .then((data) => {
      this.currencyPairs = data.pairs;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

  },
  mounted() {
    this.fetchCurrencyPairs();
  },
};
</script>
