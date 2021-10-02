<template>
  <div class="container text-center">
    <p class="mt-4" id="Destaque">Comentarios Dos Usuarios</p>

    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th>Titulo</th>
          <th>Comentario</th>
          <th>Editar Comentario</th>
          <th>Deletar</th>
        </tr>
      </thead>
      <tbody v-for="dados in dadosAval" :key="dados.id">
        <tr>
          <td>{{ dados.filmes }}</td>
          <td>{{ dados.comentario }}</td>
          <td>
            <b-button
              class="btn btn-info"
              @click.prevent="HandlerEdit(dados.id, dados.comentario)"
              data-toggle="modal"
              data-target="#modalModerador"
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
    <!-- Modal Excluir -->
    <div>
      <!-- The Modal -->
      <div class="modal fade" id="modalDeletar" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div id="addcoment" class="modal-header">
              <h3>Deseja Deletar Este Comentario?</h3>
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
                @click.prevent="DelComent"
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

    <!-- Modal Moderador -->
    <div>
      <!-- The Modal -->
      <div class="modal fade" id="modalModerador" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Modal Header -->
            <div id="addcoment" class="modal-header">
              <h3>Deseja Editar Este Comentario?</h3>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
              <label for="comment">Comentario</label>
              <textarea
                class="form-control"
                v-model="comentarioEditado.comentario"
                rows="5"
                id="comment"
              ></textarea>
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
                @click.prevent="EditComent"
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
      comentarioEditado: {
        comentario: null,
      },
    };
  },
  methods: {
    HandlerDel(valor) {
      this.deleteQuest = valor;
    },
    HandlerEdit(valor1, valor2) {
      this.EditQuest = valor1;
      this.comentarioEditado.comentario = valor2;
    },
    Calcel() {
      (this.ComentQuest = null), (this.EditQuest = null);
    },
    EditComent() {
      if (localStorage.getItem("token")) {
        axios
          .put(
            `${this.$urlAPI}/aval/${this.EditQuest}`,
            this.comentarioEditado,
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
              this.carrega()
            }
          });
      }
    },
    DelComent() {
      if (localStorage.getItem("token")) {
        axios
          .delete(`${this.$urlAPI}/aval/${this.deleteQuest}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            if (response.data.erro == true) {
              alert(response.data.msg);
            }
            if (response.data.erro == false) {
              this.carrega()
            }
          });
      }
    },
    carrega() {
      axios.get(`${this.$urlAPI}/aval`).then((response) => {
        if (response.data.erro == false) {
          this.dadosAval = response.data.dados;
        }
        if (response.data.erro == true) {
          alert(response.data.msg);
        }
      });
    },
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
</style>