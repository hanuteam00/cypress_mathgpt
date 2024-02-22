import HomePageUI from '../../../../pageUIs/MathGPT/Educator/HomePageUI'

const homePageEdu = new HomePageUI();

describe('Test Suite 1', function () {

    beforeEach(function () {
        cy.fixture('data').then(function (data) {
            this.data = data;
        })
        //generate fake data and write to dataFake.json
        cy.generateFakeData()

        cy.loginByAPIgetRefreshToken("https://mathgpt-api.tutoruniverse.com/token-refreshes","eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI1MTEiLCJleHAiOjE3MDkwODYyMzMsImp0aSI6IjY1M2Y0NjNjZDA1ZTExZWU4OThhNWU2NmZlMGY0MWJlIiwiaXNzIjoiZ290LWl0LmFpL3Bob3Rvc3R1ZHkifQ.nCfJ6ab7d_rJqrP-oR7PmdSOFroDefbNdaDpY7WzEC7TT3upZdcIYTRv7kPK2RL4wLlF22ZrFEe8Sv-D27_k7J3MubH2cncrK66azmEhomjUvc7oD2Ue-B6xctZ5t_17lpP54usSdVxmLJ1aWdZmCies9T441UlUFxTQg3CgpCOhtZeSrh-Fd_LfcwBcw1lCFuHmfjnfj0mu0lywK9jX-pdda7w8nz_9ETmOrx1uIRe3C263XDs7g6dNdo6ovijLtps7g1iHmu2KgRc2ngXjRLMzP85P8UXGltE9Y4DmjtJMVud63o7V6GpCTI-M6U7q211nnCvciqdZPj7fVQF68Q")
        // cy.loginByAPIgetRefreshToken("https://mathgpt-api-dev.tutoruniverse.net//token-refreshes", "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI0NjQiLCJleHAiOjE3MDY0MDc1NzksImp0aSI6ImFhYTlmMTc0YjgwMTExZWViN2U1YmVhOTQ1MTBkNzQ1IiwiaXNzIjoiZ290LWl0LmFpL3Bob3Rvc3R1ZHkifQ.KYVeeZOzbRE0asPkvCIlViegsHchB4dURZ1EzlKpAWC5iPmo3jHIwYOjrm08y9oq6Eya6dUbtWv-_XeksLzThkaryoAaL18avivkUahF8FKKBxmbFIQYcJnl34BO2oXLJLrafeIOcIO0D9EnowK_jB2W0uYe4SsBCXPQfHxoABH3pod1OE5GF_XVxtsRKD24ado9QRx8iZf_VmdbUvuqHepvfWAJB4gTPoucajIp5IwxWEmZArSSbYtKwX4uuvqM5khpiCZ-_xztuVTEUxXQnN0GsEgU2YZKd26ScSHr-h0Hgr5sjhzpF2CxcFwGcLqqcCJGs7ntqbsJbYf-SK_c_A")

        //get data from dataFake.json
        cy.fixture('dataFake').then(function (dataFake) {
            //get data from dataFake.json
            this.dataFake = dataFake;
        })

        cy.fixture('realEduAccount').then(function (realEduAccount) {
            //get data from invalidLogin.json
            this.realEduAccount = realEduAccount;
        })


    })

    it.only('[Homepage] Educator will see maximum 3 courses ordered by latest access time ', function () {
        cy.visit('/home');

        
    })
})