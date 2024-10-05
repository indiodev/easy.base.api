type HTTPException = {
  message: string;
  code: number;
  cause?: string;
};

export class ApplicationException {
  constructor(public readonly exception: HTTPException) {}
}
