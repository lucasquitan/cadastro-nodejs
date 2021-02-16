import jwt from 'jsonwebtoken';

import User from '../models/User';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (!userExist) {
      return res.status(401).json({ error: 'O e-mail não está cadastrado na base de dados.' });
    }

    if (!(await userExist.checkPassword(password))) {
      return res.status(401).json({ error: 'A senha fornecida está incorreta.' });
    }

    const { id } = userExist;

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.EXPIRATION,
    });

    return res.json({ id, email, token });
  }
}

export default new SessionController();
