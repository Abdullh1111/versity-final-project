import { prisma } from "../../hooks/prisma";
import { TPost } from "./post.interfact";


export const createPost = async (data: TPost) => {
  return prisma.posts.create({ data });
};

export const getAllPosts = async () => {
  return prisma.posts.findMany({ include: { author: true } });
};

export const getPostById = async (id: number) => {
  return prisma.posts.findUnique({ where: { id }, include: { author: true } });
};

export const updatePost = async (id: number, data: Partial<TPost>) => {
  return prisma.posts.update({ where: { id }, data });
};

export const deletePost = async (id: number, userId: string) => {
    const post = await prisma.posts.findUnique({ where: { id } });
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.authorId !== userId) {
      throw new Error("You are not authorized to delete this post");
    }

  const deletePost = prisma.posts.delete({ where: { id } });

  return deletePost;
};
