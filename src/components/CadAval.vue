<template>
  <div class="container-fluid pt-4 m-auto row test">
    <div class="col-md-6">
      <form id="form">
        <p id="p" for="filme_id">Selecione O Filme:</p>
        <div class="form-group">
          <select
            id="filmes_id"
            v-model="avaliacao.filmes_id"
            class="custom-select"
            required
          >
            <option :value="0" selected="true">Selecione O Filme</option>
            <option
              v-for="dados in dadosFilmes"
              :key="dados.id"
              :value="dados.id"
              selected
            >
              {{ dados.titulo }}
            </option>
          </select>
        </div>
        <p id="p" for="filme_id">Avaliação</p>
        <div id="p" class="estrelas">
          <input type="radio" id="cm_star-empty" name="fb" value="" checked />
          <label for="cm_star-1"><i class="fa"></i></label>
          <input
            type="radio"
            v-model="avaliacao.avaliacao"
            id="cm_star-1"
            name="fb"
            value="1"
          />
          <label for="cm_star-2"><i class="fa"></i></label>
          <input
            type="radio"
            v-model="avaliacao.avaliacao"
            id="cm_star-2"
            name="fb"
            value="2"
          />
          <label for="cm_star-3"><i class="fa"></i></label>
          <input
            type="radio"
            v-model="avaliacao.avaliacao"
            id="cm_star-3"
            name="fb"
            value="3"
          />
          <label for="cm_star-4"><i class="fa"></i></label>
          <input
            type="radio"
            v-model="avaliacao.avaliacao"
            id="cm_star-4"
            name="fb"
            value="4"
          />
          <label for="cm_star-5"><i class="fa"></i></label>
          <input
            type="radio"
            v-model="avaliacao.avaliacao"
            id="cm_star-5"
            name="fb"
            value="5"
          />
        </div>
        <div class="form-group">
          <p id="p" for="comment">Digite seu Comentario</p>
          <textarea
            required
            placeholder="Digite Sua Opinião Sobre o Filme..."
            v-model="avaliacao.comentario"
            class="form-control"
            rows="5"
          ></textarea>
        </div>

        <p id="b">
          <button
            id="b"
            @click.prevent="limpar"
            class="btn btn-outline-danger mr-4"
          >
            Limpar
          </button>
          <button
            id="b"
            type="submit"
            @click.prevent="EnviaAval"
            class="btn btn-outline-success ml-4"
          >
            Enviar
          </button>
        </p>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      dadosFilmes: null,
      avaliacao: {
        filmes_id: 0,
        avaliacao: 0,
        comentario: null,
      },
    };
  },
  methods: {
    limpar() {
      this.avaliacao.filmes_id = 0;
      this.avaliacao.avaliacao = 0;
      this.avaliacao.comentario = null;
    },
    EnviaAval() {
      if (localStorage.getItem("token")) {
        axios
          .post(`${this.$urlAPI}/aval`, this.avaliacao, {
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
              this.$router.push("/aval").catch(() => {});
            }
          });
      }
    },
  },
  mounted() {
    if (localStorage.getItem("token")) {
      axios.get(`${this.$urlAPI}/filmes`).then((response) => {
        if (response.data.erro == false) {
          this.dadosFilmes = response.data.dados;
        }
        if (response.data.erro == true) {
          alert(response.data.msg);
        }
      });
    } else {
      this.$router.push("/login").catch(() => {});
    }
  },
};
</script>

<style scoped>
#form {
  background-color: #212529;
  border-radius: 10px;
  padding: 10px;
  margin-left: -10px;
}
#p {
  font-size: 20px;
  color: white;
  text-align: center;
}
.test {
  display: flex;
  justify-content: center;
  align-items: center;
}
#b {
  text-align: center;
  margin-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 22px;
  border-radius: 15px;
}
.estrelas input[type="radio"] {
  display: none;
}
.estrelas label i.fa:before {
  content: "\f005";
  color: #fc0;
  font-size: 30px;
}
.estrelas input[type="radio"]:checked ~ label i.fa:before {
  color: #ccc;
}
</style>