// 1. express 설정(외부 모듈 포함)
const express = require('express');
const router = express.Router();

// 2. web3 설정 (외부모듈포함 + 객체화 web3+sc)
const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const contract = require('../contract/helloShadow.js');
const sc = new web3.eth.Contract(contract.abi, contract.address);

// 3.  라우팅 / GET //async 비동기식 함수
router.get('/', async function(req, res, next){
    try {
        // 3.1 지갑리스트가져오기
        const accounts = await web3.eth.getAccounts();
        // 3.2 message state 가져오기
        const message = await sc.methods.message().call();
        // 3.3 블록넘버 가져오기
        const blockNumber = await web3.eth.getBlockNumber();
        //로그남기기
        console.log(message, blockNumber);
        // data 구조체만들기
        const data = {
            title: 'HelloShadow',
            accounts,
            message,
            blockNumber
        };
        // ejs 뷰 템플릿 활용해서 HTML -> response 에 기록
        res.render('hello-Shadow', data);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
}); 

// 4. 라우팅 / message PUT
router.put('/message', async function(req, res){
    // 4.1 클라이언트로 부터 요청문서에서 파라미터 꺼내기
    const sender = req.body.sender;
    const newMessage = req.body.newMessage;

    try {    
        // 4.2 web3로 연동하기
        const result = await sc.methods.update(newMessage).send({ from: sender });
        const message = await sc.methods.message().call();
        const blockNumber = await web3.eth.getBlockNumber();
        console.log(result)
        // 4.3 클라이언트에게 결과 전송하기
        res.status(200).send({message, blockNumber});

    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
    
});

// 5. 모듈 익스포트
module.exports = router;