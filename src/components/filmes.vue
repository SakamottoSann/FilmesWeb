<template>
  <div class="mt-4">
    <div class="row m-4" id="pesq">
      <div class="col-md-6">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Pesquise Filmes..."
            v-model="valorPesq.valor"
            id="Pesquisa"
            name="Pesquisa"
          />
          <div class="input-group-append">
            <button
              @click.prevent="FunctionPesquisa"
              data-toggle="modal"
              data-target="#modalPesquisar"
              class="input-group-text"
            >
              <b-icon icon="search"></b-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-4" id="Grid">
      <div
        class="col-md-3 text-center"
        v-for="dados in dadosFilmes"
        :key="dados.id"
      >
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
        <p></p>
      </div>
    </div>
    <!-- Modal Adm -->
    <div>
      <!-- The Modal -->
      <div class="modal fade" id="modalPesquisar" role="dialog">
        <div v-if="dadosPesquisa == null" class="modal-dialog modal-lg">
          <div class="modal-content">
            <div id="addcoment" class="modal-header">
              <h4>Lamentamos! Não Encontramos Oque Voçê Esta Procurando.</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
          </div>
        </div>

        <div v-else class="modal-dialog modal-xl">
          <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title">Filmes Encontrados</h4>
              <button type="button" class="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div id="addcoment" class="modal-body">
              <div class="row m-4" id="Grid">
                <div
                  class="col-md-6 text-center"
                  v-for="dados in dadosPesquisa"
                  :key="dados.id"
                >
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
                      <div>
                        <button
                          data-dismiss="modal"
                          @click.prevent="HandlerPesquisar(dados.id)"
                          class="mt-2 btn btn-secondary"
                        >
                          Avaliar
                        </button>
                      </div>
                    </div>
                  </div>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: null,
      dadosNada: null,
      dadosFilmes: null,
      dadosPesquisa: null,
      valorPesq: {
        valor: null,
      },
    };
  },

  methods: {
    FunctionPesquisa() {
      axios
        .get(`${this.$urlAPI}/filter/${this.valorPesq.valor}`, {})
        .then((response) => {
          if (response.data.erro == true) {
            alert(response.data.msg);
          }
          if (response.data.erro == false) {
            if (response.data.erro == false) {
              this.dadosPesquisa = response.data.dados;
            }
          }
        });
    },
    HandlerPesquisar(valor1) {
      this.$router.push("/cadavaliacao").catch(() => {});
    },
  },
  mounted() {
    axios.get(`${this.$urlAPI}/filmes`).then((response) => {
      if (response.data.erro == false) {
        this.dadosFilmes = response.data.dados;
      }
      if (response.data.erro == true) {
      }
    });
  },
};
</script>

<style scoped>
#pesq {
  display: flex;
  justify-content: center;
  align-items: center;
}
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