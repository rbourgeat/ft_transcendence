import pool from '../dbconfig/dbconnector';

class UsersController {

    public async get(req, res) {
        try {
            const client = await pool.connect();

            const sql = "SELECT * FROM users";
            const { rows } = await client.query(sql);
            const users = rows;

            client.release();

            res.send(users);
        } catch (error) {
            res.status(400).send(error);
        }
    }
}

export default UsersController;