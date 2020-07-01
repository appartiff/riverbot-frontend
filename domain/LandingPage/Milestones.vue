<template>
  <section>
    <div class="Milestone">
      <div>
      <h3>Milestones</h3>
    <ul class="timeline" id="timeline">
      <li class="li progress">
        <div class="timestamp">
          <span class="status-span">In Development</span>
        </div>
        <div class="status">
          <h4> Algorithmic Trading Signals</h4>
        </div>
      </li>
      <li class="li">
        <div class="timestamp">
          <span class="status-span">Todo</span>

        </div>
        <div class="status">
          <h4> Cloud Trading Bot </h4>
        </div>
      </li>
    </ul>
      </div>
    </div>
  </section>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style lang="scss" scoped>

  h3
  {
    color: #fff;
  }
  .status-span
  {
    font-size: 1.2em;
  }
  span
  {
    color:silver;
  }
  .Milestone{
    background-color: #17171d;
    padding: 5rem 0;
  }
  @media(max-width: 710px)
  {
.Milestone{
  display: none;
}
  }

  .Milestone > div
  {

    margin:auto;
  }

  .timeline {
    list-style-type: none;
    display: flex;
    margin:0;
    align-items: center;
    padding:0;
    justify-content: center;
  }

  .li {
    transition: all 200ms ease-in;
    width: 50%;
  }

  .timestamp {
    margin-bottom: 2em;
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 100;
  }

  .status {
    padding: 0px;
    display: flex;
    justify-content: center;
    border-top: 8px solid #fff;
    position: relative;
    transition: all 200ms ease-in;
  }
  .status h4 {
    font-weight: 600;
    margin: 1.41em 0em;
  }
  .status:before {
    content: "";
    width: 3em;
    height: 3em;
    background-color: #f56a6a;
    border-radius: 25px;

    position: absolute;
    top: -1.75em;
    transition: all 200ms ease-in;
  }

  .li.complete .status {
    border-top: 8px solid #fff;
  }
  .li.complete .status:before {
    background-color: #6af4f5;
    border: none;
    transition: all 200ms ease-in;
  }
  .li.complete .status h4 {
    color: #6af4f5;
  }

  .li.progress .status
  {
    border-top: 8px solid #fff;
  }
  .li.progress .status:before
  {
    background-color: #f5af6a;
    border: none;
    transition: all 200ms ease-in;
  }
  .li.progress .status h4
  {
    color:#f5af6a;
  }

  @media (min-device-width: 320px) and (max-device-width: 700px) {
    .timeline {
      list-style-type: none;
      display: block;
    }
    .li {
      transition: all 200ms ease-in;
      display: flex;
      width: inherit;
    }

    .timestamp {
      width: 100px;
    }
    .status:before {
      left: -8%;
      top: 30%;
      transition: all 200ms ease-in;
    }
  }


</style>
