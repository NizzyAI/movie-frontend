<template>
  <header>
    <h1>Movie Theatre</h1>
  </header>
</template>

<style scoped>
header {
  background: #333;
  color: white;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 3rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 5px;
  background: linear-gradient(45deg, #ff6347, #ffa500);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  animation: glow 1.5s infinite alternate;
}

@keyframes glow {
  0% {
    text-shadow:
      3px 3px 5px rgba(0, 0, 0, 0.2),
      0 0 25px #ff6347,
      0 0 50px #ff6347;
  }
  100% {
    text-shadow:
      3px 3px 5px rgba(0, 0, 0, 0.2),
      0 0 25px #ffa500,
      0 0 50px #ffa500;
  }
}
</style>
