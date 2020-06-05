// eslint-disable-next-line no-unused-vars
import Knex from 'knex'

export async function up (knex: Knex) {
  return knex.schema.createTable('collectpoints_items', table => {
    table.increments('id').primary()
    table.integer('collectpoints_id')
      .notNullable()
      .references('id')
      .inTable('collectpoints')
    table.integer('items_id')
      .notNullable()
      .references('id')
      .inTable('items')
  })
}

export async function down (knex: Knex) {
  return knex.schema.dropTable('collectpoints_items')
}
