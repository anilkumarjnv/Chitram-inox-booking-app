import mysql from 'mysql2';




const connection = mysql.createPool({
    host:'127.0.0.1',
    user : 'root',
    password: 'Anil1531@',
    database:'my_db'
}).promise()

export async function readUser(username) {
    const output = await connection.query("select * from users where username=?",[username])
    return output[0];
    
}

export async function insertUser(username,name,password){
    const result = await connection.query('INSERT INTO users (username,name,password) VALUES (?,?,?)', [username,name,password]);
}
export async function checkUsername(username){
    const result = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    return(result[0].length)
}

