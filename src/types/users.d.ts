declare module '@/data/users.json' {
  export interface User {
    id: number;
    name: string;
    surname: string;
    image: string;
  }
  const users: User[];
  export default users;
}
