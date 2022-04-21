export type User = {
  id: number,
  name: string,
  email:string,
  gender:string,
  status: string,
}

export type BasePost = {
  user_id: number,
  title: string,
  body: string,
}
export type Post  = BasePost & {
  id: number,
}

export type Comment = {
  id: number,
  post_id: number,
  name: string,
  email: string,
  body: string,
}