<template>
  <div class="container text-center">
    <h2>Produtoras</h2>

    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Logo</th>
          <th>Ano</th>
          <th>Editar</th>
          <th>Deletar</th>
        </tr>
      </thead>
      <tbody v-for="dados in dadosProdutoras" :key="dados.id">
        <tr>
          <td>{{ dados.nome }}</td>
          <td>
            <img
              :src="dados.logo"
              width="100px"
              height="70px"
              alt="Logo Produtora"
            />
          </td>
          <td>{{ dados.ano }}</td>
          <td>
            <b-button
              class="btn btn-info"
              @click.prevent="
                HandlerEdit(dados.id, dados.nome, dados.ano, dados.logo)
              "
              data-toggle="modal"
              data-target="#modalEditar"
              ><b-icon icon="pencil-fill"></b-icon
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

    <!-- Modal Editar -->
    <div>
      <!-- The Modal -->
      <div class="modal fade" id="modalEditar" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div id="addcoment" class="modal-header">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <p id="p" for="nome">Nome</p>
                      <input
                        type="text"
                        v-model="dadosSaida.nome"
                        class="form-control"
                        id="nome"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <p id="p" for="ano">Ano</p>
                      <input
                        type="number"
                        v-model="dadosSaida.ano"
                        class="form-control"
                        id="ano"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <p id="p" for="foto">Logo:</p>
                      <input
                        type="text"
                        v-model="dadosSaida.logo"
                        class="form-control"
                        id="foto"
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
                ></b-icon>
                Cancelar
              </button>
              <button
                @click.prevent="EditProdutora"
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
    <!-- Modal Excluir -->
    <div>
      <!-- The Modal -->
      <div class="modal fade" id="modalDeletar" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div id="addcoment" class="modal-header">
              <h3>Deseja Deletar Esta Produtora?</h3>
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
                @click.prevent="DelProdutora"
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
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      dadosProdutoras: null,
      dadosSaida: {
        nome: null,
        ano: null,
        logo: null,
      },
    };
  },
  methods: {
    HandlerDel(valor) {
      this.deleteProdutora = valor;
    },
    HandlerEdit(valor1, valor2, valor3, valor4) {
      this.DadosProdutora = valor1;
      this.dadosSaida.nome = valor2;
      this.dadosSaida.ano = valor3;
      this.dadosSaida.logo = valor4;
    },
    DelProdutora() {
      if (localStorage.getItem("token")) {
        axios
          .delete(`${this.$urlAPI}/produtoras/${this.deleteProdutora}`, {
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
    EditProdutora() {
      if (localStorage.getItem("token")) {
        axios
          .put(
            `${this.$urlAPI}/produtoras/${this.DadosProdutora}`,
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
    carrega() {
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