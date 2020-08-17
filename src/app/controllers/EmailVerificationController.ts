import { Response } from 'express';

import TokenRequest from '@contracts/TokenRequest';

class EmailVerificationController {
  public async index(req: TokenRequest, res: Response) {}
}

export default new EmailVerificationController();
