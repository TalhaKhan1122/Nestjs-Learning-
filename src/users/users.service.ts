import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { STATUS_CODES } from "http";
import { AuthService } from "src/auth/auth.service";
import { CreateUserDto } from "src/dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel("User") private readonly userModel: any,
    private readonly authService: AuthService
  ) {}

  async createUser(body: CreateUserDto): Promise<any> {
    try {
      const { password, email, name } = body;
      const userExist = await this.userModel.findOne({ email }).lean();
      if (userExist) {
        throw new ConflictException("User with this email already exists"); // ✅ Proper HTTP exception
      }

      const hashedPassword = await this.authService.hashPassword(password);
      const user = await this.userModel.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      return {
        message: "User created successfully",
        userId: user._id,
        email: user.email,
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async getUserProfile(body: any): Promise<any> {
    try {
      const { email, password } = body;
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const isMatch = await this.authService.comparePassword(
        password,
        user.password
      );
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
      return {
        message: "User profile retrieved successfully",
        userId: user._id,
        email: user.email,
      };
    } catch (error) {
      console.error("Error retrieving user profile:", error);
      throw error;
    }
  }
}
