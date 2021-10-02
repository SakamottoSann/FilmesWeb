<template>
  <div class="container text-center">
    <h2>Usuarios</h2>

    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Email</th>
          <th>Usuario</th>
          <th>ADM</th>
          <th>Deletar</th>
        </tr>
      </thead>
      <tbody v-for="dados in dadosUsuarios" :key="dados.id">
        <tr>
          <td>{{ dados.nome }}</td>
          <td>{{ dados.email }}</td>
          <td v-if="dados.adm == true">Administrador</td>
          <td v-else>Usuario</td>
          <td>
            <b-button
              class="btn btn-info"
              @click.prevent="HandlerAdm(dados.id)"
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

    <!-- Modal Adm -->
    <div>
      <!-- The Modal -->
      <div class="modal fade" id="modalEditar" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div id="addcoment" class="modal-header">
              Deseja Alterar o Cargo Deste Usuario?
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
                @click.prevent="UserAdm"
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
              <h3>Deseja Deletar Este Usuario?</h3>
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
                @click.prevent="DelUser"
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
      dadosUsuarios: null,
      dadosSaida: {
        adm: null,
      },
    };
  },
  methods: {
    HandlerDel(valor) {
      this.deleteUser = valor;
    },
    HandlerAdm(valor1) {
      this.DadosUser = valor1;
    },

     UserAdm() {
      if (localStorage.getItem("token")) {
        axios
          .put(`${this.$urlAPI}/usuariosAdm/${this.DadosUser}`, this.dadosSaida, {
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
    DelUser() {
      if (localStorage.getItem("token")) {
        axios
          .delete(`${this.$urlAPI}/usuarios/${this.deleteUser}`, {
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
      axios.get(`${this.$urlAPI}/usuarios`).then((response) => {
        if (response.data.erro == false) {
          this.dadosUsuarios = response.data.dados;
        }
        if (response.data.erro == true) {
          alert(response.data.msg);
        }
      });
    },
  },

  mounted() {
    axios.get(`${this.$urlAPI}/usuarios`).then((response) => {
      if (response.data.erro == false) {
        this.dadosUsuarios = response.data.dados;
      }
      if (response.data.erro == true) {
      }
    });
  },
};
</script>