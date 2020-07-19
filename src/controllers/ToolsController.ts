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
    const {city, uf, items} = request.query;
    const parsedItems = String(items).split(',').map(item => Number(item.trim()));

    const points = await knex('points')
      .join('point_items', 'points.id', '=', 'point_items.point_id')
      .whereIn('point_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    const serializedPoints = points.map(point => {
      return {
        ...point,
        image_url: `http://192.168.1.4:4000/uploads/${point.image}`
      }
    });
    
    return response.json(serializedPoints);
  }

  async create(request:Request, response:Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = request.body
  
    const trx = await knex.transaction();
  
    const point = {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      image: request.file.filename
    };

    const insertedIds = await trx('points').insert(point).returning('id');
    
    const point_id = insertedIds[0]
  
    const pointItems = items.split(',').map((item: String) => Number(item.trim())).map((item_id: number) => {
      return {
        item_id,
        point_id: point_id
      }
    })
  
    await trx('point_items').insert(pointItems);

    await trx.commit();
  
    return response.json({id: point_id, ...point});
  }

  async destroy(request:Request, response:Response) {
    const {id} = request.params;

    const trx = await knex.transaction();

    const tool = await knex('tools').where('id', id).first();

    if(!tool) {
      return response.status(400).json({message: 'Tool not found'});
    }

    return response.json(tool);
  }

}

export default ToolsController;