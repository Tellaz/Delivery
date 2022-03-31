<template >
  <div>
    <DialogMessage
            :dialogOptions="dialogOptions"
            @dialog_false="callback_dialog"
            />
    <v-app-bar class="App-bar-bg" dense dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Menu</v-toolbar-title>

      <v-spacer></v-spacer>

      
      <v-btn
        class="ma-2"
        color="red darken-4"
        dark
        @click="sair()"
        
      >
        <v-icon
          dark
          left
        >
          mdi-arrow-left
        </v-icon>Sair
      </v-btn>


      <v-menu left bottom>
        <template>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title>Option</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <div v-for="(link, index) in links" :key="index">
        <router-link class="remove-underline" :to="{ name: link.nameRoute }" active-class="link-ativo">
          <v-list dense>
            <v-list-item class="bg-hover">

              <v-list-item-content>
                <div class="d-flex justify-left">
                  
                  <div >
                    
                  <font-awesome-icon :icon=" link.icone " class="mr-2"/>
                    {{ link.title }}
                  </div>
                </div>
              </v-list-item-content>
            </v-list-item> 
          </v-list>
        </router-link>
      </div>
    </v-navigation-drawer>
  </div>
</template>
<script>
import DialogMessage from "../components/DialogMessage.vue";
export default {

  created(){
    this.rota = this.$route.name;
  },

  data() {
    return {
      salvarAlteraçõesLoading: false,
           dialogOptions: {
            title: "",
            dialog: false,
            message: "",
            type: "darken-2",
            botaoText: "",
            },
      dialogLoaging: false,
      drawer: false,
      rota: "",
      links: [
        {
          title: "Perfil",
          icone: "fa-solid fa-user",
          nameRoute: "Perfil",
        },
        {
          title: "Adicionar produtos",
          icone: "fa-solid fa-circle-plus",
          nameRoute: "listaProdutos",
        },
          {
            title: "Cardápio",
            icone: "fa-solid fa-burger",
            nameRoute: "TelaCliente",
            
          },
        {
          title: "Relatorio",
          icone: "fa-solid fa-circle-exclamation",
          nameRoute: "relatorio",
        },
        
      ],
    };
  },
   components: {
    DialogMessage,
  },

  methods: {

     callback_dialog() {
      this.dialogOptions.dialog = false;
      this.deleteLoading = false;
      this.dialogLoaging = false;
      window.location.reload()
      if (this.error) {
        this.salvarAlteraçõesLoading = false;
        return;
      }
      this.$router.push({ name: "Login" });
    },

    sair(){
      this.salvarAlteraçõesLoading = true;
      localStorage.setItem('token', "")
      window.sessionStorage.setItem('tokens', "");
      this.dialogOptions.title = "Sucesso!";
      this.dialogOptions.message = "Voce sera redirecionado para o Login!";
      this.dialogOptions.type = "success";
      this.dialogOptions.botaoText = "Ok";
      this.dialogOptions.dialog = true;
      
      this.salvarAlteraçõesLoading = false;
      
    }
  }


  
};
</script>
<style  lang="scss">
.App-bar-bg {
  background: rgba(255, 255, 255, 0.1);
}
.title-menu {
  font-size: 1.5rem;
  text-decoration: none !important;
  border: none !important;
  display: inline-block;
}
.title-menu::after {
  display: none !important;
}

.icons-menu {
  padding-left: 10px;
  width: 30px;
  height: 30px;
}
.bg-hover:hover {
  background-color: #2c2929;
}
@import "../../src/assets/scss/index.scss";
</style>