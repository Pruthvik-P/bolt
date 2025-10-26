import { inngest } from "@/inngest/client";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import prisma from "@/lib/db";
import z from "zod";
import { generateSlug } from "random-word-slugs";
import { TRPCError } from "@trpc/server";

export const projectsRouter = createTRPCRouter({
  getOne: baseProcedure
  .input(z.object({
    id: z.string().min(1, {message: "Id is required"})
  }))
    .query(async ({input}) => {
    const existingProject = await prisma.project.findUnique({
      where: {
        id: input.id
      }
    });

    if (!existingProject) {
      throw new TRPCError({code: "NOT_FOUND", message: "Project not found"})
    }
    return existingProject;
  }),
  create: baseProcedure
    .input(
      z.object({
        value: z.string()
          .min(1, { message: "prompt is required" })
          .max(10000, {message: "Message is too long"}),
      })
    )
    .mutation(async ({ input }) => {
      const createdProjects = await prisma.project.create({
        data: {
          name: generateSlug(2, {
            format: "kebab",
          }),
          messages: {
            create: {
              content: input.value,
              role: "USER",
              type: "RESULT",
            },
          },
        },
      });

      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
          projectId: createdProjects.id,
        },
      });

      return createdProjects;
    }),
});
