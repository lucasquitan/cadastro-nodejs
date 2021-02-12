import Aluno from '../models/Aluno';

class Home {
  async index(req, res) {
    const aluno = await Aluno.create({
      nome: 'Lucas',
      sobrenome: 'Quintanilha',
      email: 'lucasquintanilha@outlook.com.br',
      idade: 26,
    });
    res.status(200).json(aluno);
  }
}

export default new Home();
