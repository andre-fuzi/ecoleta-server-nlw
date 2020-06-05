// eslint-disable-next-line no-unused-vars
import Knex from 'knex'

export async function seed (knex: Knex) {
  await knex('items').insert([
    { title: 'Lâmpadas', image: 'lampada.svg' },
    { title: 'Pilhas e Bateruas', image: 'bateria.svg' },
    { title: 'Papéis e Papelão', image: 'papel-papelao.svg' },
    { title: 'Resíduos Eletrônicos', image: 'eletronico.svg' },
    { title: 'Resíduos Orgânicos', image: 'organico.svg' },
    { title: 'Óleo de Cozinha', image: 'oleo.svg' }
  ])
}
