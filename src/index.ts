import fastify from "fastify";

const server = fastify();

server.get("/", async (req, rep) => {
  return rep.send("hello world with fastify");
});

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);

    process.exit(1);
  }

  // console.log(`Server listening at ${address}`);
});

export default server;
