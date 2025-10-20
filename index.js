const express = require('express')
let mysql = require('mysql2')
const app = express()
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extendend : true}));
app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

app.listen(PORT, () => {
    console.log('Server is running in port ${PORT}');
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mahasiswa',
    port: 3308   
})

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:' + err.stack);
        return;
    }
})

//Buat Method POST and GET

//GET
app.get('/api/users', (req,res) => {
    db.query('SELECT * FROM mahasiswa', (err, results) => {
        if (err) {
            console.error('Error excecuting query:0' + err.stack);
            res.status(500).send('Error Fetching users');
            return;
        }
        res.json(results);
    });
});


//POST
app.post('/api/users', (req,res) => {
    const { nama, nim, kelas} = req.body;

    if(!nama || !nim || !kelas) {
        return res.status(400).json({message: 'nama, nim, kelas wajib diisi'});
    }

    db.query(
        'INSERT INTO mahasiswa (nama, nim, kelas) VALUES (?, ?, ?)',
        [nama, nim, kelas],
        (err, results) => {
            if(err) {
                console.error(err);
                return res.status(500).json({message: "Database Error"});
            }

            res.status(201).json({message: 'User created successfully'});
        }
    );
});