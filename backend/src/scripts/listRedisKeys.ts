import client from "../redisClient";

(async () => {
  try {
    await client.connect();

    const pattern = "analyze_count:*";
    const keys = await client.keys(pattern);

    if (keys.length === 0) {
      console.log("No hay claves activas con el patrón:", pattern);
    } else {
      console.log("Claves encontradas:\n");

      for (const key of keys) {
        const value = await client.get(key);
        console.log(`${key} => ${value}`);
      }
    }

    await client.quit();
    console.log("\n Conexión cerrada.");
  } catch (err) {
    console.error("Error al listar claves:", err);
    process.exit(1);
  }
})();
