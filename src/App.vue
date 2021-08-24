<template>
  <div class="boxSize">
    <Header />
      <keep-alive exclude="Details">
        <router-view  v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: { Header, Footer },
  data() {
    return {};
  },
};
</script>
  
<style scopend>
.boxSize{
  max-height: 99vh;
  max-width: 99vw;
  text-align: center;
  margin: 0px auto;
  
}

</style> 