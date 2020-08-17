import { Response } from 'express';

import TokenRequest from '@contracts/TokenRequest';

class SendingVerificationEmailController {
  public async index(req: TokenRequest, res: Response) {}
}

export default new SendingVerificationEmailController();
