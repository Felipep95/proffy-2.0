import Knex from 'knex';

export async function up(knex: Knex){
  return knex.schema.createTable('users', table =>{
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('last_name').notNullable();
    table.string('avatar').nullable();
    table.string('whatsapp').nullable();
    table.string('bio').nullable();
//
    table.integer('auth_id')
            .notNullable()
            .references('id')
            .inTable('usersAuth')
            .onUpdate('CASCADE')
            .onDelete('CASCADE')
  })
}

export async function down(knex: Knex){
  return knex.schema.dropTable('users');
}