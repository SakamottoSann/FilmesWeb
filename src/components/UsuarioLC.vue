<template>
  <div class="container m-auto row test">
    <div id="cad" class="disabled">
      <form id="form" class="form-signin mt-5" @submit.prevent="cadastrar">
        <div class="text-center mb-4">
          <h1 id="p" class="h3 mb-3 font-weight-normal">
            Dados De Cadastro
          </h1>
        </div>

        <div class="form-label-group">
          <input
            type="text"
            id="inputNome"
            class="form-control"
            placeholder="Nome Completo"
            required
            autofocus
            v-model="dadosCadastrar.nome"
          />

          <label for="inputEmail">Nome Completo</label>
        </div>

        <div class="form-label-group">
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model="dadosCadastrar.email"
          />

          <label for="inputEmail">E-mail do Usuário</label>
        </div>

        <div class="form-label-group">
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            placeholder="Password"
            required
            v-model="dadosCadastrar.senha"
          />

          <label for="inputPassword">Senha de Acesso</label>
        </div>
        <p id="p">
          Ja Tem Cadastro?
          <a @click.prevent="mostrarlogin" class="btn btn-link">
            Fazer Login
          </a>
        </p>

        <button
          @click.prevent="cadastrar"
          class="btn btn-lg btn-outline-success btn-block"
          type="submit"
        >
          Cadastrar
        </button>
      </form>
    </div>

    <div id="login" class="col-lg-4">
      <form id="form" class="form-login mt-5" @submit.prevent="logar">
        <div class="text-center mb-4">
          <h1 id="p" class="h3 mb-3 font-weight-normal">Dados De Login</h1>
        </div>

        <div class="form-label-group">
          <input
            ref="emailLogin"
            type="email"
            id="inputEmaillogin"
            class="form-control"
            placeholder="Email address"
            required
            autofocus
            v-model="dadosLogin.email"
          />

          <label for="inputEmail">E-mail do Usuário</label>
        </div>

        <div class="form-label-group">
          <input
            type="password"
            id="inputPasswordlogin"
            class="form-control"
            placeholder="Password"
            required
            v-model="dadosLogin.senha"
          />

          <label for="inputPassword">Senha de Acesso</label>
        </div>
        <div id="p1">
          <p id="p">
            Ainda Não é Cadastrado?
            <a @click.prevent="mostrarcad" class="btn btn-link">
              Cadastrar
            </a>
          </p>
        </div>
        <button
          id="btnlogar"
          @click.prevent="logar"
          class="btn btn-lg btn-outline-success btn-block"
          type="submit"
        >
          Entrar
        </button>
      </form>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      dadosLogin: {
        email: null,
        senha: null,
      },
      dadosCadastrar: {
        nome: null,
        email: null,
        senha: null,
      },
    };
  },
  methods: {
    cadastrar() {
      axios
        .post(`${this.$urlAPI}/usuarios`, {
          nome: this.dadosCadastrar.nome,
          email: this.dadosCadastrar.email,
          senha: this.dadosCadastrar.senha,
        })
        .then((response) => {
          if (response.data.erro == "true") {
            alert(response.data.msg);
            this.dadosCadastrar.senha = null;
          }
          if (response.data.erro == "false") {
            this.dadosCadastrar.nome = null;
            this.dadosCadastrar.email = null;
            this.dadosCadastrar.senha = null;
            this.mostrarlogin()
          }
        });
    },
    logar() {
      axios
        .post(`${this.$urlAPI}/login`, {
          email: this.dadosLogin.email,
          senha: this.dadosLogin.senha,
        })
        .then((response) => {
          if (response.data.erro == "true") {
            this.dadosLogin.senha = null;
            alert(response.data.msg);
          }
          if (response.data.erro == "false") {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("idU", response.data.dados.id);
            localStorage.setItem("nome", response.data.dados.nome);
            localStorage.setItem("adm", response.data.dados.adm);
            this.$parent.AltUser(response.data.dados.nome);
            this.$parent.AltAdm(response.data.dados.adm);
            this.$router.push("/").catch(() => {});
          }
        });
    },
    mostrarcad() {
      document.getElementById("login").className = "disabled";
      document.getElementById("cad").className = "col-lg-4";
    },
    mostrarlogin() {
      document.getElementById("cad").className = "disabled";
      document.getElementById("login").className = "col-lg-4";
    },
  },
};
</script>


<style scoped>
#form {
  background-color: #212529;
  border-radius: 10px;
  padding: 20px;
}
#p {
  margin: -2px;
  color: white;
  text-align: center;
}
.disabled {
  display: none;
}
.test {
  display: flex;
  justify-content: center;
  align-items: center;
}

template {
  height: 100%;

  display: -ms-flexbox;

  -ms-flex-align: center;

  align-items: center;

  padding-top: 40px;

  padding-bottom: 40px;

  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;

  max-width: 420px;

  padding: 15px;

  margin: auto;
}

.form-login {
  width: 100%;

  max-width: 420px;

  padding: 15px;

  margin: auto;
}

.form-label-group {
  position: relative;

  margin-bottom: 1rem;
}

.form-label-group > input,
.form-label-group > label {
  height: 3.125rem;

  padding: 0.75rem;
}

.form-label-group > label {
  position: absolute;

  top: 0;

  left: 0;

  display: block;

  width: 100%;

  margin-bottom: 0; /* Override default `<label>` margin */

  line-height: 1.5;

  color: #495057;

  pointer-events: none;

  cursor: text; /* Match the input under the label */

  border: 1px solid transparent;

  border-radius: 0.25rem;

  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: 1.25rem;

  padding-bottom: 0.25rem;
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: 0.25rem;

  padding-bottom: 0.25rem;

  font-size: 12px;

  color: #777;
}

/* Fallback for Edge

-------------------------------------------------- */

@supports (-ms-ime-align: auto) {
  .form-label-group > label {
    display: none;
  }

  .form-label-group input::-ms-input-placeholder {
    color: #777;
  }
}

/* Fallback for IE

-------------------------------------------------- */

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .form-label-group > label {
    display: none;
  }

  .form-label-group input:-ms-input-placeholder {
    color: #777;
  }
}
</style>