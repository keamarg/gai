<template>
  <div class="medarbejderdag">
    <h1>blog og billeder fra dagen</h1>
    <button @click="getData('json')" class="askButton pt-2">
      Hent data (json)
    </button>
    <button @click="getData('json')" class="askButton pt-2">
      Hent data (xlsx)
    </button>
    <button @click="newConversation()" class="askButton pt-2">
      Ny samtale
    </button>
  </div>
</template>
