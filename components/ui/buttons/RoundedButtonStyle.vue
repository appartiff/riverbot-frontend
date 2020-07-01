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
    @import '../../../assets/css/globalVars';
    @import '../../../assets/css/_Mixins.scss';
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
        border: #54DEB7 solid 2px;
        &:hover
        {
            background-color: #54DEB7;
            & > span
            {
                color: black!important;
            }
        }
    }
    .orange
    {
        border: #cc6e33 solid 2px;
        &:hover
        {
            background: #cc6e33;
            &> a
            {
                color: black !important;
            }
        }
    }

</style>