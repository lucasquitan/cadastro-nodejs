import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      return res.status(200).json(newUser);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();

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

      return res.json(user);
    } catch (e) {
      return res.status(400).json({ error: 'Exception Error' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(400).json({ error: 'O id fornecido não existe.' });
      }

      await user.update(req.body);

      return res.json(req.body);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

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
