<template>
  <div class="footer">
    <div class="footer-container">
      <div class="row-2">
        <div class="row-2-up">
          <div class="button-up">
            <button @click="topFunction">
              <i class="fas fa-chevron-up"></i>
            </button>
          </div>
        </div>
<!--        <div class="link-section">-->
<!--          <div class="about">-->
<!--            <span class="big">About</span>-->
<!--            <ul>-->
<!--              <li><a href="https://discord.gg/M4Sg2b3" target="_blank">About Us</a></li>-->
<!--              <li><a v-bind:href="changelog">Changelog</a></li>-->
<!--            </ul>-->
<!--          </div>-->
<!--          <div class="learn-more">-->
<!--            <span class="big">Learn More</span>-->
<!--            <ul>-->
<!--              <li><a v-bind:href="roadmap">Road map</a></li>-->
<!--              <li><a href="" target="_blank">Support</a></li>-->
<!--            </ul>-->
<!--          </div>-->
<!--          <div class="legal">-->
<!--            <span class="big">Legal</span>-->
<!--            <ul>-->
<!--              <li><a href="" target="_blank">Terms and Condition</a></li>-->
<!--              <li><a v-bind:href="changelog">Privacy Policy</a></li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->

        <div class="underline"></div>
        <div class="social-media">
          <a href="https://discord.gg/M4Sg2b3" target="_blank">
            <font-awesome-icon  :icon="['fab', 'discord']"/>
          </a>
          <a href="https://t.me/RiverbotCommunity" target="_blank">
            <font-awesome-icon  :icon="['fab', 'telegram']"/>
          </a>
        </div>
        <p class="trademark">Copyright &copy; 2019 All rights reserved </p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        roadmap: "/home/roadmap/",
        changelog: "/home/changelog/",
      }
    },
    methods: {
      topFunction: function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }
  }
</script>

<style lang="scss" scoped>


</style>
