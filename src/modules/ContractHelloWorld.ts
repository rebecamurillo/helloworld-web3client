import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Transaction as Tx } from "@ethereumjs/tx";

const NETWORK_URL = "http://localhost:7545";
const ACCOUNT = "0x3075A765E8b16c81e7792c1B8403E29a470cab0e";
//const ACCOUNT_PRIVATE_KEY = "25db048b325b1846de7d9c9034c789dee28f98eb253f5b22095463c6a418d70f";
const ACCOUNT_PRIVATE_KEY =
  "79e6f0e631166fdb4622f309f8de11d5f8c9362fc2a9ce98fce1cb617a4ae76f";
const privateKey = Buffer.from(ACCOUNT_PRIVATE_KEY, "hex");
const CONTRACT_ADDRESS = "0x42c1a7449bD83a6bd583aAfAE8d77545afABC4F1";
import contract_buid from "./ABI/HelloWorld.json";

const web3 = new Web3(NETWORK_URL);

export async function getMessage(): Promise<any> {
  //console.log('contract_abi',contract_abi);
  const contract = new web3.eth.Contract(
    contract_buid.abi as AbiItem[],
    CONTRACT_ADDRESS
  );
  try {
    return contract.methods.message().call();
  } catch (error) {
    console.log("error getting contract message !", error);
    return {
      error,
      message: "error getting contract message !",
    };
  }
}

export async function updateMessage(value: string): Promise<any> {
  const contract = new web3.eth.Contract(
    contract_buid.abi as AbiItem[],
    CONTRACT_ADDRESS
  );
  try {
    const txCount = await web3.eth.getTransactionCount(ACCOUNT);
    const txObject = {
      gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
      gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
      from: ACCOUNT,
      to: CONTRACT_ADDRESS,
      data: contract.methods.update(value).encodeABI(),
    };

    console.log("SENDING....");
    return web3.eth.sendTransaction(txObject);
  } catch (error) {
    console.log("error updating contract message !", error);
    return {
      error,
      message: "error getting contract message !",
    };
  }
}

export async function getCurrentProvider(): Promise<any> {
  return web3.currentProvider;
}

export async function getMyBalance(): Promise<any> {
  return web3.eth.getBalance(ACCOUNT, (err, wei) => {
    return web3.utils.fromWei(wei, "ether");
  });
}
