<template>
  <div class="container text-center">
    <p id="Destaque">Avaliações</p>

    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Avaliações</th>
          <th>Comentarios</th>
        </tr>
      </thead>
      <tbody v-for="dados in dadosAval" :key="dados.id">
        <tr>
          <td>{{ dados.filmes }}</td>
          <td id="estrela" v-if="dados.avaliacao == 1"><b-icon id="estrela" icon="star-fill"></b-icon></td>
          <td id="estrela" v-if="dados.avaliacao == 2"><b-icon id="estrela" icon="star-fill"></b-icon><b-icon id="estrela" icon="star-fill"></b-icon></td>
          <td id="estrela" v-if="dados.avaliacao == 3"><b-icon id="estrela" icon="star-fill"></b-icon><b-icon id="estrela" icon="star-fill"></b-icon><b-icon id="estrela" icon="star-fill"></b-icon></td>
          <td id="estrela" v-if="dados.avaliacao == 4"><b-icon id="estrela" icon="star-fill"></b-icon><b-icon id="estrela" icon="star-fill"></b-icon><b-icon id="estrela" icon="star-fill"></b-icon><b-icon id="estrela" icon="star-fill"></b-icon></td>
          <td id="estrela" v-if="dados.avaliacao == 5"><b-icon id="estrela" icon="star-fill"></b-icon><b-icon id="estrela" icon="star-fill"></b-icon><b-icon id="estrela" icon="star-fill"></b-icon><b-icon id="estrela" icon="star-fill"></b-icon><b-icon id="estrela" icon="star-fill"></b-icon>
          </td>
          <td>{{ dados.comentario }}</td>
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
      dadosAval: null,
    };
  },
  mounted() {
    axios.get(`${this.$urlAPI}/aval`).then((response) => {
      if (response.data.erro == false) {
        this.dadosAval = response.data.dados;
      }
      if (response.data.erro == true) {
        alert(response.data.msg);
      }
    });
  },
};
</script>

<style scoped>
#Destaque {
  font-size: 30px;
  border: 1px solid black;
  text-align: center;
  background-color: #212529;
  color: white;
}
#estrela {
  content: "\f005";
  color: #fc0;
  font-size: 20px;
}
</style>