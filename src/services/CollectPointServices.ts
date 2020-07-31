// eslint-disable-next-line no-unused-vars
import { Request, Response, response, request } from 'express'
import knex from '../database/connection'

class CollectPointServices {
  async create (req: Request, resp: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = req.body

    // Open a transactio, which is a condicional insert. If one of the called inserts fail, no DB will be updated. (None data will be inserted in any call)
    const trx = await knex.transaction()
    const collectPoint = {
      image: req.file.filename,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    }

    const insertedId = await trx('collectpoints').insert(collectPoint)
    const collectPointId = insertedId[0]

    const collectPointItems = items.split(',')
      .map((item:string) => Number(item.trim()))
      .map((itemId: number) => {
        return {
          'collectpoints_id': collectPointId,
          'items_id': itemId
        }
      })

    await trx('collectpoints_items').insert(collectPointItems)

    // Finally do the Insert of the data on the DB for the comamand trx().insert()
    await trx.commit()

    return resp.json({
      id: collectPointId,
      ...collectPoint
    })
  }

  async getAll (req: Request, resp: Response) {
    const { city, uf, items } = req.query

    const parsedItems = String(items).split(',')
      .map(item => Number(item.trim()))

    const collectPoints = await knex('collectpoints')
      .join('collectpoints_items', 'collectpoints.id', '=', 'collectpoints_items.collectpoints_id')
      .whereIn('collectpoints_items.items_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('collectpoints.*')

    const serializedPoints = collectPoints.map((point) => {
      return {
        ...point,
        image_url: `http://192.168.1.136:3333/static/${point.image}`
      }
    })

    return resp.json(serializedPoints)
  }

  async getById (req: Request, resp: Response) {
    const { id } = req.params

    const collectPoint = await knex('collectpoints').where('id', id).first()

    if (!collectPoint) {
      return resp.status(404).json({ message: 'Collect Point not found' })
    }

    /**
     * SELECT * FROM items
     * JOIN collectpoints_items ON items.id = collectpoints_items.items_id
     * WHERE collectpoints_items.collectpoints_id = {id}
     */
    const items = await knex('items').join('collectpoints_items', 'items.id', '=', 'collectpoints_items.items_id')
      .where('collectpoints_items.collectpoints_id', id).select('items.title')

    const serializedPoint = {
      ...collectPoint,
      image_url: `http://192.168.1.136:3333/static/${collectPoint.image}`
    }

    return resp.json({ collectPoint: serializedPoint, items })
  }
}

export default CollectPointServices
