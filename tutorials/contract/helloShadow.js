// 1. contract address 상수정의
const address = '0xa060214959419a954dfd64a421b9a348e181645f';


// 2. contract abi 상수정의
const abi =[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "initMessage",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "newMessage",
				"type": "string"
			}
		],
		"name": "update",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "message",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];


// 3. 모듈 익스포트
module.exports = {address, abi};