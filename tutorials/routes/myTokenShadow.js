// 1. 라이브러리 설정과 객체화 (express, web3)
const express = require("express");
const router = express.Router();

const Web3 = require("web3");
const web3 = new Web3("http://localhost:8545");
const contract = require("../contract/myTokenShadow.js");
const sc = new web3.eth.Contract(contract.abi, contract.address);

// 2. / GET 토큰페이지 HTML 생성라우팅
router.get("/", async function(req, res) {
    try {
        const accounts = await web3.eth.getAccounts();
        const blockNumber = await web3.eth.getBlockNumber();
        // console.log(accounts);
        // console.log(blockNumber);
        const data = {
            title: "My token example", 
            accounts,   // accounts: accounts
            blockNumber // blockNumber: blockNumber
          };
        res.render("my-token-shadow", data);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

// 3. /:address GET 잔액확인 라우팅
router.get("/:address", async function(req, res){
    const address = req.params.address;

    try{
        const balance = await sc.methods.balanceOf(address).call();
        res.status(200).send({balance});
    } catch(err){
        console.log(err);
        res.status(500).send();
    }
})
// 4. /:address PUT 발행 라우팅
router.put("/:address", async function(req, res){
    // 1. 클라이언트에서 전송받은 데이터 추출, 서명주소, 추가발행양
    const address = req.params.address;
    const amount = req.body.amount;
    // .2 web3 myTokenShadow 스마트 컨트랙트 mint method 연동
    try {
        const result = await sc.methods.mint(address, amount).send({ from: address});
        const blockNumber = await web3.eth.getBlockNumber();
        const eth_balance = await web3.eth.getBalance(address);

        res.status(200).send({blockNumber, msg:"토큰을 생성했습니다.", eth_balance})
    } catch (error) {
        console.error(error)
        res.status(500).send({msg: "토큰 생성에 실패했습니다."});
    }
});
// 5. / POST 전송 라우팅
router.post("/", async function(req, res){
    const { from, to, amount} = req.body;

    try {
        const result = await sc.methods.transfer(to, amount).send({ from });
        const blockNumber = await web3.eth.getBlockNumber();
        console.log(result);
        res.status(200).send({blockNumber, msg: "토큰을 전송했습니다."});
    } catch (error) {
        console.error(error);
        res.status(500).send({msg: "토큰 전송에 실패했습니다."});
    }
});
module.exports = router;