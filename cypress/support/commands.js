// require('cypress-xpath');
require('cypress-plugin-tab')
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { faker } from '@faker-js/faker';

Cypress.Commands.add('loginByAPI_full', (email, password) => {
  cy.session([email, password], () => {
    //step 1: send request to get token
    cy.request({
      url: 'https://questionable-api-googleperf-staging.bot-got-it.tech/sign-in/email',
      method: 'POST',
      headers: {
        contentType: "application/json",
      },
      body: { "email": email, "password": password }
      //step 2: then save token to local storage
    }).then(res => {
      const responseBody = res.body;
      const tokenByAPI = responseBody.access_token
      const authorization = `Bearer ${tokenByAPI}`;
      // window.localStorage.setItem('questionable-portal.demo.demo-auth', `${tokenByAPI}`) //not work
      window.localStorage.setItem('questionable-portal.demo.demo-auth', `{"accessToken":"${tokenByAPI}"}`);
      //step 4 (optional): create a new file to store data
      const filename1 = 'cypress/fixtures/dataFake.json'
      cy.writeFile(filename1, {
        'authorization': authorization
      })
    })
  })
})

Cypress.Commands.add('loginByUI', (url, email, password) => {
  cy.session([email, password], () => {
    cy.visit(url)
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get(`[type='submit']`).click()
    //verify login successfully
    cy.contains('Welcome to Article Bot').should('be.visible')
  })
})

Cypress.Commands.add('loginByAPI', (url, email, password) => {
  cy.session([email, password], () => {
    //step 1 (mandatory): send request to get token
    //create session - new M3 release
    cy.request({
      url: "https://questionable-api-googleperf-staging.bot-got-it.tech/sessions",
      method: 'POST',
      headers: {
        contentType: "application/json",
      }
    }).then(res1 => {
      const fe_session_id = res1.body.id
      cy.request({
        url: url,
        method: 'POST',
        headers: {
          contentType: "application/json",
          "X-Session-Id": fe_session_id
        },
        body: { "email": email, "password": password }

        //step 2 (mandatory): then save accessToken to local storage of site to login successfully
      }).then(res2 => {
        window.localStorage.setItem('questionable-portal.demo.demo-auth', `{"accessToken":"${res2.body.access_token}"}`);
        window.localStorage.setItem('questionable-portal.demo.sessionId', `"${fe_session_id}"`);

        //step 3 (optional): store authorization in dataFake file in fixtures
        const filename1 = 'cypress/fixtures/dataFake.json'
        const authorization = `Bearer ${res2.body.access_token}`;
        cy.writeFile(filename1, {
          'authorization': authorization
        })
      })
    })
  })
})

//write data after successful registration
Cypress.Commands.add('writeToMegaBotJson', (fileNamePath, data1, data2) => {
  cy.readFile(fileNamePath).then((data) => {
    data.push({ 'slug': data1, 'name': data2 })
    cy.writeFile(fileNamePath, data)
  })
})

//save account after successful registration
Cypress.Commands.add('writeDataToFile', (fileNamePath, data1, data2, data3) => {
  cy.readFile(fileNamePath).then((data) => {
    data.push({ 'email': data1, 'password': data2, 'firstName': data3 })
    cy.writeFile(fileNamePath, data)
  })
})

Cypress.Commands.add('readJson', (jsonName) => {
  cy.fixture(jsonName).then(json => {
    return JSON.parse(JSON.stringify(json)
    );
  });
});

Cypress.Commands.add('includeUrl', (url) => {
  cy.url().should('include', url)
})

Cypress.Commands.add('includeText', (elm, text) => {
  cy.get(elm).should('include.text', text).and('be.visible')
})

//https://glebbahmutov.com/cypress-examples/recipes/click-random-element.html#click-a-single-picked-list-item
Cypress.Commands.add('selRandLine', (itemList, itemAfterSelected) => {
  // first, make sure the elements are on the page

  cy.xpath(itemList)
    .should('have.length.gte', 1)
    // get the number of elements
    .its('length')
    .then((n) => Cypress._.random(0, n - 1))
    .then((k) => {
      cy.log(`picked random index ${k}`)
      // get all elements again and pick one
      cy.xpath(itemList).eq(k).click()
      // confirm the click
      cy.xpath(itemAfterSelected).should('have.length.gte', 1)
    })
  cy.wait(500)
})

