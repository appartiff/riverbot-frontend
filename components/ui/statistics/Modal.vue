<template>
  <div id="myModal">
    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">

        <span class="close" @click="$emit('close')">
          <i class="fas fa-times close"></i>
        </span>
      </div>
      <div class="modal-body">
        <br />
        <p>Formula used to calculate average projected earnings.</p>
        <div class="green">w <span>= Win Rate</span></div>
        <div class="blue">r <span>= Reward &divide; Risk</span></div>
        <div class="orange-strong">p <span>= Projected Earnings</span></div>
        <img src='../../../assets/Imgs/Formula.png' alt=""/>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped>
  #myModal
  {
  /* The Modal (background) */
    /* Hidden by default */
    z-index: 1;
    /* Sit on top */
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    max-width: 100%;
    overflow: auto;
    /* Enable scroll if needed */
    background-color: black;
    /* Fallback color */
    background-color: rgba(0, 0, 0, 0);
    /* Black w/ opacity */
  }
  .modal h2 {
    margin: 0;
  }

  /* Modal Content */
  .modal-content {
    position: relative;
    background-color: #0f0f0ff0;
    margin: auto;
    padding: 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s;
  }

  /* The Close Button */
  .close {
    float: right;
    font-size: 1.5em;
    font-weight: bold;
    color: #fff;
  }
  .close:hover,
  .close:focus {
    color: #66fcef !important;
    text-decoration: none;
    cursor: pointer;
  }

  .modal-header {
    background-color: #0e1020;
    color: white;
  }

  .modal-body {
    padding: 0 1.25em;
  }

  .modal-body p {
    margin: 0;
    font-size: 1.25em;
  }

  .modal-body > div {
    font-size: 1.25em;
    width: 100%;
  }

  .modal-body span {
    color: white;
    margin-bottom: 1em;
  }

  .modal-body p {
    display: block;
    color: white;
    margin-bottom: 1em;
  }

  .modal-body img {
    width: 400px;
    max-width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>
