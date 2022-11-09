<template>
  <div :class="`w-full  ${show ? 'block' : 'hidden'} h-full absolute 
  flex justify-center items-center 
  bg-grey opacity-70 z-50`">
      <img class="w-20 select-none" src='../assets/images/loader.gif'/>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props:{
    show : Boolean,
  },

  setup(props)
  {
    return props
  }
}
</script>

<style>

</style>