import client from "../redisClient";

(async () => {
  try {
    await client.connect();

    const pattern = "analyze_count:*";
    const keys = await client.keys(pattern);

    if (keys.length === 0) {
      console.log("No se encontraron claves con el patrón:", pattern);
    } else {
      console.log("Claves encontradas:", keys);
      for (const key of keys) {
        await client.del(key);
        console.log(`Clave eliminada: ${key}`);
      }
    }

    await client.disconnect();
    console.log("Conexión cerrada.");
  } catch (err) {
    console.error("Error al limpiar claves:", err);
    process.exit(1);
  }
})();
