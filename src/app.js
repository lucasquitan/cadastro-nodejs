import dotenv from 'dotenv';
import express from 'express';

import homeRoutes from './routes/home';
import userRoutes from './routes/user';
import sessionRoutes from './routes/session';
import alunoRoutes from './routes/aluno';
import photoRoutes from './routes/photo';

import './database';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/session/', sessionRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/photos/', photoRoutes);
  }
}

export default new App().app;
