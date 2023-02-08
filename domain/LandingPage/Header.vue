
<template>

      <div class="Header-container">
        <div>
          <h1>The Simple Way To <span>Trade</span></h1>
          <p class="big">Welcome To RiverBot, Your Trading Bot for Cryptocurrencies</p>

            <nuxt-link to="/chart" tag="div">
              <RoundedButton
                type="is-primary"
                size="is-large"
                color="blue"
              >
                 In Development
              </RoundedButton>
            </nuxt-link>
        </div>
      </div>
</template>

<script>
  export default
  {
      components:
          {
          },

  }
</script>

<style lang="scss" scoped>

  .Header-container
  {
    background: #17171d;
    width: 100%;
    overflow: auto;
    margin: auto;
    top: 50%;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    position: relative;
    height: 90vh;
    align-items: center;

  }
  h1
  {
      margin-bottom:0.1em!important;
      margin-top: 0;
      font-size: 5.063em;
      font-family: $font-primary;
      color: #D6FFFF;
      > span
      {
          color:#6af4f5;
      }
  }
  p
  {
      color:#959494;
  }
  @media (max-width: 999px)
  {
      h1 {
          font-size: 3.375em;
      }
  }

  .Header-container > div
  {
      width: 100%;
      margin: 0 auto;
      position: absolute;
      top: 50%;
      -ms-transform: translateY(-50%);
      transform: translateY(-50%);
  }


</style>
