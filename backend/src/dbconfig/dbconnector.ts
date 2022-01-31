import { Pool } from 'pg';

const pool = new Pool ({
    max: 20,
    connectionString: 'postgres://postgres:42mdp@postgres:5432/transcendence',
    idleTimeoutMillis: 30000
});

export default pool;