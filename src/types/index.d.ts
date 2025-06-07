interface Entity {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  objectId?: Date;
}

interface User extends Entity {
  email: string;
  fname: string;
  lname: string;
  photoURL: string;
  authorsInfo?: Author;
  role: "ADMIN" | "USER";
}

interface Author extends Entity {
  fName: string;
  lName: string;
  otherName?: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  // socialLinks: {
  //   facebook: string;
  //   linkedin: string;
  //   instagram: string;
  // };
}

interface Blog extends Entity {
  title: string;
  date: string;
  authorsInfo: Author;
  coverImage: string;
  href: string;
}

interface BlogPost extends Entity {
  title: string;
  date: string;
  content: string;
  category: string;
  authorsInfo: Author;
  coverImage: string;
  href: string;
  blog?:Blog;
};

export type AuthContextType = {
  user: User | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
