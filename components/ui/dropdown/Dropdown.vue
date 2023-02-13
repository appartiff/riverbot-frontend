<template>
  <div class="dropdown"  v-on-clickaway="away">
    <button class="dropbtn" :class="{selected : active === true}"  @click="toggle">{{name}}</button>
    <div v-if="active" class="dropdown-content">
      <slot>
        <div>Default content</div>
      </slot>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
export default {
  name: "Dropdown",
  mixins: [ clickaway ],
  data() {
    return {
      active: false
    };
  },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    away() {
      this.active = false;
    },
    toggle() {
      this.active = !this.active;
    }
  }
}
</script>

<style lang="scss"  scoped>


.dropdown-content a {
  color: white;
  padding: 0.3em 1em;
  text-decoration: none;
  display: block;
}

.selected  {
  background-color: #66fcf1!important;
  color: black;
}

.dropbtn:hover {
  background-color: #66fcf1;
  color: black;
}
 .dropbtn {
  background-color: #22222a;
  display: inline-block;

  border: none;
   border-left: 1px solid #66fcf1;
  cursor: pointer;
   min-width: 5em;
}






</style>
