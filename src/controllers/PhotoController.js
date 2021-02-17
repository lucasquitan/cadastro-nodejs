import multer from 'multer';

import Photo from '../models/Photo';
import Aluno from '../models/Aluno';
import multerConfig from '../config/multer';

const upload = multer(multerConfig).single('avatar');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: err.code,
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { aluno_id } = req.body;

        const alunoExists = await Aluno.findByPk(aluno_id);
        if (!alunoExists) {
          return res.status(400).json({ error: 'O aluno informado não existe.' });
        }

        const avatar = await Photo.create({ originalname, filename, aluno_id });

        return res.json(avatar);
      } catch (e) {
        return res.status(400).json({ error: e.message });
      }
    });
  }
}

export default new PhotoController();
