const db = require("../config/db");

class Property {
  constructor(
    owner_id,
    status,
    price,
    state,
    city,
    address,
    type,
    image_url,
    cloudinary_id
  ) {
    this.owner_id = owner_id;
    this.status = status;
    this.price = price;
    this.state = state;
    this.city = city;
    this.address = address;
    this.type = type;
    this.image_url = image_url;
    this.cloudinary_id = cloudinary_id;
  }

  static createProperty(newProp, result) {
    let sql =
      "INSERT INTO properties (owner_id, status, price, state, city, address, type, image_url, cloudinary_id) VALUES (?,?,?,?,?,?,?,?,?)";

    db.query(
      sql,
      [
        newProp.owner_id,
        newProp.status,
        newProp.price,
        newProp.state,
        newProp.city,
        newProp.address,
        newProp.type,
        newProp.image_url,
        newProp.cloudinary_id,
      ],
      (err, res, fields) => {
        if (err) {
          console.log("Error: ", err);
          result(err);
          return;
        }
        console.log("Property created :", newProp);
        result(null, { ...newProp });
      }
    );
  }

  static updatePropertyById(id, prop, result) {
    let sql =
      "UPDATE properties SET owner_id=?, status=?, price=?, state=?, city=?, address=?, type=?, image_url=?, cloudinary_id=? WHERE prop_id=?";
    db.query(
      sql,
      [
        prop.owner_id,
        prop.status,
        prop.price,
        prop.state,
        prop.city,
        prop.address,
        prop.type,
        prop.image_url,
        prop.cloudinary_id,
        id,
      ],
      (err, res) => {
        if (err) {
          console.log("Error", err);
          result(err);
          return;
        }
        console.log("Property updated", { ...prop });
        result(null, { ...prop });
      }
    );
  }

  static findAllProperty(result) {
    let sql = "SELECT * FROM properties";
    db.query(sql, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Properties :", res);
      result(null, res);
    });
  }

  static findPropertyById(id, result) {
    let sql = "SELECT * FROM properties WHERE prop_id= ?";
    db.query(sql, [id], (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      if (res) {
        console.log("Property found: ", res[0]);
        result(null, res[0]);
        return;
      }
      console.log("Property not flound");
      result({ kind: "not_found" }, null);
    });
  }

  static findPropertyByQuery(type, result) {
    let sql = "SELECT * FROM properties WHERE type= ?";
    db.query(sql, [type], (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      if (res) {
        console.log("Property found: ", res);
        result(null, res);
        return;
      }
      console.log("Property not flound");
      result({ kind: "not_found" }, null);
    });
  }

  static findCurrentPropertyInserted(result) {
    let sql = "SELECT * FROM properties ORDER BY prop_id DESC LIMIT 1";
    db.query(sql, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      if (res) {
        console.log("Property found: ", ...res);
        result(null, ...res);
        return;
      }
      console.log("Property not flound");
      result({ kind: "not_found" }, null);
    });
  }

  static deleteProperty(id, result) {
    let sql = "DELETE FROM properties WHERE prop_id=?";
    db.query(sql, [id], (err, res) => {
      if (err) {
        console.log("Error", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Deleted Property with Property Id:", id);
      result(null, res);
    });
  }
}

module.exports = Property;
