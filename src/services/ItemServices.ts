// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express'
import knex from '../database/connection'

class ItemServices {
  async getAll (req: Request, resp: Response) {
    const items = await knex('items').select('*')

    const serializedItems = items.map(item => {
      return {
        id: item.id,
        title: item.title,
        url_image: `http://localhost:3333/static/${item.image}`
      }
    })
    return resp.json(serializedItems)
  }
}

export default ItemServices
