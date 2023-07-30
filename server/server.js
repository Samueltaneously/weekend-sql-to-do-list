const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const pool = require( './modules/pool' );

app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

const port = 5000;

app.listen( port, ()=>{
    console.log( 'server up on: ', port );
})



app.delete( '/tasks/:id', ( req, res ) => { 
    console.log( '/tasks DELETE hit:', req.params.id );

    const query = `DELETE FROM "todo_items" WHERE id=$1;`;
    const values = [ req.params.id ];
    
    pool.query( query, values ).then( ( response )=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'error with DELETE:', err );
        res.sendStatus( 500 );
    })
}) 

app.get( '/tasks', ( req, res ) => {
    console.log( 'in /tasks GET' );
    
    const query = `SELECT * from "todo_items" ORDER BY "id";`;

    pool.query( query ).then( ( results )=>{
        res.send( results.rows );
    }).catch( (err )=>{
        console.log( 'ERROR with GET:', err );
        res.sendStatus( 500 );
    })
}) 

app.post( '/tasks', ( req, res ) => {
    console.log( 'in /tasks POST:', req.body );

    const query = `INSERT INTO "todo_items" ( "task" ) VALUES ( $1 );`;
    const values = [ req.body.task];

    pool.query( query, values ).then( results => {
        res.sendStatus( 201 );
    }).catch( ( err ) => {
        console.log( 'ERROR with INSERT:', err );
        res.sendStatus( 500 );
    })
}) 


app.put( '/tasks/:id', ( req, res )=>{
    console.log( '/tasks PUT:', req.params.id, req.body );
    const query = `UPDATE "todo_items" SET complete=$1 WHERE id=$2;`;
    const values =[ req.body.newComplete, req.params.id ];
    pool.query( query, values ).then( (results)=>{
        res.sendStatus( 200 );
    }).catch( ( err )=>{
        console.log( 'error with update:', err );
        res.sendStatus( 500 );
    })
})