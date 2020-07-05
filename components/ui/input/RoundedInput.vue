<template>
   <div class="input-wrapper">
   <input type="text" @input="$emit('input',$event.target.value)" :placeholder="placeholder" :value="value">
     <span>
         <font-awesome-icon :icon="iconRight"></font-awesome-icon>
     </span>
   </div>
</template>

<script>
    export default {
        name: "RoundedInput",
      props: {
        value: {
          type: String,
          required: true
        },
        placeholder:{
          type:String,
          required:false
        },
        iconRight:{
          type:String,
          required:false,
          default:''
        }
      },
      computed: {
        localState: {
          get() {return this.value},
          set(localState) { this.$emit('input', localState)}
        }
      }
    }
</script>

<style scoped>
input{
  min-width:10rem;
  border-radius:15px;
  height:32px;
  background: #22222A;
  text-indent: 1rem;
  border: 1px solid #22222A;
  color: rgba(255, 255, 255, 0.99);
  width:100%;
}
  .input-wrapper{
  }
  span{
    position:absolute;
    right: 1.5rem;
    line-height:32px;
    color:#76B2F5;
  }
</style>
