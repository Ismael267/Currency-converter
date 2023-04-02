<template>
    <div class="menu">
      <p>Mon menu :</p>
      <nav>
        <RouterLink to="/" class="menu-link">Home</RouterLink>
        <RouterLink to="/liste" class="menu-link">Liste</RouterLink>
        <RouterLink to="/calcul" class="menu-link">calcul</RouterLink>
        <RouterLink to="/admin" class="menu-link">admin</RouterLink>
      </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: "Menu"
  };
  </script>
  
  <style>
  .menu {
    background-color: #f8f8f817;
    padding: 10px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  .menu p {
    font-weight: bold;
  }
  
  .menu nav {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  
  .menu-link {
    margin: 0px 10px;
    padding: 5px 10px;
    text-decoration: none;
    color: #333;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .menu-link:hover {
    background-color: #eee;
  }
  </style>
  