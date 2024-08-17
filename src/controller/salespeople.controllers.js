const { Salespeople } = require("../model");


const getSalesPeople = async (req, res) => {
    try {
        const salespeople = await Salespeople.getSalespeople()

        console.log('controller', salespeople);

        res.status(200).json({
            success: true,
            message: "Salespeople Data fetched",
            data: salespeople
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const addSalespeople = async (req, res) => {
    try {
        const { sname, city, comm } = req.body
        const salespeople = await Salespeople.addSalespeople(sname, city, comm)

        console.log(salespeople);
        res.status(200).json({
            success: true,
            message: "Salespeople Data add",
            data: salespeople
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const getSalespeopleData = async (req, res) => {
    try {
        
        const salespeople = await Salespeople.getSalespeopledata(req.params.salespeople_id)

        console.log("onedata",salespeople);
        res.status(200).json({
            success: true,
            message: "Salespeople Data fetched",
            data: salespeople
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const updateSalespeople= async (req, res) => {
    try {
        const { snum } = req.params;
        const { sname, city, comm } = req.body
        const salespeople = await Salespeople.editSalespeople(sname,city,comm,parseInt(snum))

        console.log("onedata",salespeople);
        res.status(200).json({
            success: true,
            message: "Salespeople Data Updated",
            data: salespeople
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const deleteSalespeopleData = async (req, res) => {
    try {
      const {snum} = req.params;
      const salespeople = await Salespeople.deleteSalespeople(snum);
      res.status(200).json({
        success: true,
        message: "salespeople data delete successfully.",
        data: salespeople,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
    getSalesPeople,
    addSalespeople,
    getSalespeopleData,
    updateSalespeople,
    deleteSalespeopleData
}