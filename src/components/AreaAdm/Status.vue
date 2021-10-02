<template>
  <div class="container row m-auto test">
    <div id="form" class="col-lg-12">
      <h2 id="p">Filmes Por Produtoras</h2>
      <GChart type="PieChart" :data="DadosFPP" />
    </div>
    <div id="form" class="col-lg-12">
      <h2 id="p">Filmes Por Avaliação</h2>
      <GChart type="ColumnChart" :data="DadosFPA" />
    </div>
  </div>
</template>


<script>
import { GChart } from "vue-google-charts";
import axios from "axios";

export default {
  data() {
    return {
      DadosFPP: [["Produtora", "Nº De Filmes"]],
      DadosFPA: [["Filmes", "Avaliação", "Nº "]],
    };
  },

  components: {
    GChart,
  },
  mounted() {
    axios.get(`${this.$urlAPI}/dadosfpa`).then((response) => {
      //   this.DadosFPA = response.data.dados;
      const Coments = response.data.dados;
      Coments.forEach((cometario) => {
        this.DadosFPA.push([
          cometario.filmes,
          parseInt(cometario.media),
          cometario.num,
        ]);
      });
    });

    axios.get(`${this.$urlAPI}/dadosfpp`).then((response) => {
      const Produtoras = response.data.dados;
      Produtoras.forEach((produtora) => {
        this.DadosFPP.push([produtora.nome, produtora.num]);
      });
    });
  },
};
</script>
<style scoped>
#form {
  margin-top: 20px;
  background-color: #212529;
  border-radius: 10px;
  padding: 20px;
  margin-right: -100px;
  margin-left: -100px;
}
#p {
  margin-bottom: 25px;
  color: white;
  text-align: center;
  font-size: 20px;
}
.test {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>