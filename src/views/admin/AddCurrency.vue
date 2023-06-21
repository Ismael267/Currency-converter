<template>
  <div>
    <div style="display: flex;">
      <div>
        <form @submit.prevent="addCurrency">
          <label>
            Nom de la devise
            <input v-model="name" type="text" required />
          </label>
          <label>
            Code
            <input v-model="code" type="text" required :minlength="3" :maxlength="3" @input="validateCode" />
          </label>
          <button type="submit">Ajouter</button>
        </form>
        <div v-if="data.status">
          {{ data.status }}
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Devise</th>
              <th>Nom</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pair in currencies" :key="pair.id">
              <td>{{ pair.code }}</td>
              <td>{{ pair.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addCurrency",
  data() {
    return {
      currencies: [],
      name: "",
      code: "",
      data: {
        status: ""
      }
    };
  },

  mounted() {
    fetch("http://127.0.0.1:8000/api/currency/list", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        this.currencies = data.currency;
        console.log(data.currency);
      });
  },

  methods: {
    async addCurrency() {
      const data = {
        name: this.name,
        code: this.code
      };

      console.log(data);

      const response = await fetch("http://127.0.0.1:8000/api/pairs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        this.data.status = "La  devise a été ajoutée avec succès.";
        this.name = "";
        this.code = "";
        window.location.reload()
      } else {
        this.data.status =
          "Une erreur est survenue lors de l'ajout de  devises.";
        console.log(response);
      }
    },

    validateCode() {
      this.code = this.code.toUpperCase().slice(0, 3);
    }
  }
};
</script>
