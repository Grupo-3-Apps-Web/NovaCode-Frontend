<script>
export default {
  name: "footer-content"
}
</script>

<template>
  <div class="grid bg-primary mt-4 p-2 align-content-start">
    <div class="col-12 ml-3 align-items-center justify-content-center">
      <p>Copyright &copy; 2025. NOVACODE</p>
    </div>
    <div  class="col-12 ml-3 mt-1 align-items-center justify-content-center">
      <p>
        {{ $t('authoring-phrase.intro') }} <i class="pi pi-heart"/>
        {{ $t('authoring-phrase.use') }} <a href="https://primevue.org/" target="_blank">PrimeVue</a>
        {{ $t('authoring-phrase.author', {brand: 'NOVACODE'}) }}
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
