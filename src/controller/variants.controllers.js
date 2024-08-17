const Variants = require("../model/variants.model");
const uploadFile = require("../utils/cloudinary");

const listVariants = async (req, res) => {
    try {
        const variant = await Variants.find()
        console.log(variant);


        if (!variant || variant.length === 0) {
            res.status(404).json({
                success: false,
                message: "variant data not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "variant data fetched",
            data: variant,
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}

const getVariant= async (req, res) => {
    try {
        const variant = await Variants.findById(req.params.variant_id)
        if (!variant) {
            res.status(404).json({
                success: false,
                message: "Data not found." + error.message
            })
        }

        res.status(200).json({
            success: true,
            message: "Variant Data fetched",
            data: variant
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error" + error.message
        })
    }
}
const addVariant = async (req, res) => {
    console.log("abc", req.file);
    console.log("fdd", req.body);
    let allFiles = [];
    if (req.files) {
      await Promise.all(
        req.files.map(async (file) => {
          const uploadedFile = await uploadFile(file.path, "Variants");
          allFiles.push(uploadedFile);
        })
      );
    }
    console.log("req.file", req.files);
    console.log("all  files", allFiles);
    const img = allFiles.map((file) => {
      return {
        public_id: file.public_id,
        url: file.url
      }
    })
  
    console.log("qwert", img);
    try {   
      const variant = await Variants.create({...req.body, image: img});
      if (!variant) {
        res.status(400).json({
          success: true,
          message: "failed to added variant",
          data: variant,
        });
      }
      res.status(201).json({
        success: true,
        message: "variant added successfully",
        data: variant,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error: " + error.message,
      });
    }
  };

const updateVariant = async (req, res) => {
    console.log("jdghdgh", req.body);
    try {
        const updatedVariant = await Variants.findByIdAndUpdate(
            req.params.variant_id,
            req.body,
            { new: true, runValidators: true }
        );

        console.log(updatedVariant);

       
            if (!updatedVariant) {
                res.status(400).json({
                    success: false,
                    message: "Bad request",
                });

            };
            res.status(201).json({
                success: true,
                message: "Variant updated successfully",
                data: updatedVariant,
            });
    } catch (error ) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

const deleteVariant = async (req, res) => {
    try {
        const variant = await Variants.findByIdAndDelete(req.params.variant_id);

        if (!variant) {
            res.status(404).json({
                success: false,
                message: "variant not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "variant deleted successfully",
            data: variant,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
}

module.exports={
    listVariants,
    getVariant,
    addVariant,
    updateVariant,
    deleteVariant
}