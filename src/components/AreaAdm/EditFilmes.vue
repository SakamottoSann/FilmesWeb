<template>
  <div class="container-fluid text-center">
    <p class="mt-4" id="Destaque">Gerenciar Filmes</p>

    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Capa</th>
          <th>Produtora</th>
          <th>Destaque</th>
          <th>Genero</th>
          <th>Ano</th>
          <th>Duração</th>
          <th>Preço</th>
          <th>Editar</th>
          <th>Destacar</th>
          <th>Deletar</th>
        </tr>
      </thead>
      <tbody v-for="dados in dadosAval" :key="dados.id">
        <tr>
          <td>{{ dados.titulo }}</td>
          <td><img :src="dados.foto" alt="Capa do Filme" width="50px" /></td>
          <td>{{ dados.produtora }}</td>
          <td v-if="dados.destaque == 1">
            <b-icon id="star" icon="star-fill"></b-icon>
          </td>
          <td v-else><b-icon icon="star"></b-icon></td>
          <td>{{ dados.genero }}</td>
          <td>{{ dados.ano }}</td>
          <td>{{ dados.duracao }}</td>
          <td>{{ dados.preco }}</td>
          <td>
            <b-button
              class="btn btn-info"
              @click.prevent="
                HandlerEdit(
                  dados.id,
                  dados.titulo,
                  dados.idp,
                  dados.genero,
                  dados.ano,
                  dados.duracao,
                  dados.preco,
                  dados.foto
                )
              "
              data-toggle="modal"
              data-target="#modalModerador"
              ><b-icon icon="pencil-fill"></b-icon
            ></b-button>
          </td>
          <td>
            <b-button
              @click.prevent="Handlerdestaque(dados.id)"
              data-toggle="modal"
              data-target="#modalDestacar"
              class="btn btn-warning"
              ><b-icon icon="star-fill"></b-icon
            ></b-button>
          </td>
          <td>
            <b-button
              @click.prevent="HandlerDel(dados.id)"
              data-toggle="modal"
              data-target="#modalDeletar"
              class="btn btn-danger"
              ><b-icon icon="trash-fill"></b-icon
            ></b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal Excluir -->
    <div>
      <!-- The Modal -->
      <div class="modal fade" id="modalDeletar" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div id="addcoment" class="modal-header">
              <h3>Deseja Deletar Este Filme?</h3>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer" id="bottonDeletar">
              <button
                type="button"
                class="btn-dark btn-sm mr-2"
                data-dismiss="modal"
              >
                <b-icon
                  icon="x"
                  scale="2"
                  variant="white"
                  class="mr-2"
                ></b-icon>
                Cancelar
              </button>
              <button
                @click.prevent="DelFilmes"
                class="btn btn-sm btn-danger"
                type="submit"
                data-dismiss="modal"
              >
                <b-icon icon="trash-fill" font-scale="1"></b-icon> Deletar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <!-- Modal Destacar -->
    <div>
      <!-- The Modal -->
      <div class="modal fade" id="modalDestacar" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div id="addcoment" class="modal-header">
              <h3>Deseja Destacar Este Filme?</h3>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer" id="bottonDeletar">
              <button
                type="button"
                class="btn-dark btn-sm mr-2"
                data-dismiss="modal"
              >
                <b-icon
                  icon="x"
                  scale="2"
                  variant="white"
                  class="mr-2"
                ></b-icon>
                Cancelar
              </button>
              <button
                @click.prevent="Destaque"
                class="btn btn-sm btn-success"
                type="submit"
                data-dismiss="modal"
              >
                <b-icon icon="check" scale="2" variant="white"></b-icon>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->

    <!-- Modal Moderador -->
    <div>
      <!-- The Modal -->
      <div class="modal fade" id="modalModerador" role="dialog">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <!-- Modal Header -->
            <div id="addcoment" class="modal-header">
              <h3>Deseja Editar Este Filme?</h3>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <div class="container mt-4">
                <div id="form" class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <p id="p" for="nome">Titulo:</p>
                      <input
                        type="text"
                        v-model="dadosSaida.titulo"
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
                          id="produtoras_id"
                          v-model="dadosSaida.produtora_id"
                          class="custom-select"
                        >
                          <option value="0" selected="true">
                            Selecione A Produtora
                          </option>
                          <option
                            v-for="dados in dadosProdutoras"
                            :key="dados.id"
                            :value="dados.id"
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
                        class="form-control"
                        id="ano"
                      />
                    </div>

                    <div class="form-group">
                      <p id="p" for="duracao">Duração:</p>
                      <input
                        type="time"
                        v-model="dadosSaida.duracao"
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
                        class="form-control"
                        id="ano"
                      />
                    </div>

                    <div class="form-group">
                      <p id="p" for="logo">Capa:</p>
                      <input
                        type="text"
                        v-model="dadosSaida.foto"
                        class="form-control"
                        id="logo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal footer -->
            <div class="modal-footer" id="bottonDeletar">
              <button
                type="button"
                class="btn-dark btn-sm mr-2"
                data-dismiss="modal"
              >
                <b-icon
                  icon="x"
                  scale="2"
                  variant="white"
                  class="mr-2"
                  @click.prevent="Calcel"
                ></b-icon>
                Cancelar
              </button>
              <button
                @click.prevent="EditFilme"
                class="btn btn-sm btn-success"
                type="submit"
                data-dismiss="modal"
              >
                <b-icon icon="check" scale="2" variant="white"></b-icon>
                Confirmar
              </button>
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
      dadosAval: null,
      dadosProdutoras: null,
      ComentQuest: null,
      dadosSaida: {
        titulo: null,
        produtora_id: null,
        genero: null,
        ano: null,
        duracao: null,
        preco: null,
        foto: null,
      },
    };
  },
  methods: {
    HandlerDel(valor) {
      this.deleteQuest = valor;
    },
    Handlerdestaque(valor) {
      this.idDestaque = valor;
    },
    HandlerEdit(
      valor1,
      valor2,
      valor3,
      valor4,
      valor5,
      valor6,
      valor7,
      valor8
    ) {
      this.EditQuest = valor1;
      this.dadosSaida.titulo = valor2;
      this.dadosSaida.produtora_id = valor3;
      this.dadosSaida.genero = valor4;
      this.dadosSaida.ano = valor5;
      this.dadosSaida.duracao = valor6;
      this.dadosSaida.preco = valor7;
      this.dadosSaida.foto = valor8;
    },
    Calcel() {
      (this.ComentQuest = null), (this.EditQuest = null);
    },
    EditFilme() {
      if (localStorage.getItem("token")) {
        axios
          .put(
            `${this.$urlAPI}/editfilmes/${this.EditQuest}`,
            this.dadosSaida,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then((response) => {
            if (response.data.erro == true) {
              alert(response.data.msg);
            }
            if (response.data.erro == false) {
              this.carrega();
            }
          });
      }
    },
    DelFilmes() {
      if (localStorage.getItem("token")) {
        axios
          .delete(`${this.$urlAPI}/filmes/${this.deleteQuest}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            if (response.data.erro == true) {
              alert(response.data.msg);
            }
            if (response.data.erro == false) {
              this.carrega();
            }
          });
      }
    },
    Destaque() {
      if (localStorage.getItem("token")) {
        axios
          .get(`${this.$urlAPI}/destaques/${this.idDestaque}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            if (response.data.erro == true) {
              alert(response.data.msg);
            }
            if (response.data.erro == false) {
              this.carrega();
            }
          });
      }
    },
    carrega() {
      axios.get(`${this.$urlAPI}/filmes`).then((response) => {
        if (response.data.erro == false) {
          this.dadosAval = response.data.dados;
          this.carregaProdutora();
        }
        if (response.data.erro == true) {
          alert(response.data.msg);
        }
      });
    },
    carregaProdutora() {
      axios.get(`${this.$urlAPI}/produtoras`).then((response) => {
        if (response.data.erro == false) {
          this.dadosProdutoras = response.data.dados;
        }
        if (response.data.erro == true) {
          alert(response.data.msg);
        }
      });
    },
  },

  mounted() {
    axios.get(`${this.$urlAPI}/filmes`).then((response) => {
      if (response.data.erro == false) {
        this.dadosAval = response.data.dados;
        this.carregaProdutora();
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
#star {
  color: yellow;
}
</style>