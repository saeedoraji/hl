import * as bcrypt from 'bcrypt';

export class Shared {
  static async generatePassword(password): Promise<string> {
    // can be set in .env or generate different salt per user
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  static async checkPasswword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
