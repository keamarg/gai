<template>
  <div>
    <h1>Vue Component with PostgreSQL Connection Pool</h1>
    <button @click="fetchData">Fetch Data from Database</button>
    <ul>
      <li v-for="item in data" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { Pool } from "pg";

export default {
  data() {
    return {
      data: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        // Create a connection pool
        const pool = new Pool({
          connectionString: process.env.azure_postgresql_connectionstring,
          ssl: { rejectUnauthorized: false },
        });

        // Acquire a client connection from the pool
        const client = await pool.connect();

        // Execute a query
        const query = "SELECT * FROM your_table";
        const result = await client.query(query);

        // Release the client connection back to the pool
        client.release();

        // Update the data in the component
        this.data = result.rows;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>
