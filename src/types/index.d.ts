interface Entity {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  objectId?: string;
}

interface User extends Entity {
  email: string;
  fname: string;
  lname: string;
  photoURL: string;
  password?: string;
  authorsInfo?: Author;
  role: "ADMIN" | "USER";
}

interface Author extends Entity {
  fName: string;
  lName: string;
  otherName?: string;
  email: string;
  phoneNumber: string;
  bio: string;
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
  description: string;
  authorsInfo: Author;
  coverImage: string;
  blogPosts?:BlogPost[]
  href: string;
  authorsObjectId?: string;
}

interface BlogPost extends Entity {
  title: string;
  date: string;
  description: string;
  content: string;
  category: string[];
  authorsInfo?: Author;
  authorsObjectId?: string;
  coverImage: string;
  href: string;
  blogObjectId?: string;
  blog?: Blog;
}

interface AuthType {
  user: User;
  accessToken: string;
  refreshToken: string;
  success: bool;
  errors: string[];
}

export type AuthContextType = {
  user: User | null;
  signup: (user: User) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  loginError: Error | null;
  signupError: Error | null;
  loginHasError: boolean;
  signupHasError: boolean;
  loginLoading: boolean;
  signupLoading: boolean;
  logout: () => void;
};

export type AppContextType = {
  blogPosts: BlogPost[];
  blogs: Blog[];
  isLoading:boolean;
  authorInfo?: Author;
  favouriteBlogs?: Blog[];
  initializeApp: (user: User) => Promise<void>;
};
