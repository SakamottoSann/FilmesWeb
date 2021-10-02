<template>
  <div>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#collapsibleNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <router-link class="navbar-brand" to="/">Filmes Web</router-link>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav me-auto">
            <li class="nav-item dropdown">
              <router-link to="/filmes" class="nav-link" role="button">
                Filmes
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link to="/produtoras" class="nav-link" role="button">
                Produtoras
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                role="button"
              >
                Avaliações
              </a>
              <div class="dropdown-menu text-center">
                <router-link class="btn btn-outline-info mb-1" to="/aval"
                  >Lista De Avaliações</router-link
                >
                <router-link class="btn btn-outline-success" to="/cadavaliacao"
                  >Cadastrar Avaliação</router-link
                >
              </div>
            </li>
            <li v-if="adm == true" id="Drop" class="dropdown">
              <a
                class="nav-link btn btn-outline-danger dropdown-toggle"
                data-toggle="dropdown"
                role="button"
              >
                Administração
              </a>
              <ul class="dropdown-menu">
                <li id="li">
                  <h3 id="paragrafo">Comentarios</h3>
                  <router-link
                    id="b"
                    class="btn btn-outline-warning btn-sm"
                    to="/AdmComents"
                    >Gerenciar
                  </router-link>
                  <h3></h3>
                  <h3 id="paragrafo">Filmes</h3>
                  <router-link
                    id="b"
                    class="btn btn-outline-success btn-sm mb-1"
                    to="/CadFilmes"
                    >Cadastrar Filmes</router-link
                  >
                  <router-link
                    id="b"
                    class="btn btn-outline-warning btn-sm mb-1"
                    to="/editfilmes"
                    >Editar Filmes</router-link
                  >
                  <router-link
                    id="b"
                    class="btn btn-outline-info btn-sm"
                    to="/status"
                    >Estatisticas</router-link
                  >
                  <h3></h3>
                  <h3 id="paragrafo">Produtoras</h3>
                  <router-link
                    id="b"
                    class="btn btn-outline-success btn-sm mb-1"
                    to="/Cadprodutoras"
                    >Cadastrar Produtora</router-link
                  >
                  <router-link
                    id="b"
                    class="btn btn-outline-warning btn-sm"
                    to="/editprodutoras"
                    >Editar Produtoras</router-link
                  >
                  <h3></h3>
                  <h3 id="paragrafo">Usuarios</h3>
                  <router-link
                    id="b"
                    class="btn btn-outline-warning btn-sm"
                    to="/AdmUsers"
                    >Gerenciar</router-link
                  >
                </li>
              </ul>
            </li>
          </ul>

          <ul class="navbar-nav ml-auto mr-4">
            <li class="nav-item dropdown">
                <button v-if="user" @click.prevent="Sair" class="btn btn-warning">Olá, {{user}} <b-icon class="ml-3" icon="box-arrow-right"></b-icon></button>
                <router-link v-else class="btn btn-warning" to="/login"><b-icon icon="person-fill"></b-icon>Entrar</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    user: String,
    adm: String,
  },
  data() {
    return {
      page: "3",
    };
  },
  methods: {
    Sair() {
      localStorage.clear();
      this.$parent.AltUser(null);
      this.$parent.AltAdm(null);

      this.$router.push("/").catch(() => {});
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.dropdown-menu {
  background-color: #272b30;
  min-width: 180px;
}
#li {
  text-align: center;
}
#b {
  font-size: 15px;
  width: 26vh;
}
#paragrafo {
  font-size: 18px;
  text-align: center;
  background-color: #212529;
  color: white;
}
</style>