<template>
  <div>
    <apexNavigation></apexNavigation>
    <apexHeader></apexHeader>
    <apexExchanges></apexExchanges>
    <apexContent></apexContent>
<!--    <apex-white></apex-white>-->
<!--    <apex-monitor></apex-monitor>-->
    <apex-milestones></apex-milestones>
    <div>
      <apexWhite></apexWhite>
      <apexFooter></apexFooter>
    </div>
  </div>
</template>

<script>
  import White from './LandingPage/WhiteContainer';
  import Footer from '../components/layout/Footer';

  import Content from './LandingPage/Content.vue';
  import Header from './LandingPage/Header';
  import Monitor from './LandingPage/Monitor';
  import Navigation from '.././components/layout/Navigation.vue';
  import Exchanges from './LandingPage/Exchanges';
  import Milestones from "./LandingPage/Milestones";

  export default {

    components: {
      'apexNavigation': Navigation,
      'apexExchanges': Exchanges,
      'apexFooter': Footer,
      'apexContent': Content,
      'apexHeader': Header,
      'apexWhite': White,
      'apexMonitor': Monitor,
        'apex-milestones': Milestones,
    }
  }
</script>

<style scoped>

</style>
