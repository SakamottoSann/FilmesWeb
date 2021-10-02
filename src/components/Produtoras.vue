<template>
  <div class="container text-center">
    <h2>Produtoras</h2>

    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <!-- <th>ID</th> -->
          <th>Logo</th>
          <th>Nome</th>
          <th>Ano</th>
        </tr>
      </thead>
      <tbody v-for="dados in dadosProdutoras" :key="dados.id">
        <tr>
          <!-- <td>{{ dados.id }}</td> -->
          <td>
            <img
              :src="dados.logo"
              width="100px"
              height="70px"
              alt="Logo Produtora"
            />
          </td>
          <td>{{ dados.nome }}</td>
          <td>{{ dados.ano }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      dadosProdutoras: null,
    };
  },
  mounted() {
    axios.get(`${this.$urlAPI}/produtoras`).then((response) => {
      if (response.data.erro == false) {
        this.dadosProdutoras = response.data.dados;
      }
      if (response.data.erro == true) {
        alert(response.data.msg);
      }
    });
  },
};
</script>