<template>
  <div class="container-fluid mt-4">
    <p id="Destaque">Destaques Da Semana</p>
    <div class="row m-4" id="Grid">
      <div class="col-md-3 text-center" v-for="dados in dadosDestaque" :key="dados.id">
        <div class="card" id="card">
          <div class="card-header">
            <h3 id="titulo">{{ dados.titulo }}</h3>
          </div>
          <div class="card-body">
            <img :src="dados.foto" alt="Capa Do Filmes" />
          </div>
          <div class="card-footer text-center">
            <div id="footer">
              <label id="label">{{ dados.genero }}</label>
              <label id="label">{{ dados.duracao }}</label>
              <label id="label">{{ dados.ano }}</label>
              <label id="label">R$:{{ dados.preco }}</label>
            </div>
          </div>
        </div>
      </div>
      <p></p>
      <hr />
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      dadosDestaque: null,
    };
  },
  mounted() {
    axios.get(`${this.$urlAPI}/destaques`).then((response) => {
      if (response.data.erro == false) {
        this.dadosDestaque = response.data.dados;
      }
    });
  },
};
</script>

<style scoped>
.card-body img {
  width: 35vh;
  height: 50vh;
}

#Destaque {
  margin-top: -10px;
  margin-bottom: -10px;
  font-size: 30px;
  border: 1px solid black;
  text-align: center;
  background-color: #212529;
  color: white;
}
#Grid {
  opacity: 1;
}
#card {
  background-color: #212529;
  color: white;
}
#titulo {
  font-size: 22px;
}
#label {
  pointer-events: none;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
}
#footer {
  border-radius: 10px;
  background-color: black;
}
</style>