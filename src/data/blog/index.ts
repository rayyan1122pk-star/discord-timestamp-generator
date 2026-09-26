import { BlogPost } from "../guides-data";
import { POSTS_PART_1 } from "./posts-part1";
import { POSTS_PART_2 } from "./posts-part2";
import { POSTS_PART_3 } from "./posts-part3";

export const BLOG_POSTS: BlogPost[] = [
  ...POSTS_PART_1,
  ...POSTS_PART_2,
  ...POSTS_PART_3
];

export { POSTS_PART_1, POSTS_PART_2, POSTS_PART_3 };
