<template>
    <div>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Role:</strong> {{ user.role }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: Object,
    },
  };
  </script>
  
  <style scoped>
  p {
    font-size: 16px;
    margin: 8px 0;
  }
  </style>
  