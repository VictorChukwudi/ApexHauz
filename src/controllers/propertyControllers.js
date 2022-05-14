const Property = require("../model/property.model");
const db = require("../model/property.model");

const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const create_prop = (req, res) => {
  let owner_id = req.user.id;
  console.log(req.user.id);
  if (!req.body) {
    res.status(400).json({
      message: "All fields must be filled",
    });
  }

  cloudinary.uploader.upload(req.file.path, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    let { status, price, state, city, address, type } = req.body;

    let image_url = result.secure_url;
    let cloudinary_id = result.public_id;

    // Status is set to available if undefined
    //That is, by default , it is  available

    if (typeof status === "undefined") {
      status = "available";
    }

    let property = new Property(
      owner_id,
      status,
      price,
      state,
      city,
      address,
      type,
      image_url,
      cloudinary_id
    );

    // Create new property by specifying the price,state,city,address, type,image_url

    Property.createProperty(property, (err, prop) => {
      if (err) {
        res.status(500).json({
          status: "failed",
          message: "Error occured while creating property",
        });
      }
      Property.findPropertyByOwnerId(property.owner_id, (err, result) => {
        if (err) {
          throw err;
        }
        res.status(200).json({
          ...result,
        });
      });
    });
  });
};

const updateProperty = (req, res) => {
  const id = Number(req.params.id);

  Property.findPropertyById(id, (err, item) => {
    if (err) {
      res.status(500).json({
        status: "Error",
        message: "Server error",
      });
    }
    console.log(item);
    if (!item) {
      res.status(404).json({
        status: "Error",
        message: "Property does not exist",
      });
    } else {
      //Delete Image
      cloudinary.uploader.destroy(item.cloudinary_id, (err, result) => {
        if (err) {
          throw err;
        }
        console.log("deleted image");
      });

      //Upload New Image
      cloudinary.uploader.upload(req.file.path, (err, result) => {
        if (err) {
          console.log(err);
          return;
        }

        //The following can be updated price, state, city, address, type, and image
        let { price, state, city, address, type } = req.body;

        let image_url = result.secure_url || item.secure_url;
        let cloudinary_id = result.public_id || item.cloudinary_id;

        if (!price || !state || !city || !address || !type) {
          res.status(400).json({
            status: "Error",
            message: "All fields must be filled",
          });
        } else {
          const propUpdate = new Property(
            req.user.id,
            item.status,
            price,
            state,
            city,
            address,
            type,
            image_url,
            cloudinary_id
          );

          Property.updatePropertyById(
            item.prop_id,
            propUpdate,
            (err, result) => {
              if (err) {
                throw err;
              }

              Property.findPropertyById(id, (err, result) => {
                if (err) {
                  throw err;
                }
                res.status(200).json({
                  ...result,
                });
              });
            }
          );
        }
      });
    }
  });
};

const deleteProperty = (req, res) => {
  const id = req.params.id;

  Property.findPropertyById(id, (err, item) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(500).json({
          status: "Error",
          message: "Server error",
        });
      }
    }

    if (!item) {
      res.status(404).json({
        status: "Error",
        message: "Property does not exist. Deleted already",
      });
    } else {
      cloudinary.uploader.destroy(item.cloudinary_id, (err, result) => {
        if (err) {
          res.status(500).json({
            status: "Error",
            message: "Server error",
          });
        }
        console.log("Image Deleted");

        Property.deleteProperty(id, (err, result) => {
          if (err) {
            throw err;
          }
          res.status(200).json({
            status: "success",
            data: item,
          });
        });
      });
    }
  });
};
module.exports = {
  create_prop,
  updateProperty,
  deleteProperty,
};
