export type Comment = {
  comment_id: string;
  user_id?: User['user_id'];
  image_id?: Image['image_id'];
  comment_date: Date;
  content: string;
};

export type User = {
  user_id: string;
};

export type Image = {
  image_id: string;
};
