import { FastifyRequest, FastifyReply } from "fastify";

export default async function projects(_: FastifyRequest, res: FastifyReply) {
  return res.send([
    {
      id: "project_id1",
      title: "project title 1",
      description: "project description 1",
    },
    {
      id: "project_id2",
      title: "project title 2",
      description: "project description 2",
    },
    {
      id: "project_id3",
      title: "project title 3",
      description: "project description 3",
    },
  ]);
}
