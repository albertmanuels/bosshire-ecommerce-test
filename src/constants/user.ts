/**
 * Mocked admin user account based on real data from FakeStoreAPI.
 *
 * This account is selected as the application's default admin because:
 * - It is one of the actual users from the FakeStoreAPI (`/users` endpoint).
 * - Both `username` and `password` meet the minimum login requirement (≥ 8 characters).
 *
 * This user can be used for testing or role-based access control in scenarios
 * where admin-level permissions are needed.
 *
 * @example
 * if (user.username === ADMIN.username && user.password === ADMIN.password) {
 *   // grant admin access
 * }
 */
export const ADMIN = {
  address: {
    geolocation: {
      lat: "40.3467",
      long: "-30.1310",
    },
    city: "Cullman",
    street: "Frances Ct",
    number: 86,
    zipcode: "29567-1452",
  },
  id: 3,
  email: "kevin@gmail.com",
  username: "kevinryan",
  password: "kev02937@",
  name: {
    firstname: "kevin",
    lastname: "ryan",
  },
  phone: "1-567-094-1345",
  __v: 0,
};
