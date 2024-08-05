import { Request, Response } from "express";

import { UserService } from "@services/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async show(request: Request, response: Response): Promise<Response> {
    const result = await this.userService.show(request.params.id);
    return response.status(200).json(result);
  }
}
