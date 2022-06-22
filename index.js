const { request } = require('express')
const express = require('express')
const moment = require('moment');
const app = express()
const port = 8000

const db = require('./connection/db')

app.set('view engine', 'hbs') // set view engine hbs

app.use('/assets', express.static(__dirname + '/assets')) 
app.use(express.urlencoded({extended: false}))


app.get('/', function(request, response){


    db.connect(function(err, client, done){
        if (err) throw err // menampilkan error koneksi database

        client.query('SELECT * FROM tb_projects', function(err, result){
           
            if (err) throw err
            console.log(result.rows);
            let data = result.rows

            let  dataProjects= data.map(function(item){
                return {
                    ...item,
                }
            })

            response.render('index',{ projects: dataProjects})
        })
    })

})

app.get('/contact', function(request, response){
    response.render('contact')
})


app.get('/myproject', function(request, response){
    response.render('myproject')
})

app.post('/myproject', function(request, response){
      response.redirect('/')
})

app.get('/detail-project/:index', function(request, response){
response.render('detail-project',blog)
})

app.get('/delete-project/:index', function(request, response){
response.redirect('/')
})

app.get('/update/:index', function(request, response){
response.render('update')
})

app.post('/update/:index', function(request, response){
response.redirect('/');
})

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
})