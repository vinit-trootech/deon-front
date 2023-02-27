//   const headers = {
//     'Authorization': 'Bearer my-token',
//     'My-Custom-Header': 'foobar'
//   };
//   return axios.post('http://restapi.adequateshop.com/api/authaccount/login', payload, { headers })


import axios from "axios";

const token = JSON.parse(localStorage.getItem("ACCESS_TOKEN"));

// export const getData = (url) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get(url, {
//         headers: {
//           Authorization: "Bearer" + token,
//         },
//       })
//       .then(
//         (response) => {
//           if (response.status === 200) {
//             resolve(response);
//           } else {
//             reject(response);
//           }
//         },
//         (err) => {
//           reject(err);
//           throw err;
//         }
//       );
//   });
// };

export const postData = (url, params) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers = {
          'Authorization': 'Bearer my-token',
          'My-Custom-Header': 'foobar'
        }
      })
      .then(
        (response) => {
          if (response.status === 200) {
            resolve(response);
          } else {
            reject(response);
          }
        },
        (err) => {
          reject(err);
          throw err;

        }
      );
  });
};

// export const deleteData = (url) => {
//   var response = axios.delete(url, {
//     headers: {
//       Authorization: "Bearer " + token,
//     },
//   });
//   return response.data;
// };

// export const putData = (url, params) => {
//   return new Promise((resolve, reject) => {
//     axios
//       .put(url, params, {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       })
//       .then(
//         (response) => {
//           if (response.status === 200) {
//             resolve(response);
//           } else {
//             reject(response);
//           }
//         },
//         (err) => {
//           reject(err);
//           throw err;
//         }
//       );
//   });
// };
