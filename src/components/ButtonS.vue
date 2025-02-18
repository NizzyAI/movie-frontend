<template>
    <button :class="type">{{ label }}</button>
  </template>
  
  <script>
  export default {
    props: {
      label: String,
      type: {
        type: String,
        default: 'default'
      }
    }
  };
  </script>
  
  <style scoped>
  button { padding: 10px 20px; cursor: pointer; }
  </style>