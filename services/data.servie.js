//import json token 
const jwt = require('jsonwebtoken');

//import db
const db = require('../db.js');

// userDetails = {
//   1000: {
//     account: 1000,
//     password: 1000,
//     username: 'mina',
//     balance: Number(4000000),
//     transaction: []
//   },
//   1001: {
//     account: 1001,
//     password: 1001,
//     username: 'hish',
//     balance: Number(40000),
//     transaction: []
//   },
//   1002: {
//     account: 1002,
//     password: 1002,
//     username: 'suh',
//     balance: Number(400),
//     transaction: []
//   }
// }

//register with database mobgodb=>saving user data in mongodb
const register = (username, account, password) => {
  return (db.User.findOne({ account }))
    .then(user => {
      if (user) {
        return {
          status: false,
          statusCode: 400,
          message: 'user already registered'
        }
      } else {
        const newUser = new db.User({
          account: account,
          username: username,
          password: password,
          balance: 0,
          transaction: [],
        })
        newUser.save();
        return {
          status: true,
          statusCode: 200,
          message: 'user register successfully'
        }
      }
    })
}
//register
// register = (username, account, password) => {
//   if (account in userDetails) {
//     return {
//       status: "false",
//       message: "user already registered",
//       statusCode: 400
//     };
//   } else {
//     userDetails[account] = {
//       account: account,
//       password: password,
//       username: username,
//       balance: 0,
//       transaction: [],
//     }
//   }
//   console.log(userDetails);
//   return {
//     status: "true",
//     message: "register successfully",
//     statusCode: 200
//   };
// }

//login with mongodb database
const login = (account, password) => {
  return db.User.findOne({ account })
    .then(user => {
      if (user) {
        if (password == user.password) {
          currentUser = user.username;
          currentAccount = account;
          const token = jwt.sign({ currentAccount: account }, 'superkey2022');
          return {
            statusCode: 200,
            status: true,
            message: 'login successfully',
            token: token,
            currentUser: user.username,
            currentAccount: account
          }
        } else {
          return {
            statusCode: 400,
            status: false,
            message: 'invalid password'
          }
        }
      }
      else {
        return {
          statusCode: 400,
          status: false,
          message: 'invalid data'
        }

      }
    })
}


//in login
// login = (account, password) => {
//   if (account in userDetails) {
//     if (userDetails[account].password == password) {
//       currentUser = userDetails[account].username;
//       currentAccount = account;
//       //to generate token
//       const token = jwt.sign(
//         { currentAccount: account }, 'superkey2022');
//       //it will generate A number and assigned to token
//       return {
//         status: 'true',
//         statusCode: 200,
//         message: 'login successfully',
//         token: token
//       }
//     } else {
//       return {
//         status: 'false',
//         statusCode: 400,
//         message: 'password mismatsh'
//       };
//     }
//   } else {
//     return {
//       status: 'false',
//       statusCode: 400,
//       message: 'user not registered'
//     };
//   }
// }

//get transaction
// getTransaction = (account) => {
//   return {
//     status: 'true',
//     statusCode: 200,
//     Transaction: userDetails[account].transaction,
//   }
// }


const getTransaction = (account) => {
  return db.User.findOne({ account })
    .then(user => {
      if (user) {
        return {
          staus: true,
          statusCode: 200,
          transaction: user.transaction
        }
      } else {
        return {
          status: false,
          statusCode: 400,
          message: 'invalid user'
        }
      }
    })
}


//withdraw
// withdraw = (account, password, amount) => {
//   let cash = parseInt(amount);
//   if (account in userDetails) {
//     if (userDetails[account].password == password) {
//       if (userDetails[account].balance > cash) {
//         userDetails[account].balance -= cash;
//         userDetails[account].transaction.push({
//           type: 'Debit',
//           amount: amount,
//         });
//         return {
//           status: true,
//           statusCode: 200,
//           message: `${amount} is debited from account ${account} and now the balance is ${userDetails[account].balance}`
//         };
//       } else {
//         return {
//           status: 'false',
//           statusCode: 400,
//           message: 'amount is larger than balance'
//         };
//       }
//     } else {
//       return {
//         status: 'false',
//         statusCode: 400,
//         message: 'password mismatsh'
//       };
//     }
//   } else {
//     return {
//       status: 'false',
//       statusCode: 400,
//       message: 'user not registered'
//     };
//   }
// }

//withdraw

const withdraw = (account, password, amount) => {
  let amt = parseInt(amount);
  return db.User.findOne({ account })
    .then(user => {
      if (user) {
        if (user.password == password) {
          if (user.balance > amt) {
            user.balance -= amt;
            user.transaction.push({
              type: 'Debit',
              amount: amount,
            });
            user.save();
            return {
              status: true,
              statusCode: 200,
              message: `${amt} is debited and balance is ${user.balance}`
            }
          } else {
            return {
              status: false,
              statusCode: 400,
              message: `${amt} is greater than balance `
            }
          }
        } else {
          return {
            status: false,
            statusCode: 400,
            message: `invalid password`
          }
        }
      } else {
        return {
          status: false,
          statusCode: 400,
          message: `invalid user`
        }
      }
    })
}

//deposite
// deposit = (account, password, amt) => {
//   let amount = parseInt(amt);
//   if (account in userDetails) {
//     if (userDetails[account].password == password) {
//       userDetails[account].balance += amount;
//       userDetails[account].transaction.push({
//         type: 'credit',
//         amount: amount,
//       });
//       return {
//         status: true,
//         statusCode: 200,
//         message: `${amount} is credited to account ${account} and now the balance is ${userDetails[account].balance} `
//       };
//     } else {
//       return {
//         status: 'false',
//         statusCode: 400,
//         message: 'password mismatsh'
//       };
//       //return false
//     }
//   } else {
//     return {
//       status: 'false',
//       statusCode: 400,
//       message: 'user not registered'
//     };
//     //return false
//   }
// }


//deposite
const deposit = (account, password, amount) => {
  let amt = parseInt(amount);
  return db.User.findOne({ account })
    .then(user => {
      if (user) {
        if (user.password == password) {
          user.balance += amt;
          user.transaction.push({
            type: 'credit',
            amount: amt,
          });
          user.save();
          return {
            status: true,
            statusCode: 200,
            message: `${amt} is credited and balance is ${user.balance}`
          }
        } else {
          return {
            status: false,
            statusCode: 400,
            message: 'invalid password'
          }
        }
      } else {
        return {
          status: false,
          statusCode: 400,
          message: 'invalid user'
        }
      }
    })
}

const deleteAccount = (account) => {
  return db.User.deleteOne({ account })
    .then((user) => {
      if (user) {
        return {
          status: true,
          statusCode: 200,
          message: ` account ${account} deleted successfully`
        }
      } else {
        return {
          status: false,
          statusCode: 400,
          message: 'account not found'
        }
      }
    })
}

//export functions
module.exports = {
  register,
  getTransaction,
  login,
  withdraw,
  deposit,
  deleteAccount
}