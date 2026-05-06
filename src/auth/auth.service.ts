import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  async comparePassword(plainText: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hashed);
  }
}
