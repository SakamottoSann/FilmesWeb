<template>
  <div class="container row m-auto test">
    <div class="col-lg-4">
      <form id="form" class="mt-5">
        <div class="form-group">
          <p id="p" for="nome">Nome:</p>
          <input
            type="text"
            v-model="dados.nome"
            placeholder="Digite O Nome Da Produtora."
            class="form-control"
            id="nome"
          />
        </div>
        <div class="form-group">
          <p id="p" for="logo">Logo:</p>
          <input
            type="text"
            v-model="dados.logo"
            placeholder="Informe Url Do Logo..."
            class="form-control"
            id="logo"
          />
        </div>
        <div class="form-group">
          <p id="p" for="ano">Ano:</p>
          <input
            type="number"
            v-model="dados.Ano"
            placeholder="Ano De Criação"
            class="form-control"
            id="ano"
          />
        </div>
        <p id="b">
          <button id="b" @click.prevent="limpar" class="btn btn-outline-danger mr-4">
            Limpar
          </button>
          <button
            id="b"
            type="submit"
            @click.prevent="CadProdutora"
            class="btn btn-outline-success ml-4"
          >
            Cadastrar
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
      dados: {
        nome: null,
        logo: null,
        Ano: null,
      },
    };
  },
  methods: {
    limpar() {
      this.dados.nome = null;
      this.dados.logo = null;
      this.dados.Ano = null;
    },
    CadProdutora() {
      if (localStorage.getItem("token")) {
        axios
          .post(`${this.$urlAPI}/produtoras`, this.dados, {
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
    },
  },
};
</script>

<style scoped>
#form {
  background-color: #212529;
  border-radius: 10px;
  padding: 20px;
  margin-right: -100px;
  margin-left: -100px;
}
#b {
  text-align: center;
  margin-top: 10px;
  padding-left: 30px;
  padding-right: 30px;
  font-size: 22px;
  border-radius: 15px;
}
#p {
  margin-bottom: 2px;
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