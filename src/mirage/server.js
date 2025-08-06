import { createServer } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,

    routes() {
      this.urlPrefix = "https://api.escuelajs.co/api/v1";

      this.namespace = "";

      this.get("/categories", () => {
        return [
          { id: 1, name: "Clothes" },
          { id: 2, name: "Electronics" },
          { id: 3, name: "Furniture" },
          { id: 4, name: "Toys" },
        ];
      });
    },
  });
}