Cypress.Commands.add('getOTPfromSlack', (urlData, tokenData, parentXpath) => {
  const token = tokenData;
  const authorization = `Bearer ${token}`;
  cy.request({
    url: urlData,
    method: 'GET',
    headers: {
      //contentType: "application/json"
      authorization
    },
    body: {
      //email: user, password: btoa(password)
    }
  }).then(res => {
    const responseData = res.body;
    // cy.log('authorization: ' + authorization);
    // cy.log(responseData);
    const HostsToRemove = responseData.messages[0].attachments[0].text
    // cy.log('HostsToRemove', HostsToRemove);
    const fullOTP = HostsToRemove.substring(HostsToRemove.indexOf(' ') + 1);
    // cy.log('fullOTP', fullOTP);
    // cy.log('splitStr', fullOTP[0]);
    // cy.log('splitStr', fullOTP[1]);
    // cy.log('splitStr', fullOTP[2]);
    // cy.log('splitStr', fullOTP[3]);
    // cy.log('splitStr', fullOTP[4]);
    // cy.log('splitStr', fullOTP[5]);

    //Input OTP into Verify Email Page
    cy.xpath(`(${parentXpath})[1]`).type(fullOTP[0]);
    cy.xpath(`(${parentXpath})[2]`).type(fullOTP[1]);
    cy.xpath(`(${parentXpath})[3]`).type(fullOTP[2]);
    cy.xpath(`(${parentXpath})[4]`).type(fullOTP[3]);
    cy.xpath(`(${parentXpath})[5]`).type(fullOTP[4]);
    cy.xpath(`(${parentXpath})[6]`).type(fullOTP[5]);
  })
})

//https://dev.to/walmyrlimaesilv/how-to-create-fixtures-with-random-data-using-cypress-and-faker-46cl    
Cypress.Commands.add('generateFakeData', () => {
  const filename1 = 'cypress/fixtures/dataFake.json'
  let randPassword = faker.internet.password();
  let randFirstName = faker.name.firstName();
  let randLastName = faker.name.lastName();
  let randPhone = faker.phone.number('09########').replace(/[^a-zA-Z0-9 ]/g, '');
  let randTime = Date.now();
  let randEmail = randFirstName + randLastName + '@gotitapp.co';

  cy.writeFile(filename1, {
    'randEmail': randEmail,
    'randPassword': randPassword,
    'randFirstName': randFirstName,
    'randLastName': randLastName,
    'randPhone': randPhone,
    'randTime': randTime
  })
})

//write data after successful registration
Cypress.Commands.add('writeToJson', (fileNamePath, data1, data2, data3, data4) => {
  //Add data to json file
  const filename = fileNamePath
  // cy.log('filename: ', filename)
  // cy.log('fileNamePath: ', fileNamePath)
  cy.readFile(filename, (err, data5) => {
    if (err) {
      return console.error(err);
    };
  }).then((data) => {
    data.push({ 'randEmail': data1, 'randPassword': data2, 'randPhone': data3, 'randTime': data4 })
    cy.writeFile(filename, data)
  })
})

// parse XLSX file and write to JSON
// Cypress.Commands.add("parseXlsx", (inputFile) => {
// return cy.task('parseXlsx', { filePath: inputFile })
Cypress.Commands.add("parseXlsx", (excelInputFile, jsonOutputFile) => {
  return cy.task('parseXlsx', { filePath: excelInputFile }).then((jsonData) => {
    const rowLength = Cypress.$(jsonData[0].data).length
    var jsonData1 = jsonData[0].data
    let data = [];
    for (let index = 1; index < rowLength; index++) {
      var element = jsonData1[index]
      data.push({ email: element[0], password: element[1], errorMessage: element[2] })
    }
    cy.writeFile(jsonOutputFile, data)
  })
});

