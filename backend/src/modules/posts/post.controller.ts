import { Request, Response } from "express";
import { catchAsync } from "../../hooks/catchAsync";
import { CustomRequest } from "../../middleware/authorized";
import * as postService from "./post.service";

export const create = catchAsync(async (req: CustomRequest, res: Response) => {
  console.log(req.user);
  const post = await postService.createPost({
    ...req.body,
    authorId: req.user.id,
  });
  res.json({ success: true, post });
});

export const getAll = catchAsync(async (_req: Request, res: Response) => {
    const posts = await postService.getAllPosts();
    res.json({ success: true, posts });
})

export const getById = catchAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const post = await postService.getPostById(id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    res.json({ success: true, post });
})

export const update = catchAsync(async (req: CustomRequest, res: Response) => {
    const id = Number(req.params.id);
    const userId = req.user.id
    const updatedPost = await postService.updatePost(id, req.body, userId);
    res.json({ success: true, updatedPost });
})

export const remove = catchAsync(async (req: CustomRequest, res: Response) => {
    const id = Number(req.params.id);
    await postService.deletePost(id, req.user.id);
    res.json({ success: true, message: "Post deleted" });
})
