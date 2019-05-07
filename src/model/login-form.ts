export class LoginForm {
  email: string;
  password: string;

  constructor(username: string, secret: string) {
    this.email = username;
    this.password = secret;
  }
}