Cypress.Commands.add("startOverAndOver", (maxNumberToStartOver) => {
  var j = 0;
  while (j < maxNumberToStartOver) {
    //wait for bottom Logo appears to make sure the page is loaded completely
    cy.get(`img[alt='Powered by Got It, Inc.']`).should('be.visible')
    //wait for invisible state of start-over button to be disappear
    cy.get(`.u-cursorDefault`).should('not.exist')
    //wait for visible state of start-over button to be appear and click on it
    cy.get(`div[data-name='start-over']`).click()
    //wait for Confirmation modal appears
    cy.get(`.u-shadowMedium`).should('be.visible')
    //click on Confirm to start-over button
    cy.get(`.CustomButton`).first().click()
    cy.log('while loop click ok: ' + j)
    j++;
  }
})
Cypress.Commands.add("clickVoiceCallAndOver", (maxNumberToStartOver) => {
  var j = 0;
  //click on voice call 20 times
  while (j < maxNumberToStartOver) {
    //wait for bottom Logo appears to make sure the page is loaded completely
    cy.get(`img[alt='Powered by Got It, Inc.']`).should('be.visible')
    //wait for invisible state of start-over button to be disappear
    cy.get(`.u-cursorDefault`).should('not.exist')
    //wait for visible state of start-over button to be appear and click on it
    cy.get(`div[data-name='start-over']`).click()
    //wait for Confirmation modal appears
    cy.get(`.u-shadowMedium`).should('be.visible')
    //click on Confirm to start-over button
    cy.get(`.CustomButton`).first().click()
    cy.log('while loop click ok: ' + j)
    j++;
  }

})

Cypress.Commands.add("randCheckboxSel", (checkboxElm) => {
  cy.xpath(checkboxElm)
    // .should('have.length.gte', 1)
    .its('length')
    .then((n) => Cypress._.random(0, n - 1))
    .then((k) => {
      cy.log(`picked random index ${k}`)
      cy.xpath(checkboxElm).eq(k).click()
    })
})

Cypress.Commands.add("randUnitExpand", (itemList) => {
  cy.xpath(itemList)
    // .should('have.length.gte', 1)
    .its('length')
    .then((n) => Cypress._.random(0, n - 1))
    .then((k) => {
      cy.log(`picked random index ${k}`)
      cy.xpath(itemList).eq(k).click()
    })
})
Cypress.Commands.add("randLOinUnitSelected", (itemList) => {
  cy.get(itemList)
    // .should('have.length.gte', 1)
    .its('length')
    .then((n) => Cypress._.random(0, n - 1))
    .then((k) => {
      cy.log(`picked random index ${k}`)
      cy.get(itemList).eq(k).click()
    })
})
Cypress.Commands.add("customType", (elmCSS) => {
  cy.get(elmCSS).clear().type('')
  cy.get(elmCSS).clear().type('abcbajsajlallaf')
  cy.get(elmCSS).clear().type('12345')
  cy.get(elmCSS).clear().type('!@#$%^&*()_+')
  if (cy.get(elmCSS).type('5000 words')) {
    // error appears here
  }
})

// Cypress.Commands.add("customClick", (elmCSS) => {
//   cy.get(elmCSS).click()
//   cy.get(elmCSS).should('not.exist')
// })

//https://dev.to/walmyrlimaesilv/how-to-check-multiple-checkboxes-at-once-with-cypress-26jd
Cypress.Commands.add("clickAll", (elmCSS) => {
  cy.get(elmCSS)
    .as('checkboxes')
    .check()
})
Cypress.Commands.add("clickAllXpath", (elmXpath) => { //not work till 15 Nov
  cy.xpath(elmXpath)
    .as('checkboxes')
    .check()
})

Cypress.Commands.add('loginByPredefinedAccessToken', (email, password) => {
  // cy.session([email, password], () => {
  //step 1 (mandatory): send request to get token
  //create session - new M3 release
  cy.request({
    url: "https://mathgpt-api-exp.tutoruniverse.net/email-verifications",
    method: 'POST',
    headers: {
      contentType: "application/json",
    },
    body: { "email": "manh+educator1@gmail.com", "code": "0LT6y2/3IY" }

  }).then(res => {
    window.localStorage.setItem('gotit.mathgpt-educator.authenticated_access_token', res.body.access_token);

    // //step 3 (optional): store authorization in dataFake file in fixtures
    // cy.writeFile(filename, {
    //   'authorization': authorization
    // })
  })
  // })
})

//Cypress 10 does not work
// set match case to default false
//  Cypress.Commands.overwrite('contains', (originalFn, subject, value, options) => {
//   const matchCase = options?.matchCase || false;
//   return originalFn(subject, value, { ...options, matchCase });
// });

