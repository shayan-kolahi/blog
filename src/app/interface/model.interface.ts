export interface LogInDataInterface {
  email: string;
  password: string;
}

export interface RegisterDataInterface {
  name: string;
  email: string;
  password: string;
  password_confirmation: string
}

export interface CategoryInterface {
  id: number;
  name: string;
  parent_id: number
}

export interface TagInterface {
  id: number;
  name: string
}

export interface PostDataInterface {
  id: number,
  user_id: number,
  title: string,
  description: string,
  created_at: string,
  like_count: number,
  comment_count: number,
  tags: string[],
  categories: string[],
  categoriesArr?: (CategoryInterface | undefined)[],
  tagsArr?: (TagInterface | undefined)[],
}

export interface UserDataInterface {
  id: number,
  type: string,
  name: string,
  email: string,
  email_verified_at: any,
  profile_image_url: any,
  created_at: string,
  updated_at: string
}
