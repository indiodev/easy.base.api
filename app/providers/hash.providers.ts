import { compare, hash } from "bcryptjs";

export class HashProvider {
  constructor() {}

  async generate(payload: string): Promise<string> {
    return await hash(payload, 8);
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    return await compare(payload, hash);
  }
}