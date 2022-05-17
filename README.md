# ApexHauz
A restapi where a user can sign in and sign up. An authenticated user has privileges to
1. Create a property advert
2. Update the property advert
3. Mark a property as sold
4. Delete a property

All users can find a property, properties, and specific property of a type.

This work uses JWT for authentication and mySQL database.

## Sign Up
A user signs up with the following in the order : email, firstname, lastname, password, phone, address and is_admin.
## Sign In
A user signs in with an email and his/her password.
## Creating Property Advert
Authenticated users create property adverts with the following: price, state, city, address, type and image.
## Updating Property Advert
Authenticated users can update their property adverts. Using POSTMAN , the fields used to create the property advert are all required even when only some are updated.

### Authenticated users can also mark their property as sold and also delete their property adverts.
