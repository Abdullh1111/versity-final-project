import { Request, Response } from "express";
import * as postService from "./post.service";
import { CustomRequest } from "../../middleware/authorized";

export const create = async (req: Request, res: Response) => {
  try {
    const post = await postService.createPost(req.body);
    res.json({ success: true, post });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const posts = await postService.getAllPosts();
    res.json({ success: true, posts });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const post = await postService.getPostById(id);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });
    res.json({ success: true, post });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedPost = await postService.updatePost(id, req.body);
    res.json({ success: true, updatedPost });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const remove = async (req: CustomRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    await postService.deletePost(id, req.user.id);
    res.json({ success: true, message: "Post deleted" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};
