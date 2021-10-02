<template>
  <div id="form" class="container mt-4">
    <div  class="row">
      <div class="col-md-12">
        <div class="form-group">
          <p id="p" for="nome">Titulo:</p>
          <input
            type="text"
            v-model="dadosSaida.titulo"
            placeholder="Digite O Titulo Do Filme"
            class="form-control"
            id="nome"
          />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <p id="p" for="filme_id">Produtora:</p>
          <div class="form-group">
            <select
              id="filmes_id"
              v-model="dadosSaida.produtora_id"
              class="custom-select"
            >
              <option value="0" selected="true">Selecione A Produtora</option>
              <option
                v-for="dados in dadosProdutoras"
                :key="dados.id"
                :value="dados.id"
                selected
              >
                {{ dados.nome }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <p id="p" for="genero">Genero:</p>
          <div class="form-group">
            <input
              type="text"
              v-model="dadosSaida.genero"
              placeholder="Genero"
              class="form-control"
              id="genero"
            />
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="form-group">
          <p id="p" for="ano">Valor</p>
          <input
            type="number"
            v-model="dadosSaida.preco"
            placeholder="Valor"
            class="form-control"
            id="ano"
          />
        </div>

        <div class="form-group">
          <p id="p" for="ano">Duração:</p>
          <input
            type="time"
            v-model="dadosSaida.duracao"
            placeholder="Duração"
            class="form-control"
            id="duracao"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <p id="p" for="ano">Ano:</p>
          <input
            type="number"
            v-model="dadosSaida.ano"
            placeholder="Ano De Lançamento"
            class="form-control"
            id="ano"
          />
        </div>

        <div class="form-group">
          <p id="p" for="logo">Capa:</p>
          <input
            type="text"
            v-model="dadosSaida.foto"
            placeholder="Informe Url Da Capa"
            class="form-control"
            id="logo"
          />
        </div>
      </div>
      <div class="col-md-12 text-center">
        <p>
          <button id="b" @click.prevent="limpar" class="btn btn-outline-danger mr-4">
            Limpar
          </button>
          <button
            id="b"
            type="submit"
            @click.prevent="CadFilme"
            class="btn btn-outline-success ml-4"
          >
            Cadastrar
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dadosProdutoras: null,
      dadosSaida: {
        titulo: null,
        produtora_id: 0,
        genero: null,
        ano: null,
        duracao: null,
        preco: null,
        foto: null,
      },
    };
  },
  methods: {
    limpar() {
      (this.dadosSaida.titulo = null),
        (this.dadosSaida.produtora_id = 0),
        (this.dadosSaida.genero = null),
        (this.dadosSaida.ano = null),
        (this.dadosSaida.duracao = null),
        (this.dadosSaida.preco = null),
        (this.dadosSaida.foto = null);
    },
    CadFilme() {
        if (localStorage.getItem("token")) {
        axios
          .post(`${this.$urlAPI}/filmes`, this.dadosSaida, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            if (response.data.erro == true) {
              alert(response.data.msg);
            }
            if (response.data.erro == false) {
              this.limpar();
            }
          });
      }
    }
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

<style scoped>
#p {
  font-size: 25px;
  text-align: center;
  color: white;
}
#b {
  margin-top: 10px;
  padding-left: 50px;
  padding-right: 50px;
  font-size: 22px;
  border-radius: 15px;
}
#form {
  background-color: #212529;
  border-radius: 10px;
  padding: 20px;
}
</style>