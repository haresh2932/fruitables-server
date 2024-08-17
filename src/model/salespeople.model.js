const pool = require("../db/mysql");


const getSalespeople = async (req, res) => {
    try {
        const [results, fields] = await pool.execute("SELECT * FROM salespeople")
        return results
    } catch (error) {
        throw new Error('Error In Salespeople fetched.')
    }
}

const getSalespeopledata = async (id) => {
    console.log(id);
    try {
        const [results, fields] = await pool.execute("SELECT * FROM salespeople WHERE snum=" + id)
        // console.log(results);
        return results
    } catch (error) {
        throw new Error('Error In Salespeople fetched.')
    }
}

const addSalespeople = async (sname, city, comm) => {
    try {
        const [data] = await pool.execute(
            "INSERT INTO salespeople(sname,city,comm) VALUES (?,?,?)",
            [sname, city, comm]
        )
        const results = { snum: data.insertId, sname, city, comm }
        return results
    } catch (error) {
        throw new Error('Error In add Salespeople data.')
    }
}


const editSalespeople = async (sname, city, comm, snum) => {
    console.log("bb", sname, city, comm, snum);
    try {
        const [data] = await pool.execute(
            "UPDATE salespeople SET sname=?,city=?,comm=? WHERE snum=?",
            [sname, city, comm, snum]

        )

        const results = {snum, sname, city, comm }
        return results
    } catch (error) {
        console.log(error);
    }
}

const deleteSalespeople = async (snum) => {
    try {
        const data = await pool.execute("DELETE FROM salespeople WHERE snum = ?", [
            snum,
        ]);
        return data
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getSalespeople,
    addSalespeople,
    getSalespeopledata,
    editSalespeople,
    deleteSalespeople
}