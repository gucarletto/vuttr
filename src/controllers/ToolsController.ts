import knex from '../database/connection';
import {Request, Response} from 'express';

class ToolsController {

  async show(request:Request, response:Response) {
    const {id} = request.params;

    const tool = await knex('tools').where('id', id).first();

    if(!tool) {
      return response.status(400).json({message: 'Tool not found'});
    }

    return response.json(tool);
  }

  async index(request:Request, response:Response) {
    const {tags} = request.query;
    const parsedTags = String(tags).split(',').map(tag => String(tag.trim()));

    const tools = await knex('tools')
      .whereIn('tools.tags', parsedTags)
      .distinct()
      .select('tools.*');
    
    return response.json(tools);
  }

  async create(request:Request, response:Response) {
    const {
      title,
      link,
      description,
      tags,
    } = request.body
  
    const trx = await knex.transaction();
  
    const tool = {
      title,
      link,
      description,
      tags
    };

    const insertedIds = await trx('tools').insert(tool).returning('id');

    const tool_id = insertedIds[0];

    await trx.commit();
  
    return response.json({id: tool_id, ...tool});
  }

  async destroy(request:Request, response:Response) {
    const {id} = request.params;

    const trx = await knex.transaction();

    const tool = await trx('tools').where('id', id).del();

    if(!tool) {
      return response.status(400).json({message: 'Tool not found'});
    }

    return response.json(tool);
  }

}

export default ToolsController;