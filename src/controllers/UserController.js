import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, nome, email } = newUser;
      return res.status(200).json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });

      return res.json(users);
    } catch (e) {
      return res.sendStatus(400).json({ error: 'Algo de errado aconteceu.' });
    }
  }

  async show(req, res) {
    let user;
    try {
      user = await User.findByPk(req.params.id);
      console.log(user);

      if (!user) {
        return res.status(400).json({ error: 'O usuário não existe.' });
      }

      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({ error: 'Exception Error' });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({ error: 'Usuário inválido.' });
      }

      const newUser = await user.update(req.body);
      const { id, nome, email } = newUser;

      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.userId;
      const userExist = await User.findByPk(id);

      if (!userExist) {
        return res.status(400).json({ error: 'O usuário não existe.' });
      }

      await userExist.destroy();

      return res.status(200).json({ message: 'O usuário foi apagado com sucesso.' });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
