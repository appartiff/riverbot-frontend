<template>
    <button :class="[this.color,this.size]">
       <span>
           <slot>Button</slot>
       </span>
    </button>
</template>

<script>
    export default {
        props: {
            color: {
                type:String,
                required: true
            },
            size:{
                type:String,
                required:false
            }
        },
        name: ""
    }
</script>

<style lang="scss" scoped>
    button
    {
        border-radius: 10px;
        font-size: 1.618em;
        margin: 0 auto;
        background: transparent;
        font-family: $font-primary;
        color:white;
        @include small-shadow;
        padding: 0.4em 1em;
    }
    .small
    {
        padding: 0.1em 1em;
        font-size: 1.25em;
    }
    .blue
    {
        border: $color-blue solid 2px;
        &:hover
        {
            background-color: $color-blue;
            & > *
            {
                color: black!important;
            }
        }
    }
    .red
    {
        border: $color-red solid 2px;
        &:hover
        {
            background: $color-red;
          & > *
          {
            color: black!important;
          }

        }
    }

</style>
