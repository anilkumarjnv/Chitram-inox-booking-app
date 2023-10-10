import mysql from 'mysql2';




const connection = mysql.createPool({
    host:'sql12.freesqldatabase.com',
    user : 'sql12652212',
    password: 'kp5mfNWI8X',
    database: 'sql12652212'
}).promise()

export async function readUser(username) {
    const output = await connection.query("select * from user_details where username=?",[username])
    return output[0];
    
}

export async function insertUser(username,name,password){
    const result = await connection.query('INSERT INTO user_details (username,name,password) VALUES (?,?,?)', [username,name,password]);
}
export async function checkUsername(username){
    const result = await connection.query('SELECT * FROM user_details WHERE username = ?', [username]);
    return(result[0].length)
}

