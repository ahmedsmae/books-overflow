const user = {
  _id: 'thisisarandomidforbooksoverflowapp',
  firstname: 'Ahmed',
  lastname: 'Afifi',
  email: 'ahmed.mohsen.afifi@gmail.com',
  password: 'PASS',
  avatarid: 'thisisarandomidforbooksoverflowapp',
  contactnumber: '+971 502138893', // give an option for the user while posting book or collection to give the access to his number with the book or collection
  // ! bookscount: 50, // this number will be counted based on the books the user post
  defaultlatitude: 102.04,
  defaultlongitude: 54.66, // filter list + add button to check current location and set it here
  defaultcurrency: 'EP', // dropdown list + auto detect the default location currency
  bio: 'Comment about yourself.',
  blockedusers: [
    {
      userid: 'thisisarandomidforbooksoverflowapp',
      reason: 'Whaever reason for blocking the user'
    }
  ],
  // chats will have an ownerid, so no need to add it in here
  notifications: [
    {
      notificationid: 'thisisarandomidforbooksoverflowapp',
      seen: 'true or false'
    }
  ],
  favourites: [
    {
      kind: 'BOOK or COLECTION',
      fovouriteitemid: 'thisisarandomidforbooksoverflowapp'
    }
  ],
  tokens: [
    {
      token: 'thisisarandomtokenforbooksoverflowapp'
    }
  ],
  timestamp: 'createdAt, lastUpdated'
};
