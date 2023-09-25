import mysql from 'mysql2';




const connection = mysql.createPool({
    host:'ckshdphy86qnz0bj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user : 'dhktko5acy2uts3d',
    password: 'sgdbrkvaqqi62sdy',
    database: 'k40mr47v586a7mtn'
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

