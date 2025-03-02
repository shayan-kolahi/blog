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
