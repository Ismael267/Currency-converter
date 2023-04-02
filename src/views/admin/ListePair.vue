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
          <tr v-for="(pair ) in currencyPairs" :key="pair.id">
            <td>{{ pair.pair }}</td>
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
      fetch(`http://127.0.0.1:8000/api/currency/delete/${index}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          // Recharger la liste des paires de devises après la suppression
          this.reloadPage();
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
      // console.log(index);
    },
    editPair(index) {
      console.log(index)
      this.$router.push("/editerPair/")
    },
    reloadPage() {
      // Recharge la page actuelle
      location.reload();
    },

  },
  mounted() {
    fetch("http://127.0.0.1:8000/api/currency/liste", {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        this.currencyPairs = data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>