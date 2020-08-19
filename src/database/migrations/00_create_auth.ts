
import Knex from 'knex';

export async function up(knex: Knex){
        
        return knex.schema.createTable('usersAuth', table =>{
            table.increments('id').primary();
            table.string('email').notNullable();
            table.string('password').notNullable();

            // table.integer('user_id')
            // .notNullable()
            // .references('id')
            // .inTable('users')
            // .onUpdate('CASCADE')
            // .onDelete('CASCADE')
    
            table.timestamp('created_at')
            .notNullable()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        })
    }


export async function down(knex: Knex){
    return knex.schema.dropTable('usersAuth')
}






