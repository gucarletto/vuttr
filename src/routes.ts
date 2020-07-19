import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';
import ToolsController from './controllers/ToolsController';

const routes = express.Router();
const upload = multer(multerConfig);

const toolsController = new ToolsController();

routes.get('/tools', toolsController.index);

routes.get('/tools/', toolsController.index);

routes.get('/tools/:id', toolsController.show);
routes.post(
  '/points', 
  celebrate({
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().email().required(),
      link: Joi.number().required(),
      tags: Joi.string().required()
    })
  }, {
    abortEarly: false
  }), 
  toolsController.create
);

export default routes;