Cypress.Commands.add('loginByAccessToken', (url, email, code, accessToken) => {
  // Cypress.Commands.add('loginByAccessToken', (
  // cy.session([email, password], () => {
  //step 1 (mandatory): send request to get token
  //create session - new M3 release
  cy.request({
    url: url,
    method: 'POST',
    headers: {
      contentType: "application/json",
    },
    body: { "email": email, "code": code }

  }).then(res => {
    window.localStorage.setItem('gotit.mathgpt.authenticated_access_token', accessToken);

    // //step 3 (optional): store authorization in dataFake file in fixtures
    // cy.writeFile(filename, {
    //   'authorization': authorization
    // })
  })
  // })
})

// commands.js
Cypress.Commands.add('textVisible', (text) => {
  return cy.contains(text).should('be.visible');
});

Cypress.Commands.add('elementContainsText', (element, text) => {
  return cy.get(element).contains(text)
});


Cypress.Commands.add('elementDisabled', (text) => {
  return cy.contains(text).should('not.exist');
});

Cypress.Commands.add('randomClick', (element) => {
  //click a random book
  cy.get(element)
    .should('have.length.gte', 1)
    .its('length')
    .then((n) => Cypress._.random(0, n - 1))
    .then((k) => {
      // cy.log(`picked random index ${k}`)
      cy.get(element).eq(k).click()
    })
});

//If Keep hackers out page is displayed, click on Skip button
Cypress.Commands.add('elementExists', (selector, textToVerify) => {
  //Element exists or not: https://stackoverflow.com/questions/56145926/how-to-check-if-element-exists-using-cypress-io
  cy.get('body').then($body => {
    if ($body.find(selector).length) {
      //Do something if exist
      cy.get(selector).should('contains.text', textToVerify);
      cy.get('#ap-account-fixup-phone-skip-link').click();
    }
    else {
      //do if not exist
    }
  })
});

// // set match case to default false
// Cypress.Commands.overwriteQuery('contains', (originalFn, subject, value, options) => {
//   const matchCase = options?.matchCase || false;
//   return originalFn(subject, value, { ...options, matchCase });
// });

Cypress.Commands.add('loginByAPIgetRefreshToken', (token_refreshes_api_url, original_refresh_token) => {
  // cy.session([email, password], () => {
  //step 1: send request to get token
  cy.request({
    url: token_refreshes_api_url,
    method: 'POST',
    headers: {
      contentType: "application/json",
      // accept: "application/json",
    },
    body: { "refresh_token": original_refresh_token }
    //step 2: then save token to local storage
  }).then(res => {
    const responseBody = res.body;
    const access_token = responseBody.access_token
    const refresh_token = responseBody.refresh_token

    // window.localStorage.setItem('questionable-portal.demo.demo-auth', `${tokenByAPI}`) //not work
    window.localStorage.setItem('gotit.mathgpt.authenticated_access_token', access_token);
    window.localStorage.setItem('gotit.mathgpt.authenticated_refresh_token', refresh_token);

    //step 4 (optional): create a new file to store data
    const filename1 = 'cypress/fixtures/token.json'
    cy.writeFile(filename1, {
      'access_token': access_token,
      'refresh_token': refresh_token
    })
  })
  // })
})

Cypress.Commands.add('loginAPIThenGetAccessTokenAPI', (login_api_get_refresh_token, token_refreshes_api_url, email, password) => {
  // Step 1: Login API
  cy.request({
    url: login_api_get_refresh_token,
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    body: {
      email: email,
      password: password
    }
  }).then(loginResponse => {
    // Assuming the response contains the refresh token
    const original_refresh_token = loginResponse.body.refresh_token;
    // Step 2: Get new token API
    cy.request({
      url: token_refreshes_api_url,
      method: 'POST',
      headers: {
        contentType: 'application/json'
      },
      body: { "refresh_token": original_refresh_token }
    }).then(res => {
      const { access_token, refresh_token } = res.body;
      // const responseBody = res.body;
      // const access_token = responseBody.access_token;
      // const refresh_token = responseBody.refresh_token;

      // Step 3: Save tokens to local storage
      window.localStorage.setItem('gotit.mathgpt.authenticated_access_token', access_token);
      window.localStorage.setItem('gotit.mathgpt.authenticated_refresh_token', refresh_token);

      // Step 4: Write tokens to a file
      const filename = 'cypress/fixtures/token.json';
      cy.writeFile(filename, { access_token, refresh_token });
      // cy.writeFile(filename1, {
      //   'access_token': access_token,
      //   'refresh_token': refresh_token
      // });
    });
  });
});  